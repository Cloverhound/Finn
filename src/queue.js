
import EventEmitter from '../lib/EventEmitter/EventEmitter'

export class Queue extends EventEmitter {

	constructor(finn) {
		super();

		this._finn = finn;
	}

	/**
     * Update our version of the queue object using a response from the raw
     * Finesse API.
     */
    _updateFromResponse(response) {
        this.id = response.getId();
        this.name = response.getName();
        this.statistics = response.getStatistics();
        this._raw = response;
    }

}