import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
// import './public-path.js';
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

    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

// 生命周期 - 挂载前
export async function bootstrap(props) {
    console.log("[vue] vue app bootstrap", props);
}
// 生命周期 - 挂载后
export async function mount(props) {
    console.log("[vue] props from main framework", props);
    render(props);
}
// 生命周期 - 解除挂载
export async function unmount(props) {
    console.log('unmount....', props)
    instance.$destroy();
    instance.$el.innerHTML = "";
    instance = null;
    router = null;
}
// new Vue({
//   render: h => h(App),
// }).$mount('#app')