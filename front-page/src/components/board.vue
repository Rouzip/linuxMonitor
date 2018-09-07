<template>
  <el-tabs style="height:90%">
    <el-tab-pane label="内存监控" style="100%">
      <mem-chart></mem-chart>
    </el-tab-pane>
    <el-tab-pane label="CPU监控">CPU监控</el-tab-pane>
    <el-tab-pane label="进程监控">进程监控</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MemChart from '@/components/memChart.vue';

@Component({
  components: {
    MemChart,
  },
})
export default class Board extends Vue {}
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
