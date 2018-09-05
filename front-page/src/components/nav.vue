<template>
  <div id="top">
    <el-menu @select="handleSelect"
              mode="horizontal"
              background-color="#1e679e">
      <el-menu-item v-for="linux in this.$store.state.linuxs" 
                    :key="linux">
        {{ linux.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NavMenu extends Vue {
  public handleSelect(index: any, indexPath: any): void {
    console.log(index, indexPath);
  }
}
</script>
