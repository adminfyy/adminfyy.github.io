<template>
	<div class="page">
		<header><h3><i>BLOG PAGE</i></h3></header>
		<div class="blog" v-for="blog in blogs" :title="blog.title" @click="goDetailPage(blog)">
			<div class="header"> {{blog.title}}</div>
		</div>
	</div>
</template>
<script>
import blogs from '../mock/blog.json'
export default {
	name: 'blog',
	data() {
		return {
			blogs: blogs
		}
	},
	methods: {
		goDetailPage (blog) {
			console.log('got detail by',  blog)
		}
	}
}
</script>
<style type="text/css" scoped>
.blog{
	border: 1px solid #ccc;
	margin: .3rem .3rem;
	padding: .1rem .1rem;
	border-radius: .3rem;
	text-align: left;
}
.blog .header{
	background: skyblue;
	border-radius: .3rem;
	margin: .5rem .5rem;
	padding: .1rem .1rem;
	height: 1rem;
	line-height: 1rem;
}
</style>