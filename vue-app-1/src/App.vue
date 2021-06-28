<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>{{msg}}</p>
    <router-link to="/">首页</router-link>
    
    <router-link to="/about">关于我们</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      msg: this.$store.state.msg
    }
  },
  mounted() {},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
