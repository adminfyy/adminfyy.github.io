// const __debug = require('debug');
// const vue = require('vue');
// const vueRouter = require('vue-router');
import vue from 'vue';
import vueRouter from 'vue-router'
import debug from 'debug'
import App from './module/index.vue'
import _routes from './routes.js'
vue.use(vueRouter)
const routes = new vueRouter(_routes);
// debugger
const app = new vue({
    // routes
    el: '#app',
    render: h => h(App)
}).$mount('#app')
