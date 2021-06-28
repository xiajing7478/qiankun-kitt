<template>
  <div id="main-app" class="main-wrap">
    <!-- <button @click="changeView('/vue-app-1')">子应用one</button>
    <button @click="changeView('/vue-app-3')">子应用two</button> -->
    <div class="main-left">
      <ul>
        <li><router-link to='/vue-app-1'>子应用1</router-link></li>
        <li><router-link to='/vue-app-3'>子应用2</router-link></li>
      </ul>
    </div>
    <div class="main-right">
      <h1 class="title">测试样式冲突</h1>
      <div>
        <el-button type="primary" @click="changeState('1')">修改state = 1</el-button>
        <el-button type="primary" @click="changeState('2')">修改state = 2</el-button>
      </div>
      <hr>
      <div id="micro-view"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeView(url) {
      history.pushState(null, url, url)
    },
    changeState(value) {
      this.$actions.setGlobalState({
        mt: value
      })
    }
  }
}
</script>

<style>
#main-app .title {
  color: red;
}
.main-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-left {
  transition: width 0.28s;
  width: 180px !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.main-left ul {
  font-weight: 400;
  line-height: 1.5;
  color: #fff !important;
  text-align: center;
  word-wrap: break-word;
  padding: 0;
}

.main-left ul li>a{
  color: #fff;
  text-decoration: none;
  line-height: 40px;
  display: inline-block;
}
.main-right {
  min-height: 100%;
  -webkit-transition: margin-left .28s;
  transition: margin-left .28s;
  margin-left: 180px;
  position: relative;
}
</style>
