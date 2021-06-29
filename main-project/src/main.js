import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 导入qiankun所需方法
import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, initGlobalState, addGlobalUncaughtErrorHandler } from 'qiankun'

// 注册子应用
/**
 * 1.RegistrableApp
 * name - string 必选，微应用的名称，微应用之间必须确保唯一
 * entry - string | { scripts?: string[]; styles?: string[]; html?: string } 必选，微应用的入口。
 * container - string | HTMLElement - 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')。
 * activeRule - string | (location: Location) => boolean | Array<string | (location: Location) => boolean> - 必选，微应用的激活规则。
 * loader - (loading: boolean) => void - 可选，loading 状态发生变化时会调用的方法。
 * props - object - 可选，主应用需要传递给微应用的数据。
 * 
 * 2.LifeCycles
 * beforeLoad - Lifecycle | Array<Lifecycle> - 可选
 * beforeMount - Lifecycle | Array<Lifecycle> - 可选
 * afterMount - Lifecycle | Array<Lifecycle> - 可选
 * beforeUnmount - Lifecycle | Array<Lifecycle> - 可选
 * afterUnmount - Lifecycle | Array<Lifecycle> - 可选
 */
registerMicroApps([{
        name: 'vue-app-1',
        // entry: '//localhost:8091',
        entry: '//localhost:5001',
        // entry: '//localhost:5001/vue-app-1',
        container: '#micro-view',
        activeRule: '/vue-app-1',
        // 增加props参数
        props: {
            msg: 'this is from main to vue-app-1'
        }
    },
    {
        name: 'vue-app-3',
        // entry: '//localhost:8093',
        entry: '//localhost:5002',
        // entry: 'http://localhost:5002/vue-app-3',
        container: '#micro-view',
        activeRule: '/vue-app-3',
        props: { name: 'kitt3' }
    }
], {
    beforeLoad: [
        app => {
            console.log('beforeLoad', app.name);
        }
    ],
    beforeMount: [
        app => {
            console.log('beforeMount', app.name);
        }
    ],
    afterMount: [
        app => {
            console.log('afterMount', app.name);
        }
    ],
    beforeUnmount: [
        app => {
            console.log('beforeUnmount', app.name);
        }
    ],
    afterUnmount: [
        app => {
            console.log('afterUnmount', app.name);
        }
    ]
})

/**
 * 通讯
 */
// 定义全局状态，可以在主应用、子应用中使用 - 可选
// const { onGlobalStateChange, setGlobalState } = initGlobalState({
//     user: 'qiankun'
// });
// // 监听全局状态变化
// onGlobalStateChange((value, prev) => console.log(
//     '[onGlobalStateChange]:', value, prev
// ));
// // 设置全局状态
// setGlobalState({
//     user: {
//         name: 'master'
//     }
// });

const actions = initGlobalState({
    mt: 'init'
})
actions.onGlobalStateChange((state, prev) => {
    console.log('main store change', state, prev)
})
actions.setGlobalState({
    user: 'qiankun'
})
Vue.prototype.$actions = actions

// 设置主应用启动后默认进入的微应用。可选
setDefaultMountApp('/vue-app-1')

// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
runAfterFirstMounted((effect => {
    console.log('[MainApp] first app mounted')
    console.log('effect', effect)
}))

// addGlobalUncaughtErrorHandler
// 全局的未捕获异常处理器，微应用发生报错的时候亦可以用这个api捕捉

addGlobalUncaughtErrorHandler((event) => {
    console.error(event)
    const { message } = event
    if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
        console.log('微应用加载失败，请检查应用是否可运行')
    }
})


/**
 * start(opts?)
 * opts - Options 可选
 * prefetch - boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] }) - 可选，是否开启预加载，默认为 true。
 * sandbox - boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean } - 可选，是否开启沙箱，默认为 true。
 * singular - boolean | ((app: RegistrableApp<any>) => Promise<boolean>); - 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
 * getPublicPath - (entry: Entry) => string - 可选，参数是微应用的 entry 值。
 * getTemplate - (tpl: string) => string - 可选。
 * excludeAssetFilter - (assetUrl: string) => boolean - 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理。
 */
start()
let router = null
router = new VueRouter({
    mode: 'history',
    routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')