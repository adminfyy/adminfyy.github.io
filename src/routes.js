export default  [{
		name: 'index',
    	path: '/about',
        component: () => require.ensure('./module/about.vue')
    },{
    	path: '/user/:id', 
    	component: () => require.ensure('./module/user.vue')
    }]
