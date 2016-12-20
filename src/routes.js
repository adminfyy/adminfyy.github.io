const path = './module'

// const Foo = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
//   // （代码分块）
//   require.ensure([], () => {
//     resolve(require('./Foo.vue'))
//   })
// }
export default [{
    name: 'default',
    path: '/',
    component: resolve => require([`${path}/home.vue`], resolve)
}, {
    name: 'home',
    path: '/home',
    component: resolve => require([`${path}/home.vue`], resolve)
}, {
    name: 'about',
    path: '/about',
    component: resolve => require([`${path}/about.vue`], resolve)
}, {
    name: 'user',
    path: '/user/:id',
    component: resolve => require([`${path}/user.vue`], resolve)
}]
