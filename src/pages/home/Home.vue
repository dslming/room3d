<template>
  <el-container class="home">
    123
    <el-aside width="200px" class="aside">
      <aside-menu />
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from "./asideMenu/AsideMenu";

export default {
  components: { AsideMenu },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  .aside {
    // background-color: rgb(147, 216, 216, 0.2);
    height: 100%;
  }
  .main {
    // background-color: rgb(168, 211, 176, 0.2);
    height: 100%;
    padding: 0;
  }
}
</style>
