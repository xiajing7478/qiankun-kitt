import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import './public-path.js';
Vue.use(VueRouter)
Vue.config.productionTip = false
let instance = null
let router = null

function render(props = {}) {
    const { container } = props
    router = new VueRouter({
        // 如果是hash模式，下面2行可以不用
        base: window.__POWERED_BY_QIANKUN__ ? '/vue-app-3' : '/',
        mode: 'history',
        routes
    })
    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

// const storeTest = (props) => {
//     props.onGlobalStateChange && props.onGlobalStateChange((value, prev) => {
//         console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
//     })
//     props.setGlobalState && props.setGlobalState({
//         ignore: props.name,
//         user: {
//             name: props.name,
//         },
//     })
// }

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}
// 子应用首次启动时触发
export async function bootstrap(props = {}) {
    console.log('[vue] vue app bootstrap', props)
}
// 子应用每次启动时都会触发
export async function mount(props) {
    console.log('[vue] props from main framework', props)
        // storeTest(props)
    Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
    Vue.prototype.$setGlobalState = props.setGlobalState
    render(props)
}
// 子应用切换/卸载时触发
export async function unmount() {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
}