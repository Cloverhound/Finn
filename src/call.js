
import EventEmitter from '../lib/EventEmitter/EventEmitter'

export class Call extends EventEmitter {

	constructor(finn) {
		super();

		this._finn = finn;
	}

    /**
     * Update our version of the call object using a response from the raw
     * Finesse API.
     */
    _updateFromResponse(response) {
        this.id = response.getId();
        this.state = response.getData().state;
        this.toAddress = response.getData().toAddress;
        this.fromAddress = response.getData().fromAddress;
        var mediaProperties = response.getMediaProperties();
        this.type = mediaProperties.callType;
        this.dnis = mediaProperties.DNIS;
        this.dialedNumber = mediaProperties.dialedNumber;
        this.outboundClassification = mediaProperties.outboundClassification;
        this.data = {}
        for(var property in mediaProperties) {
            // We expect call variables to start with either 'callVariable' for peripheral call variables,
            // 'user' for custom ECC variables,
            // or 'BA' for outbound ECC variables.
            if (property.lastIndexOf("callVariable", 0) != 0 
                    && property.lastIndexOf("user", 0) != 0
                    && property.lastIndexOf("BA", 0) != 0) {
                continue;
            }
           
           this.data[property] = mediaProperties[property];
        }
        if (response.getData().associatedDialogUri) {
            var parentId = finesse.utilities.Utilities.getId(response.getData().associatedDialogUri);
            var parent = this._finn.calls[parentId];
            if (parent && !parent.parentCall) {
                this.parentCall = parentId;
            }
        }
        else {
            this.parentCall = null;
        }
        this.participants = response.getParticipants();

        this._raw = response;
    }
 
    makeConsultCall(number, callback) {
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

    directTransfer(number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.initiateDirectTransfer(this._finn.agent.extension, number, {
            success: callback.bind(null, null),
            error: callback
        });
    }

    completeTransfer(callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, "TRANSFER", {
            success: callback.bind(null, null),
            error: callback
        });
    }

    completeConference(callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, "CONFERENCE", {
            success: callback.bind(null, null),
            error: callback
        });
    }

    retrieve(callback) {
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

    hold(callback) {
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

    updateCallVariable(variable, value) {
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
    }

    updateCallVariables(variables) {
        this._raw.isLoaded();

        var callVariables = [];
        for (var variableName in variables) {
            callVariables.push({
                "name": variableName,
                "value": variables[variableName]
            });
        }

        var options = options || {};
        options.content = {};
        options.content[this._raw.getRestType()] =
        {
            "mediaProperties": {
                "callvariables": {
                    "CallVariable": callVariables
                }
            },
            "requestedAction": finesse.restservices.Dialog.Actions.UPDATE_CALL_DATA
        };
        options.method = "PUT";
        this._raw.restRequest(this._raw.getRestUrl(), options);
    }

    sendDtmf(dtmf, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.sendDTMFRequest(this._finn.agent.extension, {
            success: callback.bind(null, null),
            error: callback
        }, dtmf);
    }
}