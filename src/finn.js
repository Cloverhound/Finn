
/**
* Convenience library wrapping the Finesse API.
* Let's you build gadgets with less boilerplate.
*/
Finn = (function ($) {
    'use strict';

    function Finn(gadgetName, options) {
        options = options || {};
    	this.gadgetName = gadgetName;
        this.loaded = false;
        this.enableSupervisor = options.enableSupervisor === true;
        this.dontLoadRosters = options.dontLoadRosters === true;
        this.container = finesse.modules.ContainerTools;
    }
    heir.inherit(Finn, EventEmitter);

    Finn.Agent = function() { }
    heir.inherit(Finn.Agent, EventEmitter);

    Finn.Queue = function() { }
    heir.inherit(Finn.Queue, EventEmitter);
    
    Finn.Call = function() { }
    heir.inherit(Finn.Call, EventEmitter);
    Finn.Call.prototype.makeConsultCall = function (number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.makeConsultCall(this._finn.agent.extension, number, {
            success: callback.bind(null, null),
            error: callback
        });
    }

    Finn.Call.prototype.retrieve = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, finesse.restservices.Dialog.Actions.RETRIEVE, {
            success: callback.bind(null, null),
            error: callback
        });
    }
    Finn.Call.prototype.hold = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, finesse.restservices.Dialog.Actions.HOLD, {
            success: callback.bind(null, null),
            error: callback
        });
    }
    Finn.Call.prototype.updateCallVariable = function (variable, value) {
        this._raw.isLoaded();

        var options = options || {};
        options.content = {};
        options.content[this._raw.getRestType()] =
        {
            "mediaProperties": {
                "callvariables": [
                    { 
                        "CallVariable": {
                            "name": variable,
                            "value": value
                        }
                    }
                ]
            },
            "requestedAction": finesse.restservices.Dialog.Actions.UPDATE_CALL_DATA
        };
        options.method = "PUT";
        this._raw.restRequest(this._raw.getRestUrl(), options);
    },

    Finn.prototype.load = function (callback) {
        this.loadCallback = callback;

        console.log("Initializing gadget " + this.gadgetName);

        if (gadgets.Hub && gadgets.Hub.isConnected()) {
            console.log("Hub already connected, continuing - " + this.gadgetName);
            this._finishLoad();
        }
        else {
            console.log("Hub not connected, waiting - " + this.gadgetName);
            gadgets.HubSettings.onConnectHandler = this._finishLoad.bind(this);
        }
    };

    Finn.prototype._finishLoad = function () {
        var self = this;
        console.log("Connected to gadget hub, continuing loading " + this.gadgetName);

        this.logger = finesse.cslogger.ClientLogger;
        this.logger.init(gadgets.Hub, this.gadgetName);
        finesse.clientservices.ClientServices.setLogger(this.logger);
        this.log = this.logger.log;
        this.log("The client logger has been initialized for the " + this.gadgetName + " gadget.");

        finesse.clientservices.ClientServices.registerOnConnectHandler(function() {
            self.agent = new finesse.restservices.User({
                id: finesse.gadget.Config.id,
                onLoad: self._userLoaded.bind(self),
                onError: self._userLoadError.bind(self),
                onChange: self._userChanged.bind(self)
            });
        });

        finesse.clientservices.ClientServices.init(finesse.gadget.Config, false);
        self.container.init();
        self.container.info = new finesse.restservices.SystemInfo("",{
            onLoad: self._systemInfoLoaded.bind(self),
            onChange: self._systemInfoChanged.bind(self)
        });      
    };

    Finn.prototype._systemInfoLoaded = function (info) {
        this.logger.log("System Info loaded.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
        if (this._userIsLoaded) {
            this._continueUserLoad(this.agent._raw);
        }
    };
    Finn.prototype._systemInfoChanged = function (info) {
        this.logger.log("System Info changed.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
    };

    Finn.prototype._userLoaded = function (user) {
        var self = this;
        this.logger.log("User loaded.");

        this.agent = getAgentFromResponse(user);
        this._userIsLoaded = true;
        if (this._systemInfoIsLoaded) {
            this._continueUserLoad(user)
        }

    };  

    Finn.prototype._continueUserLoad = function (user) {
        var self = this;
        
        // Get an instance of the dialogs collection and register handlers 
        // for dialog additions and removals.
        user.getDialogs({
            onCollectionAdd: self._callStarted.bind(self),
            onCollectionDelete: self._callEnded.bind(self),
            onLoad: self._callsLoaded.bind(self),
            onError: self._callsLoadError.bind(self)
        });

        this.teams = {};
        // Array of objects with an id and name property
        // for each team supervised by the supervisor.
        var supervisedTeamList = user.getSupervisedTeams();
        if (this.enableSupervisor && isSupervisor(user) && supervisedTeamList.length > 0) {            
            $.each(supervisedTeamList, function(index, team) {
                self._teamLoadStatus = self._teamLoadStatus || {};
                self._teamLoadStatus[team.id] = false;

                self._loadTeam(team.id)
            });

            if (supervisedTeamList.length === 0) {
                self._teamLoadStatus = {};
            }
        }
        else {
            // With no teams listed in the load status, it will
            // always be detected as completed loading.
            self._teamLoadStatus = {};
        }

        // Queue subscription not supported in UCCX
        if (self.container.info.deploymentType == "UCCX") {
            self._queueLoadStatus = self._queueLoadStatus || {};

            self._callbackIfLoaded();
        } else {
            user.getQueues({
                onCollectionAdd: self._queueAdded.bind(self),
                onCollectionDelete: self._queueDeleted.bind(self),
                onLoad: self._queuesLoaded.bind(self),
                onError: self._queueLoadError.bind(self)
            })
        }
    }

    Finn.prototype._userChanged = function (user) {
        this.agent = getAgentFromResponse(user);

        this.emit('agent updated', this.agent);
    };

    Finn.prototype._userLoadError = function (error) {
        console.error(error);

        if (!this.loaded && this.loadCallback) {
            this.loadCallback(error);
        }
    };


    Finn.prototype._loadTeam = function (id) {
        var self = this;
        this.logger.log("Loading Team: " + id);
        if (this.teams[id]) { // If we've previously constructed this team already, simply refresh it.
            this.teams[id].refresh();
        } 
        else {
            this.teams[id] = new finesse.restservices.Team({
                id: id,
                onLoad: self._teamLoaded.bind(self),
                onChange: self._teamChanged.bind(self),
                onError: self._teamLoadError.bind(self)
            });
        }
    };

    Finn.prototype._teamChanged = function (team) {
        this.logger.log("Team changed " + team.getId());
        this._teamLoaded(team);
    };

    Finn.prototype._teamLoaded = function (team) {
        var self = this;
        this.logger.log("Team loaded " + team.getId());
        this.emitEvent('team loaded', team);

        if (this.dontLoadRosters) {
            this._teamLoadStatus[team.getId()] = true;
            if (!this.loaded && isLoaded(this._queueLoadStatus) && isLoaded(this._teamLoadStatus)) {
                if (this.loadCallback)
                    this.loadCallback(null, this.agent);
                this.loaded = true;
            }
            
            return;
        }

        team._rawUsers = team.getUsers({
            onCollectionAdd: self._supervisedAgentAdded.bind(self, team.getId()),
            onCollectionDelete: self._supervisedAgentDeleted.bind(self, team.getId()),
            onLoad: self._teamRosterLoaded.bind(self, team.getId()),
            onError: self._teamRosterLoadError.bind(self)
        });
    };

    Finn.prototype._teamLoadError = function (err) {
        this.logger.log("Team load error " + err);
        console.error(err);
    };

    Finn.prototype._supervisedAgentDeleted = function (teamId, agent) {
        this.logger.log("Supervised agent deleted from team " + teamId);

        delete this.teams[teamId].roster[agent.getId()];
        this.emit('supervised agent deleted', agent.getId());
    };

    Finn.prototype._supervisedAgentAdded = function (teamId, agent) {
        this.logger.log("Supervised agent added to team " + teamId);

        var roster = this.teams[teamId].roster;
        this._loadSupervisedAgent(agent, teamId, roster);
    };

    Finn.prototype._teamRosterLoaded = function (teamId, rosterResponse) {
        var self = this;
        this.logger.log("Team roster loaded " + teamId);
        var rawRoster = rosterResponse.getCollection();
        this.teams[teamId]._rawUsersCollection = rawRoster;
        
        var roster = {};
        this.teams[teamId].roster = roster;

        $.each(rawRoster, function (agentId, agent) {
            self.logger.log("Loading roster agent " + agentId);
            self._loadSupervisedAgent(agent, teamId, roster);
        });

        this._teamLoadStatus[teamId] = true;
        if (!this.loaded && isLoaded(this._queueLoadStatus) && isLoaded(this._teamLoadStatus)) {
            if (this.loadCallback)
                this.loadCallback(null, this.agent);
            this.loaded = true;
        }
    };

    Finn.prototype._loadSupervisedAgent = function (agent, teamId, roster) {
        var agentId = agent.getId();
        var agentToAdd = getAgentFromResponse(agent);
        roster[agentId] = agentToAdd;

        agent.getQueues({
            onCollectionAdd: this._supervisedAgentQueueAdded.bind(this, agentId, teamId),
            onCollectionDelete: this._supervisedAgentQueueDeleted.bind(this, agentId, teamId),
            onLoad: this._supervisedAgentQueueListLoaded.bind(this, agentId, teamId),
            onError: this._teamLoadError.bind(this)
        });

        this.emit('supervised agent loaded', agentToAdd);
        agent.addHandler('change', this._supervisedAgentChanged.bind(this));
    };

    Finn.prototype._supervisedAgentQueueListLoaded = function (agentId, teamId, queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded for supervised agent: " + agentId);
        this.teams[teamId].roster[agentId].queues = this.teams[teamId].roster[agentId].queues || {};
        var rawQueues = queuesResponse.getCollection();
        $.each(rawQueues, function (id, queue) {
            queue.addHandler('change', self._supervisedAgentQueueChanged.bind(self, agentId, teamId));
            queue.addHandler('load', self._supervisedAgentQueueLoaded.bind(self, agentId, teamId));
        });
    };

    Finn.prototype._supervisedAgentQueueLoaded = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue loaded: " + rawQueue.getId() + " for: " + agentId);
        var queue = getQueueFromResponse(rawQueue);
        this.teams[teamId].roster[agentId].queues[queue.id] = queue;

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);

        return queue;
    };

    Finn.prototype._supervisedAgentQueueChanged = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue has been updated: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);
        queue._events = rawQueue._events;
    };

    Finn.prototype._supervisedAgentQueueAdded = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue added: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);
    };

    Finn.prototype._supervisedAgentQueueDeleted = function (agentId, teamId, rawQueue) {
        var id = rawQueue.getId();
        var name = rawQueue.getName();
        this.logger.log("Supervised Agent Queue deleted " + id + " for " + agentId);

        delete this.teams[teamId].roster[agentId].queues[id];

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);
    };

    Finn.prototype._supervisedAgentChanged = function (agent) {
        this.logger.log("Supervised agent changed: " + agent.getId());
        var agentToAdd = getAgentFromResponse(agent);
        var affectedAgent, affectedTeamId;

        $.each(this.teams, function (teamId, team) {
            $.each(team.roster, function (agentId, teamAgent) {
                if (teamAgent.id === agentToAdd.id) {
                    affectedAgent = teamAgent;
                    affectedTeamId = teamId;
                }
            });
        });

        this.logger.log(affectedAgent === undefined);
        agentToAdd._events = affectedAgent._events;
        agentToAdd.queues = affectedAgent.queues;
        this.teams[affectedTeamId].roster[agentToAdd.id] = agentToAdd;
        
        this.emit('supervised agent updated', agentToAdd);
        agentToAdd.emit('updated', agentToAdd);
    }

    Finn.prototype._teamRosterLoadError = function (err) {
        this.logger.log("Team roster load error " + err);
        console.error(err);
    };

    Finn.prototype._queuesLoaded = function (queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded.");
        this.queues = this.queues || {};
        var rawQueues = queuesResponse.getCollection();
        self._queueLoadStatus = self._queueLoadStatus || {};

        if (rawQueues.length == 0) {
            if (!self.loaded && isLoaded(self._teamLoadStatus)) {
                if (self.loadCallback)
                    self.loadCallback(null, self.agent);
                self.loaded = true;
            }
        }
        else {
            $.each(rawQueues, function (id, queue) {
                self._queueLoadStatus[id] = false;

                queue.addHandler('change', self._queueChanged.bind(self));
                queue.addHandler('load', self._queueLoaded.bind(self));
            });
        }
    };

    Finn.prototype._queueLoaded = function (rawQueue) {
        this.logger.log("Queue loaded: " + rawQueue.getId());
        var queue = getQueueFromResponse(rawQueue);
        this.queues[queue.id] = queue;
        this._queueLoadStatus[queue.id] = true;

        if (!this.loaded && isLoaded(this._queueLoadStatus) && isLoaded(this._teamLoadStatus)) {
            if (this.loadCallback)
                this.loadCallback(null, this.agent);
            this.loaded = true;
        }

        return queue;
    };

    Finn.prototype._queueAdded = function (queue) {
        this.logger.log("Queue added.");
        var newQueue = this._queueLoaded(queue);

        this.emit('queue added', newQueue);
    };

    Finn.prototype._queueChanged = function (queue) {
        this.logger.log("Queue has been updated.");
        var changedQueue = this._queueLoaded(queue);
        changedQueue._events = queue._events;

        changedQueue.emit('updated')
        this.emit('queue updated', changedQueue);
    };

    Finn.prototype._queueDeleted = function (queue) {
        var id = queue.getId();
        var name = queue.getName();
        this.logger.log("Queue deleted " + id + " " + name);

        this.queues[id].emit('deleted');

        delete this.queues[id];
        this.emit('queue deleted', id);
    };

    Finn.prototype._queueLoadError = function (err) {
        this.logger.log("Queue load error " + err);
        if (!this.loaded && this.loadCallback) {
            this.loadCallback("Queue load error " + err);
        }
    };
    
    Finn.prototype._callsLoaded = function (callsResponse) {
        var self = this;
        this.logger.log("Dialogs loaded.");
        this.calls = this.calls || {};
        var rawCalls = callsResponse.getCollection();
        $.each(rawCalls, function (id, dialog) {
            dialog.addHandler('change', self._callChanged.bind(self));
            //queue.addHandler('load', self._queueLoaded.bind(self));
        });
    };
    
    Finn.prototype._callsLoadError = function (err) {
        this.logger.log("Call load error " + err);
    };
    
    Finn.prototype._callLoaded = function (rawCall) {
        this.logger.log("Call loaded: " + rawCall.getId());
        var call = getCallFromResponse(rawCall, this.calls);
        call._finn = this;
        this.calls[call.id] = call;
        return call;
    };
    
    Finn.prototype._callStarted = function (call) {
        this.logger.log("Call added.");
        call.addHandler('change', this._callChanged.bind(this));
        var newCall = this._callLoaded(call);

        this.emit('call started', newCall);
    };

    Finn.prototype._callChanged = function (call) {
        this.logger.log("Call has been updated.");
        var changedCall = this._callLoaded(call);
        changedCall._events = call._events;

        changedCall.emit('updated')
        this.emit('call updated', changedCall);
    };

    Finn.prototype._callEnded = function (rawCall) {
        var id = rawCall.getId();
        //var name = queue.getName();
        this.logger.log("Call ended " + id);
        var call = getCallFromResponse(rawCall, this.calls);
        var originalCall = this.calls[call.id];
        
        call._events = originalCall._events;
        call.emit('ended');

        delete this.calls[id];
        this.emit('call ended', call);
    };
    
    Finn.prototype.makeCall = function (number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this.agent._raw.makeCall(number, {
            success: callback.bind(null, null),
            error: callback
        });
    }
 
    function isLoaded(loadStatus) {
        if (!loadStatus) {
            return false;
        }

        var isLoaded = true;

        $.each(loadStatus, function (id, status) {
            if (status === false) {
                isLoaded = false;
            }
        });

        return isLoaded;
    }
    
    function getAgentFromResponse(agentResponse) {
        var agent = new Finn.Agent();

        agent.id = agentResponse.getId();
        agent.extension = agentResponse.getExtension();
        agent.firstName = agentResponse.getFirstName();
        agent.lastName = agentResponse.getLastName();
        agent.pendingState = agentResponse.getPendingState();
        agent.state = getAgentState(agentResponse);
        agent.teamId = agentResponse.getTeamId();
        agent.teamName = agentResponse.getTeamName();
        agent.isSupervisor = isSupervisor(agentResponse);
        agent._raw = agentResponse;
        
        return agent;
    }

    function getQueueFromResponse(queueResponse) {
        var queue = new Finn.Queue();
        queue.id = queueResponse.getId();
        queue.name = queueResponse.getName();
        queue.statistics = queueResponse.getStatistics();
        queue._raw = queueResponse;

        return queue;
    }
    
    function getCallFromResponse(callResponse, calls) {
        var call = new Finn.Call();
        call.id = callResponse.getId();
        call.state = callResponse.getData().state;
        call.toAddress = callResponse.getData().toAddress;
        call.fromAddress = callResponse.getData().fromAddress;
		var mediaProperties = callResponse.getMediaProperties();
        call.type = mediaProperties.callType;
        call.dnis = mediaProperties.DNIS;
        call.dialedNumber = mediaProperties.dialedNumber;
        call.outboundClassification = mediaProperties.outboundClassification;
		call.data = {}
		for(var property in mediaProperties) {
			// We expect call variables to start with either 'callVariable' for peripheral call variables,
			// 'user' for custom ECC variables,
			// or 'BA' for outbound ECC variables.
			if (property.lastIndexOf("callVariable", 0) != 0 
					&& property.lastIndexOf("user", 0) != 0
					&& property.lastIndexOf("BA", 0) != 0) {
				continue;
			}
		   
		   call.data[property] = mediaProperties[property];
		}
        if (callResponse.getData().associatedDialogUri) {
            var parentId = finesse.utilities.Utilities.getId(callResponse.getData().associatedDialogUri);
            var parent = calls[parentId];
            if (parent && !parent.parentCall) {
                call.parentCall = parentId;
            }
        }
        else {
            call.parentCall = null;
        }
        call.participants = callResponse.getParticipants();

        call._raw = callResponse;

        return call;
    }

    function isSupervisor(user) {
        return user._data.roles.role.indexOf("Supervisor") > -1
    }
    
    function getAgentState(agent) {
    	var state = agent.getState();
        var prettyState = finesse.utilities.I18n.getString("desktop.agent.header.state." + state);
        var reasonCodeLabel = agent.getReasonCodeLabel();
        var reasonCodeId = agent.getNotReadyReasonCodeId();
        var stateChangeTime = agent.getStateChangeTime();
        return {
            name: state,
            pretty: prettyState,
            reasonCodeId: reasonCodeId,
            reasonCodeLabel: reasonCodeLabel,
            startTime: new Date(finesse.utilities.Utilities.extractTime(stateChangeTime)),
            startTimeString: stateChangeTime
        };
    }

	return Finn;

}(jQuery));


