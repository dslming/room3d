<template>
  <div class="editFloorplan">
    <div class="tool">
      <div class="left">
        <el-button plain icon="el-icon-view" :disabled="state.move.disable" type="warning" size="small" @click="handleClick('move')" :class="{clicked: state.move.disable, noClick: !state.move.disable}">{{btnText.moveWallsText}}</el-button>
        <el-button plain icon="el-icon-edit" :class="{clicked: state.draw.disable, noClick: !state.draw.disable}" :disabled="state.draw.disable" type="warning" size="small" @click="handleClick('draw')">{{btnText.drawWallsText}}</el-button>
        <el-button plain icon="el-icon-delete" :class="{clicked: state.delete.disable, noClick: !state.delete.disable}" :disabled="state.delete.disable" type="warning" size="small" @click="handleClick('delete')">{{btnText.deleteWallsText}}</el-button>
      </div>

      <div class="right">
        <el-button round icon="el-icon-circle-plus" type="primary" size="small">{{btnText.done}}</el-button>
      </div>
    </div>

    <div class="draw-content">
      <canvas id="floorplanner"></canvas>
    </div>
  </div>
</template>

<script>
import { language } from "@/config/language.js";
import Blueprint3d from "@/blueprint3d/dist/blueprint3d";
export default {
  components: {},
  data() {
    return {
      state: {
        move: {
          disable: true
        },
        draw: {
          disable: false
        },
        delete: {
          disable: false
        }
      },
      btnText: language.editFloorplan
    };
  },
  methods: {
    handleClick(v) {
      this.state["move"].disable = false;
      this.state["draw"].disable = false;
      this.state["delete"].disable = false;
      this.state[v].disable = true;
    }
  },
  created() {},
  mounted() {
    let blueprint3d = new Blueprint3d("floorplanner");
    window.lm = blueprint3d;
  }
};
</script>
<style lang='scss' scoped>
.clicked {
  background-color: #67c23a !important;
  color: #fff !important;
}

.el-button--warning.is-plain {
  color: #000;
  &:hover {
    color: #000;
  }
}
.noClick {
  background-color: #ccc !important;
  border-color: #ccc !important;
}
.editFloorplan {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .tool {
    width: 100%;
    position: absolute;
    padding: 0 10px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
  }
  .draw-content {
    width: 100%;
    height: 100%;
  }
}
</style>
