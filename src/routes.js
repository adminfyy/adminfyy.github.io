const path = './module'

// const Foo = resolve => {
//   // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
//   // （代码分块）
//   require.ensure([], () => {
//     resolve(require('./Foo.vue'))
//   })
// }
export default [{
    path: '/',
    component: () => System.import(`${path}/home.vue`)
}, {
    path: '/home',
    component: System.import(`${path}/home.vue`)
}, {
    path: '/about',
    component: System.import(`${path}/about.vue`)
}, {
    path: '/user/:id',
    component: System.import(`${path}/user.vue`)
}]
