const path = './module';
export default [{
    path: '/',
    component: () => System.import(`${path}/home.vue`)
}, {
    path: '/home',
    component: () => System.import(`${path}/home.vue`)
}, {
    path: '/about',
    component: () => System.import(`${path}/about.vue`)
}, {
    path: '/user/:id',
    component: () => System.import(`${path}/user.vue`)
}, {
    path: '/blog',
    component: () => System.import(`${path}/blog.vue`)
}]
