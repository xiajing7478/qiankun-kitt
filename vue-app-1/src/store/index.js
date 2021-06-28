import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        msg: '',
        store: {}
    },
    mutations: {
        setMsg(state, msg) {
            state.msg = msg
        },
        initStore(state, data) {
            state.store = data
        },
        setStore(state, data) {
            state.store = {...state.store, ...data }
        }
    },
    actions: {},
    modules: {},
    getters: {},
    plugins: []
})

export default store