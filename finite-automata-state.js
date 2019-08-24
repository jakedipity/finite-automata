class FiniteAutomataState {
    constructor(options) {
        this._transitionMap = {};
        this._transitionMapCheck = {};
        this._epsilonTransitions = [];
        this._epsilonTransitionsCheck = new Set();
        this._finiteAutomata = null;
        if (options && options.constructor === Object) {
            if (options.hasOwnProperty('finiteAutomata')) {
                this._finiteAutomata = options.finiteAutomata;
            }
        }

        this._id = this._finiteAutomata === null ? 0 : this._finiteAutomata.provisionId();
    }

    addTransition(chars, state) {
        const stateId = state.getId();
        if (!this._transitionMap.hasOwnProperty(chars)) {
            this._transitionMap[chars] = [state];
            this._transitionMapCheck[chars] = new Set([stateId]);
        } else if (!this._transitionMapCheck[chars].has(stateId)) {
            this._transitionMap[chars].push(state);
            this._transitionMapCheck[chars].add(stateId);
        }
    }

    hasTransition(chars) {
        return this._transitionMap.hasOwnProperty(chars);
    }

    getTransition(chars) {
        if (!this._transitionMap.hasOwnProperty(chars)) {
            return [];
        }

        return this._transitionMap[chars];
    }

    addEpsilonTransition(state) {
        const stateId = state.getId();
        if (!this._epsilonTransitionsCheck.has(stateId)) {
            this._epsilonTransitions.push(state);
            this._epsilonTransitionsCheck.add(stateId);
        }
    }

    hasEpsilonTransition() {
        return this._epsilonTransitions.length > 0;
    }

    getEpsilonTransitions() {
        return this._epsilonTransitions;
    }

    setId(id) {
        this._id = id;
    }

    getId(id) {
        return this._id;
    }

    deprovision() {
        if (this._finiteAutomata !== null) {
            this._finiteAutomata.deprovisionId(this._id);
        }

        this._transitionMap = {};
        this._transitionMapCheck = {};
        this._epsilonTransitions.length = 0;
        this._epsilonTransitions.clear();
    }
}

module.exports = FiniteAutomataState;
