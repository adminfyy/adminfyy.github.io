<template>
  <div id="app">
    <sideBar/>
    <div class="container">
        <router-view></router-view>
    </div>
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
html,body{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.router-link-active{
  color: skyblue;
}
.container{
  display: inline-block;
  margin: 0px 0px 0px 9rem;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  text-align: center;
}
</style>
