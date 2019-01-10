
import EventEmitter from '../lib/EventEmitter/EventEmitter'

export class Agent extends EventEmitter {

	constructor(finn) {
		super();

		this._finn = finn;
	}

	/**
     * Update our version of the agent object using a response from the raw
     * Finesse API.
     */
    _updateFromResponse(response) {
        this.id = response.getId();
        this.extension = response.getExtension();
        this.firstName = response.getFirstName();
        this.lastName = response.getLastName();
        this.pendingState = response.getPendingState();
        this.state = this._getAgentState(response);
        this.teamId = response.getTeamId();
        this.teamName = response.getTeamName();
        this.isSupervisor = this._finn._isSupervisor(response);
        this._raw = response;
    }

    _getAgentState(response) {
	    var state = response.getState();
	    var prettyState = window.finesse.utilities.I18n.getString("desktop.agent.header.state." + state);
	    var reason = response.getData().reasonCode || { };
	    // Deprecated, should be included in reason var set above
	    var reasonCodeLabel = response.getReasonCodeLabel();
	    var reasonCodeId = response.getNotReadyReasonCodeId();

	    var stateChangeTime = response.getStateChangeTime();
	    return {
	        name: state,
	        pretty: prettyState,
	        reason: {
	        	id: reason.id,
	        	code: reason.code,
	        	label: reason.label,
	        	isSystemCode: reason.systemCode // 11.6+
	        },
	        reasonCodeId: reasonCodeId,
	        reasonCodeLabel: reasonCodeLabel,
	        startTime: new Date(window.finesse.utilities.Utilities.extractTime(stateChangeTime)),
	        startTimeString: stateChangeTime
	    };
	}

}