<template>
	<div class="thumb">
			<div class="flag">
				JavaScript
			</div>
			
			<footer>
				<p>Maintain by <a href="https://github.com/adminfyy">ADMINFYY</a></p>
			</footer>
	</div>
</template>
<script>
export default {
	name: 'home',
	data() {
		return {
			msg: 'Hello Vue'
		}
	}
}
</script>
<style type="text/css">
.thumb{
	height: 100%;
}
.flag{
	height: 50%;
	line-height: 3rem;
	background: skyblue;
}	
</style>