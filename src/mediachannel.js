
import EventEmitter from '../lib/EventEmitter/EventEmitter'

export class Channel extends EventEmitter {

    constructor(finn, options) {
        super();

        this._finn = finn;
        this._loginPending = false;
        this.tasks = {};
        this.mediaOptions = options || {
            maxDialogLimit: 3,
            interruptAction: 'ACCEPT',
            dialogLogoutAction: 'CLOSE'
        }
    }

    login() {
        this._loginPending = true;

        this._finn.log("Login called for channel: " + this.name + ", loading dialogs.");
        this._raw.getMediaDialogs({
            onLoad: this._tasksLoaded.bind(this),
            onCollectionAdd: this._taskStarted.bind(this),
            onCollectionDelete: this._taskEnded.bind(this)
        });
    }

    ready() {
        this._raw.setState('READY');
    }

    notReady(reason) {
        this._raw.setState('NOT_READY', reason);
    }

    makeRoutable() {
        this._raw.setRoutable({routable: true});
    }

    makeNotRoutable() {
        this._raw.setRoutable({routable: false});
    }


    /**
     * Update our version of the media object using a response from the raw
     * Finesse API.
     */
    _updateFromResponse(response) {
        this.id = response.getId();
        this.name = response.getName();
        this.state = response.getState();
        this.routable = response.getRoutable();
        this._raw = response;
    }

    _tasksLoaded(rawTasks) {
        var rawTaskCollection = rawTasks.getCollection();

        for (var id in rawTaskCollection) {
            var rawTask = rawTaskCollection[id];

            this._taskStarted(rawTask);
        }

        if (this._loginPending) {
            this._loginPending = false;
            this._raw.login(this.mediaOptions);
        }
    }

    _loadTask(rawTask) {
        var task = this.tasks[rawTask.getId()] || new Task(this._finn);
        task._updateFromResponse(rawTask);

        this.tasks[rawTask.getId()] = task;

        return task;
    }

    _taskStarted(rawTask) {
        var task = this._loadTask(rawTask);
        rawTask.addHandler("change", this._taskUpdated.bind(this));
        this._finn.emit.call(this._finn, 'task_started', task)
    }

    _taskUpdated(rawTask) {
        var task = this._loadTask(rawTask);

        this._finn.emit.call(this._finn, 'task_updated', task);
        task.emit('updated');
    }

    _taskEnded(rawTask) {
        var task = this.tasks[rawTask.getId()];

        delete this.tasks[rawTask.getId()];

        this._finn.emit.call(this._finn, 'task_ended', task);
        task.emit('ended');
    }
}

export class Task extends EventEmitter {
    constructor(finn) {
        super();

        this._finn = finn;
    }

    accept() {
        this._finn.log("Accepting task.");
        this._raw.setTaskState('ACCEPT');
    }

    start() {
        this._finn.log("Starting task.");
        this._raw.setTaskState('START');
    }

    pause() {
        this._finn.log("Pausing task.");
        this._raw.setTaskState('PAUSE');
    }

    resume() {
        this._finn.log("Resuming task.");
        this._raw.setTaskState('RESUME');
    }

    wrapUp() {
        this._finn.log("Wrapping up task.");
        this._raw.setTaskState('WRAP_UP');
    }

    close() {
        this._finn.log("Closing task.");
        this._raw.setTaskState('CLOSE');
    }

    _updateFromResponse(response) {
        this.id = response.getId();
        this.state = response.getState();
        var mediaProperties = response.getMediaProperties();
        this.mediaId = mediaProperties.mediaId;
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

        this._raw = response;
    }
}