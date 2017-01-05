<template>
	<div class="demo">
		<h3>
		WHat do u Expect ? Form ?
		</h3>	
		<form>
			<form></form>		
			<input type="text" class="form-control"/>
		</form>

		<h3>Badge ?</h3>
		<div class="badge badge-primary">
			Badge
		</div>
		<div class="badge badge-success">
			Badge
		</div>
		<div class="badge badge-warning">
			Badge
		</div>

		<h3>Spinner ?</h3>
		<div class="spinner f-small"></div>
		<div class="spinner"></div>
		<div class="spinner f-large"></div>

		<h3>switch?</h3>
		<input type="checkbox" class="switch">
			make a switch using presudo[impossible]
		</div>
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

.switch{
	-webkit-appearance: none;
	appearance: none;
	position: relative;
	width: 2rem;
	height: 1rem;
	outline: none;
	background: black;
}
.switch::before,.switch::after{
	position: absolute;
	content: " ";
	left: 0px;
	top: 0px;
}


.switch[value="on"] {
	background-color: skyblue;
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
	background: green;
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