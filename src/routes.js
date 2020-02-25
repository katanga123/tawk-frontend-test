import VueRouter from 'vue-router'
import JSONData from "../data/data.json"

import home from '../src/pages/Home.vue'
import category from '../src/pages/Category.vue'

let routes = [
    {
        path: '/',
        name: "home",
        component: home,
        props: true
    },
    {
        path: '/category/:id',
        name: 'category',
        component: category,
        params: true
    },
];



export default new VueRouter({
    routes,
});