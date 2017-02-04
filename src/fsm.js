class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config == null){
            throw new Error();
        }
        this.config = config;
        this.state = config.initial;
        this.history = [];
        this.undo_history = [];
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.config.states.hasOwnProperty(state)) {
            this.history.push(this.state);
            this.undo_history = [];
            this.state = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states.hasOwnProperty(this.state)) {
            var transitions = this.config.states[this.state];
            if(transitions.transitions.hasOwnProperty(event)) {
                this.changeState(transitions.transitions[event]);
            } else {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event === undefined) {
            return Object.getOwnPropertyNames(this.config.states);
        }
        var states = [];
        for(var k in this.config.states) {
            var transitions = this.config.states[k];
            if(transitions.transitions.hasOwnProperty(event)) {
                states.push(k);
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        var l = this.history.length;
        if(l > 0) {
            this.undo_history.push(this.state);
            this.state = this.history.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        var l = this.undo_history.length;
        if(l > 0) {
            this.history.push(this.state);
            this.state = this.undo_history.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Halina Bahdanava **/
