<template>
  <el-tabs style="height:90%" @tab-click="handleClickTab">
    <el-tab-pane label="内存监控" style="100%">
      <mem-chart></mem-chart>
    </el-tab-pane>
    <el-tab-pane label="CPU监控">
      <cpu-chart></cpu-chart>
    </el-tab-pane>
    <el-tab-pane label="进程监控">
      <process-chart></process-chart>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MemChart from '@/components/memChart.vue';
import CpuChart from '@/components/cpuChart.vue';
import ProcessChart from '@/components/processChart.vue';

@Component({
  components: {
    MemChart,
    CpuChart,
    ProcessChart,
  },
})
export default class Board extends Vue {
  /**
   * handleClickTab
   * 处理tab，如果切换需要图表调整大小
   */
  public handleClickTab(tab: any) {
    this.$store.commit('changeTab', tab.index);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#content {
  height: 100%;
}
.el-tabs__content {
  height: 100%;
}
.el-tabs__content > * {
  height: 100%;
}
</style>
