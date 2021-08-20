import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import './public-path.js';
Vue.use(VueRouter)
Vue.config.productionTip = false

let router = null
let instance = null

function render(props = {}) {
    const { container } = props
    router = new VueRouter({
        // 如果是hash模式，下面2行可以不用
        base: window.__POWERED_BY_QIANKUN__ ? '/vue-app-1' : '/',
        mode: 'history',
        routes
    })

    store.commit('setMsg', props.msg)

    instance = new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
    // 这里是挂载到自己的html中，基座会拿到这个挂载后的html将其插入进去
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

// 生命周期 - 挂载前
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props) {
    console.log("[vue] vue app bootstrap", props);
}
// 生命周期 - 挂载后
// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法 
export async function mount(props) {
    console.log("[vue] props from main framework", props);
    props.onGlobalStateChange((state, prev) => {
            console.log(state, prev)
        })
        // props.setGlobalState(state)
    render(props);
}
// 生命周期 - 解除挂载
// 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例 
export async function unmount(props) {
    console.log('unmount....', props)
    instance.$destroy();
    instance.$el.innerHTML = "";
    instance = null;
    router = null;
}