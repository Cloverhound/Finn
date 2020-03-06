import EventEmitter from '../lib/EventEmitter/EventEmitter'

import { Call } from './call';
import { Agent } from './agent';
import { Queue } from './queue';
import { Channel } from './mediachannel';

/**
* Convenience library wrapping the Finesse API.
* Let's you build gadgets with less boilerplate.
*/
export class Finn extends EventEmitter {

    constructor(gadgetName, options) {
        super();

        options = options || {};
        this.gadgetName = gadgetName;
        this.loaded = false;
        this.enableTaskRouting = options.enableTaskRouting === true;
        this.mediaOptions = options.mediaOptions || {
            maxDialogLimit: 3,
            interruptAction: 'ACCEPT',
            dialogLogoutAction: 'CLOSE'
        }
        this.enableSupervisor = options.enableSupervisor === true;
        this.dontLoadRosters = options.dontLoadRosters === true;
        this.container = finesse.modules.ContainerTools;
        this.calls = {};
    }

    load(callback) {
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

    _finishLoad() {
        var self = this;
        console.log("Connected to gadget hub, continuing loading " + this.gadgetName);

        this.logger = finesse.cslogger.ClientLogger;
        this.logger.init(gadgets.Hub, this.gadgetName);
        finesse.clientservices.ClientServices.setLogger(this.logger);
        this.log = this.logger.log;
        this.log("The client logger has been initialized for the " + this.gadgetName + " gadget.");

        finesse.clientservices.ClientServices.registerOnConnectHandler(function() {
            self.agent = new Agent(self)
            self.agent._raw = new finesse.restservices.User({
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

    _systemInfoLoaded(info) {
        this.logger.log("System Info loaded.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
        if (this._userIsLoaded) {
            this._continueUserLoad(this.agent._raw);
        }
    };
    _systemInfoChanged(info) {
        this.logger.log("System Info changed.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
    };

    _userLoaded(user) {
        var self = this;
        this.logger.log("User loaded.");

        this.agent._updateFromResponse(user);

        this._userIsLoaded = true;
        if (this._systemInfoIsLoaded) {
            this._continueUserLoad(user)
        }

        user.getNotReadyReasonCodes({
            success: self._notReadyReasonCodesLoaded.bind(self),
            error: self._notReadyReasonCodesLoadError.bind(self)
        });
        user.getSignoutReasonCodes({
            success: self._signoutReasonCodesLoaded.bind(self),
            error: self._signoutReasonCodesLoadError.bind(self)
        });
    };  

    _continueUserLoad(user) {
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
        if (this.enableSupervisor && this._isSupervisor(user) && supervisedTeamList.length > 0) {            
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

        if (this.enableTaskRouting) {
            this.channels = {};
            user.getMediaList({
                onLoad: self._mediaListLoaded.bind(self)
               // onError: self._mediaLoadError.bind(self)
            })
        } else {
            self._mediaLoadStatus = self._mediaLoadStatus || {};
            self._callbackIfLoaded();
        }
    }

    _userChanged(user) {
        this.agent._updateFromResponse(user);

        this.emit('agent_updated', this.agent);
        // Deprecated
        this.emit('agent updated', this.agent);
    };

    _userLoadError(error) {
        console.error(error);

        if (!this.loaded && this.loadCallback) {
            this.loadCallback(error);
        }
    };

    _notReadyReasonCodesLoaded(reasonCodes) {
        this.logger.log("Not Ready Reason Codes loaded: " + reasonCodes);
        this.notReadyReasonCodes = reasonCodes || [];

        this._notReadyReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };
    _notReadyReasonCodesLoadError(error) {
        this.logger.log("Error loading Not Ready Reason Codes: " + error)
        console.error("Error Loading Not Ready Reason Codes", error);

        this.notReadyReasonCodes = [];

        this._notReadyReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };

    _signoutReasonCodesLoaded(reasonCodes) {
        this.logger.log("Sign Out Reason Codes loaded: " + reasonCodes);
        this.signoutReasonCodes = reasonCodes || [];

        this._signoutReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };
    _signoutReasonCodesLoadError(error) {
        this.logger.log("Error loading Sign Out Reason Codes: " + error)
        console.error("Error Loading Sign Out Reason Codes", error);

        this.signoutReasonCodes = [];

        this._signoutReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };

    _loadTeam(id) {
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

    _teamChanged(team) {
        this.logger.log("Team changed " + team.getId());
        this._teamLoaded(team);
    };

    _teamLoaded(team) {
        var self = this;
        this.logger.log("Team loaded " + team.getId());

        this.emitEvent('team_loaded', team);
        // Deprecated
        this.emitEvent('team loaded', team);

        if (this.dontLoadRosters) {
            this._teamLoadStatus[team.getId()] = true;
            this._callbackIfLoaded();
            
            return;
        }

        team._rawUsers = team.getUsers({
            onCollectionAdd: self._supervisedAgentAdded.bind(self, team.getId()),
            onCollectionDelete: self._supervisedAgentDeleted.bind(self, team.getId()),
            onLoad: self._teamRosterLoaded.bind(self, team.getId()),
            onError: self._teamRosterLoadError.bind(self)
        });
    };

    _teamLoadError(err) {
        this.logger.log("Team load error " + err);
        console.error(err);
    };

    _supervisedAgentDeleted(teamId, agent) {
        this.logger.log("Supervised agent deleted from team " + teamId);

        delete this.teams[teamId].roster[agent.getId()];
        this.emit('supervised_agent_deleted', agent.getId());
        // Deprecated
        this.emit('supervised agent deleted', agent.getId());
    };

    _supervisedAgentAdded(teamId, agent) {
        this.logger.log("Supervised agent added to team " + teamId);

        var roster = this.teams[teamId].roster;
        this._loadSupervisedAgent(agent, teamId, roster);
    };

    _teamRosterLoaded(teamId, rosterResponse) {
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
        this._callbackIfLoaded();
    };

    _loadSupervisedAgent(agent, teamId, roster) {
        var agentId = agent.getId();
        var agentToAdd = new Agent(this);
        agentToAdd._updateFromResponse(agent);
        roster[agentId] = agentToAdd;

        agent.getQueues({
            onCollectionAdd: this._supervisedAgentQueueAdded.bind(this, agentId, teamId),
            onCollectionDelete: this._supervisedAgentQueueDeleted.bind(this, agentId, teamId),
            onLoad: this._supervisedAgentQueueListLoaded.bind(this, agentId, teamId),
            onError: this._teamLoadError.bind(this)
        });

        this.emit('supervised_agent_loaded', agentToAdd);
        // Deprecated
        this.emit('supervised agent loaded', agentToAdd);

        agent.addHandler('change', this._supervisedAgentChanged.bind(this));
    };

    _supervisedAgentQueueListLoaded(agentId, teamId, queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded for supervised agent: " + agentId);
        this.teams[teamId].roster[agentId].queues = this.teams[teamId].roster[agentId].queues || {};
        var rawQueues = queuesResponse.getCollection();
        $.each(rawQueues, function (id, queue) {
            queue.addHandler('change', self._supervisedAgentQueueChanged.bind(self, agentId, teamId));
            queue.addHandler('load', self._supervisedAgentQueueLoaded.bind(self, agentId, teamId));
        });
    };

    _supervisedAgentQueueLoaded(agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue loaded: " + rawQueue.getId() + " for: " + agentId);
        var queue = new Queue(this);
        queue._updateFromResponse(rawQueue);
        this.teams[teamId].roster[agentId].queues[queue.id] = queue;

        var affectedAgent = this.teams[teamId].roster[agentId]
        
        this.emit('supervised_agent_updated', affectedAgent);
        // Deprecated
        this.emit('supervised agent updated', affectedAgent);

        affectedAgent.emit('updated', affectedAgent);

        return queue;
    };

    _supervisedAgentQueueChanged(agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue has been updated: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);
        queue._events = rawQueue._events;
    };

    _supervisedAgentQueueAdded(agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue added: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);

        var affectedAgent = this.teams[teamId].roster[agentId]

        this.emit('supervised_agent_updated', affectedAgent);
        // Deprecated
        this.emit('supervised agent updated', affectedAgent);

        affectedAgent.emit('updated', affectedAgent);
    };

    _supervisedAgentQueueDeleted(agentId, teamId, rawQueue) {
        var id = rawQueue.getId();
        var name = rawQueue.getName();
        this.logger.log("Supervised Agent Queue deleted " + id + " for " + agentId);

        delete this.teams[teamId].roster[agentId].queues[id];

        var affectedAgent = this.teams[teamId].roster[agentId]

        this.emit('supervised_agent_updated', affectedAgent);
        // Deprecated
        this.emit('supervised agent updated', affectedAgent);

        affectedAgent.emit('updated', affectedAgent);
    };

    _supervisedAgentChanged(agent) {
        this.logger.log("Supervised agent changed: " + agent.getId());
        var affectedAgent, affectedTeamId;

        $.each(this.teams, function (teamId, team) {
            $.each(team.roster, function (agentId, teamAgent) {
                if (teamAgent.id === agentToAdd.id) {
                    affectedAgent = teamAgent;
                    affectedTeamId = teamId;
                }
            });
        });

        if (!affectedAgent || !affectedTeamId) {
            this.logger.log("Error: Could not find supervised agent in roster: " + agent)
            console.error("Could not find supervised agent in roster: ", agent);
            return;
        }

        affectedAgent._updateFromResponse(agent);
        this.teams[affectedTeamId].roster[affectedAgent.id] = affectedAgent;
        
        this.emit('supervised_agent_updated', affectedAgent);
        // Deprecated
        this.emit('supervised agent updated', affectedAgent);

        affectedAgent.emit('updated', affectedAgent);
    }

    _teamRosterLoadError(err) {
        this.logger.log("Team roster load error " + err);
        console.error(err);
    };

    _queuesLoaded(queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded.");
        this.queues = this.queues || {};
        var rawQueues = queuesResponse.getCollection();
        self._queueLoadStatus = self._queueLoadStatus || {};

        if ($.isEmptyObject(rawQueues) || rawQueues.length == 0) {
            self._callbackIfLoaded();
        }
        else {
            $.each(rawQueues, function (id, queue) {
                self._queueLoadStatus[id] = false;

                queue.addHandler('change', self._queueChanged.bind(self));
                queue.addHandler('load', self._queueLoaded.bind(self));
            });
        }
    };

    _queueLoaded(rawQueue) {
        this.logger.log("Queue loaded: " + rawQueue.getId());

        var queue = this.queues[rawQueue.getId()] || new Queue(this);
        queue._updateFromResponse(rawQueue);
        this.queues[queue.id] = queue;

        this._queueLoadStatus[queue.id] = true;
        this._callbackIfLoaded();

        return queue;
    };

    _queueAdded(queue) {
        this.logger.log("Queue added.");
        var newQueue = this._queueLoaded(queue);

        this.emit('queue_added', newQueue);
        // Deprecated
        this.emit('queue added', newQueue);
    };

    _queueChanged(queue) {
        this.logger.log("Queue has been updated.");
        var changedQueue = this._queueLoaded(queue);
        changedQueue._events = queue._events;

        changedQueue.emit('updated')

        this.emit('queue_updated', changedQueue);
        // Deprecated
        this.emit('queue updated', changedQueue);
    };

    _queueDeleted(queue) {
        var id = queue.getId();
        var name = queue.getName();
        this.logger.log("Queue deleted " + id + " " + name);

        this.queues[id].emit('deleted');

        delete this.queues[id];

        this.emit('queue_deleted', id);
        // Deprecated
        this.emit('queue deleted', id);
    };

    _queueLoadError(err) {
        this.logger.log("Queue load error " + err);
        if (!this.loaded && this.loadCallback) {
            this.loadCallback("Queue load error " + err);
        }
    };
    
    _callsLoaded(callsResponse) {
        var self = this;
        this.logger.log("Dialogs loaded.");
        this.calls = this.calls || {};
        var rawCalls = callsResponse.getCollection();
        $.each(rawCalls, function (id, dialog) {
            dialog.addHandler('change', self._callChanged.bind(self));
            //queue.addHandler('load', self._queueLoaded.bind(self));
        });
    };
    
    _callsLoadError(err) {
        this.logger.log("Call load error " + err);
    };
    
    _loadCall(rawCall) {
        this.logger.log("Loading call: " + rawCall.getId());
        var call = this.calls[rawCall.getId()] || new Call(this);
        call._updateFromResponse(rawCall);
        this.calls[call.id] = call;
        return call;
    };
    
    _callStarted(rawCall) {
        this.logger.log("Call added.");
        rawCall.addHandler('change', this._callChanged.bind(this));
        var call = this._loadCall(rawCall);

        this.emit('call_started', call);
        // Deprecated
        this.emit('call started', call);
    };

    _callChanged(rawCall) {
        var id = rawCall.getId();
        this.logger.log("Call updated " + id);
        var call = this._loadCall(rawCall);

        call.emit('updated')
        this.emit('call_updated', call);
        // Deprecated
        this.emit('call updated', call);
    };

    _callEnded(rawCall) {
        var id = rawCall.getId();
        this.logger.log("Call ended " + id);
        var call = this._loadCall(rawCall);
        
        call.emit('ended');
        delete this.calls[id];

        this.emit('call_ended', call);
        // Deprecated
        this.emit('call ended', call);
    };




    _mediaListLoaded(mediaListResponse) {
        var self = this;
        this.logger.log("Media list loaded.");
        this.channels = this.channels || {};
        var rawMedia = mediaListResponse.getCollection();
        self._mediaLoadStatus = self._mediaLoadStatus || {};

        if ($.isEmptyObject(rawMedia) || rawMedia.length == 0) {
            self._callbackIfLoaded();
        }
        else {
            $.each(rawMedia, function (id, media) {
                self._mediaLoadStatus[id] = false;

                mediaListResponse.getMedia({
                    id: id,
                    onLoad: self._mediaLoaded.bind(self),
                    onChange: self._mediaChanged.bind(self)
                });
                //media.addHandler('change', self._queueChanged.bind(self));
                //media.addHandler('load', self._queueLoaded.bind(self));
            });
        }
    };

    _mediaLoaded(rawMedia) {
        var id = rawMedia.getId();
        this.logger.log("Media loaded: " + id);

        var media = this.channels[id] || new Channel(this, this.mediaOptions);
        media._updateFromResponse(rawMedia);

    //    queue._updateFromResponse(rawQueue);
        this.channels[id] = media;

        this._mediaLoadStatus[id] = true;
        this._callbackIfLoaded();

        return media;
    };

    _mediaChanged(rawMedia) {
        this.logger.log("Media updated.");
        var media = this._mediaLoaded(rawMedia);

        this.emit('channel_updated', media);
    }

    _taskStarted(rawTask) {
        this.logger.log("Task started: " + rawTask.getId());
    }

    _taskEnded(rawTask) {
        this.logger.log("Task ended: " + rawTask.getId());

    }

    // _queueAdded(queue) {
    //     this.logger.log("Queue added.");
    //     var newQueue = this._queueLoaded(queue);

    //     this.emit('queue_added', newQueue);
    //     // Deprecated
    //     this.emit('queue added', newQueue);
    // };

    // _queueChanged(queue) {
    //     this.logger.log("Queue has been updated.");
    //     var changedQueue = this._queueLoaded(queue);
    //     changedQueue._events = queue._events;

    //     changedQueue.emit('updated')

    //     this.emit('queue_updated', changedQueue);
    //     // Deprecated
    //     this.emit('queue updated', changedQueue);
    // };

    // _queueDeleted(queue) {
    //     var id = queue.getId();
    //     var name = queue.getName();
    //     this.logger.log("Queue deleted " + id + " " + name);

    //     this.queues[id].emit('deleted');

    //     delete this.queues[id];

    //     this.emit('queue_deleted', id);
    //     // Deprecated
    //     this.emit('queue deleted', id);
    // };

    // _queueLoadError(err) {
    //     this.logger.log("Queue load error " + err);
    //     if (!this.loaded && this.loadCallback) {
    //         this.loadCallback("Queue load error " + err);
    //     }
    // };

    
    makeCall(number, callback) {
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

    ready() {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this.agent._raw.setState("READY");
    }
    notReady(reasonCodeId) {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }

        var reason = null;
        if (reasonCodeId) {
            reason = {
                id: reasonCodeId
            }
        }
        
        this.agent._raw.setState("NOT_READY", reason);
    }
    logout(reasonCodeId) {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }

        var reason = null;
        if (reasonCodeId) {
            reason = {
                id: reasonCodeId
            }
        }
        
        this.agent._raw.logout(reason);
    }

    _isFullyLoaded() {
        return (
            this._isLoaded(this._queueLoadStatus) &&
            this._isLoaded(this._mediaLoadStatus) &&
            this._isLoaded(this._teamLoadStatus) &&
            this._notReadyReasonCodesLoadStatus &&
            this._signoutReasonCodesLoadStatus
        );
    }
    _isLoaded(loadStatus) {
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
    _callbackIfLoaded() {
        if (!this.loaded && this._isFullyLoaded()) {
            this.loaded = true;
            if (this.loadCallback)
                this.loadCallback(null, this.agent);
        }
    }

    _isSupervisor(user) {
        return user._data.roles && user._data.roles.role && user._data.roles.role.indexOf("Supervisor") > -1
    }

}

window.Finn = Finn;

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
window.gadgets = window.gadgets || {};
window.gadgets.HubSettings = window.gadgets.HubSettings || {};
window.gadgets.HubSettings.onConnectHandler = function () {};
window.gadgets.HubSettings.onConnect = function () {
    gadgets.HubSettings.onConnectHandler();
};