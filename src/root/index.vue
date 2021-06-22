<template>
  <div id="app">
    <sideBar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from "./sidebar.vue";
export default {
  name: "app",
  data() {
    return {
      msg: "IndexPage",
    };
  },
  components: {
    sideBar,
  },
};
</script>

<style>
body {
  margin: 0px 0px;
  padding: 0px 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.router-link-active {
  color: skyblue;
}
.container {
  display: inline-block;
  margin: 0px auto;
  height: 100%;
  overflow: auto;
  position: relative;
  padding: 0 0.5rem 0.5rem 9.5rem;
  box-sizing: border-box;
  width: 100%;
}
html {
  font-size: 18px;
}
</style>
