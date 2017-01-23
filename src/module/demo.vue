<template>
	<div class="demo">
		<h1>
		Demonstration
		</h1>	
		<form>	
			<input type="text" class="form-control"/>
		</form>

		<h3>Badge</h3>
		<div class="badge badge-primary">
			Badge primary
		</div>
		<div class="badge badge-success">
			Badge success
		</div>
		<div class="badge badge-warning">
			Badge warning
		</div>

		<h3>Spinner</h3>
		<div class="spinner f-small"></div>
		<div class="spinner"></div>
		<div class="spinner f-large"></div>

		<h3>switch</h3>
		<label for="switch-1">Make a fake switch</label>
		<div id="switch-1" type="checkbox" class="switch"></div>
		<div id="switch-1" type="checkbox" class="green switch"></div>
		<div id="switch-1" type="checkbox" class="red switch"></div>
	</div>
</template>
<script>
export default {
	name: 'demo',
	data() {
		return {
		}
	}
}
</script>
<style type="text/css"  scoped>
.demo{
	text-align: left;
	margin: .3rem .5rem;
}
.form-control{
	padding: .5rem .5rem;
	border-radius: .5rem;
	border: 1px solid #ccc;
	outline: none;
}

.form-control:focus{
	border-color: skyblue;
}

.switch{
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	position: relative;
	width: 2rem;
	height: 1rem;
	outline: none;
	margin: 1rem 0;
	border-radius: 1rem;
	/*border: 1px solid grey;*/
	/*border-bottom: none;*/
}
.switch::before,.switch::after{
	position: absolute;
	content: " ";
	left: 0px;
	top: 0px;
	height: 1rem;
	border-radius: 1rem;
}
.switch::before{
	width: 1rem;
	background: white;
	z-index: 3;
	box-shadow: 0px 1px 5px #888888;
}
.switch::after{
	width: 2rem;
	z-index: 2;
	box-shadow: inset 1px 1px 1px #888888;
}

.switch:hover::before{
	left: 1rem;
}
.switch:hover::after{
	background: skyblue;
}

.green.switch:hover::after{
	background: green;
}
.red.switch:hover::after{
	background: crimson;
}

.badge {
	border-radius: 1rem;
	background: grey;
	display: inline-block;
	padding: .3rem;
	color: white;
}
.badge-primary {
	background: skyblue;
}
.badge-success {
	background: forestgreen;
}
.badge-warning {
	background: red;
}

.spinner{
	display: inline-block;	
	width: 1rem;
	height: 1rem;
	border: 2px solid #ccc;
	border-radius: 50%;
	border-bottom: none;
	box-sizing: border-box;
	animation: rotate-all-the-time .8s infinite linear;
}
.f-large{
	width: 1.5rem;
	height: 1.5rem;
}
.f-small{
	width: .8rem;
	height: .8rem;
}
@keyframes rotate-all-the-time {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>