<template>
	<div>
		<header>BLOG PAGE</header>
		<div :class="'blog'" v-for="blog in blogs" :title="blog.title" >
			<div class="header"> {{blog.title}}</div>
			<div class="content"> {{ blog.content }}</div>
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
	}
}
</script>
<style type="text/css">
.blog{

}
</style>