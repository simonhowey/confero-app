//based on https://github.com/frandiox/vue-onsenui-kitchensink/blob/master/src/store.js

const state = {
    stack: [],
    options: {}
};

const mutations = {
    push(state, page) {
        state.stack.push(page);
    },
    pop(state) {
        if (state.stack.length > 1) {
            state.stack.pop();
        }
    },
    replace(state, page) {
        state.stack.pop();
        state.stack.push(page);
    },
    reset(state, page) {
        state.stack = [page || state.stack[0]];
    },
    options(state, newOptions = {}) {
        state.options = newOptions;
    },
    changeTab(state, index){
        state.activeTabIndex = index;
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    mutations
}
