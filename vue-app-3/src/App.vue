<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 class="title">子样式</h1>
    <h1>{{'this is my name --- '+ user.name}}</h1>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      user: {
        name: 'init name'
      }
    }
  },
  mounted() {
    this.$onGlobalStateChange((state, prev) => {
      if (state.mt !== prev.mt) {
        this.user.name = state.mt
      }
    })
    // this.$setGlobalState((state, prev) => {
    //   console.log('setGlobalState', state, prev)
    // })
  }
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
#app .title {
  color: yellow;
}
</style>
