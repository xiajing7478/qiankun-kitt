// import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);
import Home from '../views/Home.vue';
import About from '../views/About.vue'
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/About',
    component: About
}];

// const router = new VueRouter({
//     mode: 'history',
//     routes
// });

export default routes;