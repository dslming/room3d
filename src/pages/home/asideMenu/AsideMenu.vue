<template>
  <div class="asideMenu">
    <div class="item" :class="{active: menusStatus.editFloorplan}" @click="handleClick('editFloorplan')">
      <span class="left">{{menusText.editFloorplan}}</span>
      <span class="arrow">&gt;</span>
    </div>
    <div class="item" :class="{active: menusStatus.design}" @click="handleClick('design')">
      <span class="left">{{menusText.design}}</span>
      <span class="arrow">&gt;</span>
    </div>

    <div class="item" :class="{active: menusStatus.addItems}" @click="handleClick('addItems')">
      <span class="left">{{menusText.addItems}}</span>
      <span class="arrow">&gt;</span>
    </div>
  </div>
</template>

<script>
import { language } from "@/config/language.js";
export default {
  components: {},
  data() {
    return {
      menusText: language.asideMenu,
      menusStatus: {
        editFloorplan: true,
        design: false,
        addItems: false
      }
    };
  },
  methods: {
    setData(obj) {
      obj.menusStatus && (this.menusStatus = obj.menusStatus);
    },
    handleClick(name) {
      let temp = {
        editFloorplan: false,
        design: false,
        addItems: false
      };
      temp[name] = true;
      this.setData({
        menusStatus: temp
      });

      this.toPage(`/home/${name}`);
    },
    toPage(toPath) {
      let { path } = this.$route;
      path != toPath &&
        this.$router.push({
          path: toPath
        });
    }
  },
  mounted() {
    let { path } = this.$route;
    let name = path.substr(6);
    this.handleClick(name);
  }
};
</script>
<style lang='scss' scoped>
.asideMenu {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(153, 125, 125, 0.2);
  .item {
    user-select: none;
    cursor: pointer;
    width: 100%;
    height: 40px;
    background-color: #fff;
    color: #428bca;
    padding-right: 20px;
    padding-left: 20px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .active {
    background-color: #428bca;
    color: #fff;
  }

  .arrow {
  }
}
</style>
