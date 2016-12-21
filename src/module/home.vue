<template>
	<div class="thumb">
			__yy JavaScript
			<p>FrontEnd developed by vue.vue-router.</p>
			<footer>power by <a href="https://github.com/adminfyy"></a></footer>
	</div>
</template>
<script>
import blog from '../mock/blog.json'
export default {
	name: 'home',
	data() {
		return {
			msg: 'Hello Vue',
			filter: '',
			blog: blog
		}
	}
}
</script>
<style type="text/css">
</style>