<template>
   <div class="sidebar">
        <ul>
            <li><router-link to="home">HOME</router-link></li>
            <li><router-link to="field">Field Binding</router-link></li>
            <li><router-link to="about">About</router-link></li>
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