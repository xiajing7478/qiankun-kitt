<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    这是主应用文字
    <br>
    <button @click="changeView('/vue-app-1')">子应用one</button>
    &nbsp;
    <button @click="changeView('/vue-app-3')">子应用two</button>
    <hr>
    <div id="micro-view"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  methods: {
    changeView(url) {
      history.pushState(null, null, url)
    }
  },
  // components: {
  //   HelloWorld
  // }
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
