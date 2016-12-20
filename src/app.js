const Vue = require('vue');
const Router = require('vue-router');
import App from './module/index.vue'
import routes from './routes.js'

Vue.use(Router);

const router = new Router({routes});
const app = new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
// app.$mount("#app")