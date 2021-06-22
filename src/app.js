import Vue from 'vue';
import Router from 'vue-router';
import App from './root/index.vue'
import routes from './routes.js'

Vue.use(Router);

const router = new Router({ routes });
const app = new Vue(Vue.util.extend({
	router
}, App))
app.$mount('#app')
// app.$mount("#app")