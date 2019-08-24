class FiniteAutomata {
    constructor() {
        this._idStack = [0];
        this._rootState = null;
    }

    provisionId() {
        let retId = 0;
        if (this._idStack.length === 1) {
            retId = this._idStack[0]++;
        } else {
            retId = this._idStack.pop();
        }

        return retId;
    }

    deprovisionId(id) {
        this._idStack.push(id);
    }

    setRootState(node) {
        this._rootState = node;
    }

    getRootState() {
        return this._rootState;
    }

    prettyPrint() {
        if (this._rootState === null) {
            return;
        }

        let visitedStates = new Set([this._rootState.getId()]);
        let prettyStates = [];

        this._prettyPrintHelper(this._rootState, visitedStates, prettyStates);

        for (let i = 0; i < prettyStates.length; ++i) {
            const prettyState = prettyStates[i];
            if (i !== 0) {
                console.log('');
            }

            console.log(`STATE ${prettyState.id}:`);
            for (const transitionPair of prettyState.transitionMap) {
                console.log(`\t"${transitionPair[0]}": ${transitionPair[1]}`);
            }
            if (prettyState.epsilonTransitions.length > 0) {
                console.log(`\t"ε": ${prettyState.epsilonTransitions}`);
            }
        }
    }

    _prettyPrintHelper(currentState, visitedStates, prettyStates) {
        let prettyState = {
            id: currentState.getId()
            , transitionMap: []
            , epsilonTransitions: []
        };

        let visitStates = [];

        for (const chars in currentState._transitionMap) {
            if (!currentState._transitionMap.hasOwnProperty(chars)) {
                continue;
            }

            const transitionStates = currentState._transitionMap[chars];
            let prettyTransitionStates = [];
            for (const transitionState of transitionStates) {
                const transitionStateId = transitionState.getId();

                prettyTransitionStates.push(transitionStateId);
                visitStates.push(transitionState);
            }

            prettyState.transitionMap.push([chars, prettyTransitionStates]);
        }

        for (const epsilonTransition of currentState._epsilonTransitions) {
            const epsilonTransitionId = epsilonTransition.getId();

            prettyState.epsilonTransitions.push(epsilonTransitionId);
            visitStates.push(epsilonTransition);
        }

        prettyStates.push(prettyState);

        for (const visitState of visitStates) {
            const visitStateId = visitState.getId();
            if (!visitedStates.has(visitStateId)) {
                visitedStates.add(visitStateId);
                this._prettyPrintHelper(visitState, visitedStates, prettyStates);
            }
        }
    }
}

module.exports = FiniteAutomata;
