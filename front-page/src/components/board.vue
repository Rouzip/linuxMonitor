<template>
  <el-tabs @tab-click="handleClick">
    <el-tab-pane label="内存监控">内存监控</el-tab-pane>
    <el-tab-pane label="CPU监控">CPU监控</el-tab-pane>
    <el-tab-pane label="进程监控">进程监控</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Board extends Vue {
  @Prop() private msg!: string;

  public handleClick() {
    return undefined;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
