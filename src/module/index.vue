<template>
  <div id="appView">
    <sideBar/>
    <route-view name="container"></route-view>
</template>

<script>
import sideBar from './sidebar.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'IndexPage'
    }
  },
  components:{
    sideBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-active{
  color: skyblue;
}
</style>
