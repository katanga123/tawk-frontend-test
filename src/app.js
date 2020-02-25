import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(VueRouter)

import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'


window.axios = require('axios');


new Vue({
	router,
	el: '#app',
	render: h => h(App)
});