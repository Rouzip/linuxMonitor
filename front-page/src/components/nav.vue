<template>
  <el-menu @select="handleSelect">
    <h3>主机列表</h3>
    <el-menu-item v-for="(value, key) in getStateLinuxs" 
                  :key="key" 
                  :index="key"
                  class="item"
                  :disabled=getDisable(key)>
      <i class="el-icon-setting"></i>
      <span slot="title"> {{ value }} </span>
    </el-menu-item>
  </el-menu>

  
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { StorePackage } from '@/util';

@Component
export default class NavMenu extends Vue {
  public handleSelect(index: any): void {
    this.$store.dispatch('selectLinux', index);
  }

  public get getStateLinuxs() {
    return this.$store.state.linuxs;
  }

  public getDisable(id: string) {
    return this.$store.state.disable[id];
  }
}
</script>

<style scoped>
.item {
  border-radius: 800px 800px 800px 800px;
}
</style>
