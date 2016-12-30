<template>
	<div>
    	<h5>{{ msg }}</h5>
    	<!-- <code>{{colorful}}</code> -->
    	<div v-for="color in colorful" class="square" v-bind:style="{ 'background-color': color}"></div>
    	</div>
	</div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'About Page'
    }
  },
  computed: {
  	colorful () {
  		const colorArray = [];
  		for (var i = 0,color = '#000'; i < 255; i++) {
  			color = `rgb(${i},${i},${i}`
  			colorArray.push(color)
  		};
  		return colorArray;
  	}
  }
}
</script>

<style>
	.square{
		width: 50px;
		height: 50px;
		display: inline-block;
		margin: 0px 0px;
		padding: 0px 0px;
		background-size: 100% 100%;
	}
</style>
