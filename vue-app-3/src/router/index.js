import Home from '../views/Home.vue';
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/About',
    // component: About,
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/About.vue')
}];

export default routes;