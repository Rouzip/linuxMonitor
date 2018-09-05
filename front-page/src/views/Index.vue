<template>
  <div class="home">
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// 组件部分
import Board from '@/components/board.vue';
import NavMenu from '@/components/nav.vue';

// 工具函数部分
import { Package, StorePackage } from '@/util';
import { Ipackage, Ilinux } from '@/declare';

@Component({
  components: {
    Board,
    NavMenu,
  },
})
export default class IndexView extends Vue {
  public created() {
    const WEBSOCKETURL = 'ws://localhost:8000';
    // 展示数组长度
    const LENGTH = 10;

    const wsocket = new WebSocket(WEBSOCKETURL);
    let datas = [];

    for (let i = 0; i < 10; i++) {
      datas.push(new StorePackage({}));
    }
    
    wsocket.onmessage = (event) => {
      let dataOri: Package = new Package(event.data);
      let linux: StorePackage = new StorePackage(event.data);
      let arr: StorePackage[] =
        this.$store.state.linuxs.get(dataOri.hostid) || [];
      console.log(arr);
      // arr.shift();
      // arr.push(linux);
      // let arr: Ilinux[] = this.$store.state.linux[dataOri.hostid];

      // TODO: 数据结构如何定
      Vue.set(this.$store.state.linuxs, dataOri.hostid, arr);
    };
  }
}
</script>

<style scoped>
.aside {
  background-color: aqua;
}
.main {
  background-color: blueviolet;
}
</style>
