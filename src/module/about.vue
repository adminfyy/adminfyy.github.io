<template>
	<div class="about">
    	<h5 class="fl">{{ msg }}</h5>
    	<div v-for="color in colorful" class="square" v-bind:style="{ 'background': color}"></div>
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
      let color;
  		for (var i = 0; i < 256; i++) {
  			color = `rgba(${this.getRandomColor()},${this.getRandomColor()},${this.getRandomColor()}, 0.8)`;
  			colorArray.push(color);
  		};
  		return colorArray;
  	}
  },

  methods: {
    getRandomColor () {
      return parseInt(Math.random() * 256);
    }
  }
}
</script>

<style>
.about{
  font-size: 0px;
  text-align: left;
  /*margin: 0px 10rem;*/
  /*max-width: 50rem;*/
}
.square{
  font-size: 0px;
	width: 50px;
	height: 50px;
	display: inline-block;
	margin: 0px 0px;
	padding: 0px 0px;
	background-size: 100% 100%;
}
.fl{
  position: absolute;
  color: white;
  left: 50%;
  font-size: 1rem;
}
</style>
