import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入qiankun所需方法
import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, initGlobalState } from 'qiankun'


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
        entry: '//localhost:8091',
        container: '#micro-view',
        activeRule: '/vue-app-1',
        props: { name: 'kitt' }
    },
    {
        name: 'vue-app-2',
        entry: '//localhost:8092',
        container: '#micro-view',
        activeRule: '/vue-app-2'
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


// 定义全局状态，可以在主应用、子应用中使用 - 可选

initGlobalState({
    user: 'admin',
    info: {
        name: 'qianku'
    }
})


// 设置主应用启动后默认进入的微应用。可选
setDefaultMountApp('/vue-app-1')

// 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
runAfterFirstMounted((effect => {
    console.log('[MainApp] first app mounted')
    console.log('effect', effect)
}))

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

new Vue({
    render: h => h(App),
}).$mount('#app')