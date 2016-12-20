<template>
   <div class="sidebar">
        <ul>
            <li><router-link to="{ name: 'home'}">Home</router-link></li>
            <li><router-link to="{ name: 'blog'}">Blog</router-link></li>
            <li><router-link to="{ name: 'about'}">About</router-link></li>
            <li><router-link to="{ name: 'user', params:{ id: 'admin'}}">user admin</router-link></li>
            <!-- 
          <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
          <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
          <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
          <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
          <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
          <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
          <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
          <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style>
.sidebar {
    position: absolute;
    width: 9rem;
    left: 0px;
    top: 0px;
    height: 100%;
    margin: 0px auto;
    border-right: 1px solid grey;
}
.sidebar ul {
    list-style: none;
    padding: 0px 0px;
}
.sidebar ul li{
    display: inline-block;
    padding: .5rem .5rem;
    width: 8rem;
}
a{
    text-decoration: none;
    color: grey;
}

</style>