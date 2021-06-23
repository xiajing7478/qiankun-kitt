import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        msg: ''
    },
    mutations: {
        setMsg(state, msg) {
            state.msg = msg
        }
    },
    actions: {},
    modules: {}
})

export default store