/**
* Fix for awkward gadget 'onConnect' behavior.
*
* If we don't set onConnect right away, then it may never trigger.
* This is because the way the gadget container code sets this callback is prone to race conditions.
* Here is the relevant container code:
*
* 1.   gadgets.util.registerOnLoadHandler(function() {
* 2.     try {
* 3.       gadgets.Hub = new OpenAjax.hub.IframeHubClient(gadgets.HubSettings.params);
* 4.       gadgets.Hub.connect(gadgets.HubSettings.onConnect)
* 5.     } catch (A) {
* 6.       gadgets.error("ERROR creating or connecting IframeHubClient in gadgets.Hub [" + A.message + "]")
* 7.     }
* 8.   })
*
* On line 4, the 'onConnect' callback is set immediately after the OpenSocial gadgets are loaded,
* and captures the current value of 'HubSettings.onConnect' in a closure. The problem arises if we're 
* loading this gadget after the OpenSocial gadget library has already loaded, for example if we're doing
* our work after jquery's '$(document).ready' call. If we do that, then HubSettings.onConnect isn't set when
* the OpenSocial container loads and so we'll never get the callback.
*
* This is inconvenient since it forces us to be finicky about when we actually load our gadget, making sure
* that it happens immediately instead of after the document is loaded. This is not only prone to tricky
* bugs but may conflict with our goals for the gadget. The fix below sets 'onConnect' immediately but redirects
* it's logic to another function called 'onConnectHandler'. We can then set 'onConnectHandler' in our
* gadget code without worrying too much about when we actually load it.
*
*/
gadgets = gadgets || {};
gadgets.HubSettings = gadgets.HubSettings || {};
gadgets.HubSettings.onConnectHandler = function () {};
gadgets.HubSettings.onConnect = function () {
    gadgets.HubSettings.onConnectHandler();
};