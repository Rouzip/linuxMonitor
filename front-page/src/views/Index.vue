<template>
  <el-container class="home">
    <el-aside class="aside">
      <nav-menu></nav-menu>
    </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
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

    wsocket.onmessage = (event) => {
      let dataOri: Package = new Package(event.data);
      let arr: StorePackage[] =
        this.$store.state.linuxs.get(dataOri.hostid) || [];
      // TODO: 判断消息类型
      switch (dataOri.type) {
        case 'create':
          // 第一次收到消息，将主机信息填充为0
          let datas = [];
          for (let i = 0; i < 10; i++) {
            datas.push(new StorePackage({}));
          }
          // this.$store.state.linuxs[dataOri.hostid] = datas;
          this.$store.state.linuxs.set(dataOri.hostid, datas);
          console.log(this.$store.state.linuxs);
          for (const i in this.$store.state.linuxs.keys()) {
            console.log(i);
          }
          // Vue.set(this.$store.state.linuxs, dataOri.hostid, datas);
          break;
        case 'message':
          // FIXME: 这里默认收到的message里面主机id都已经上线了
          let linuxShot: StorePackage = new StorePackage(event.data);
          let tmpArray = this.$store.state.linuxs[dataOri.hostid];
          tmpArray.shift();
          tmpArray.push(linuxShot);
          Vue.set(this.$store.state.linuxs, dataOri.hostid, tmpArray);
          break;
        case 'warn':
          this.$notify.error({
            title: '错误',
            message: `您的主机${dataOri.hostname}出现问题`,
          });
          break;

        default:
          break;
      }

      // arr.shift();
      // arr.push(linux);
      // let arr: Ilinux[] = this.$store.state.linux[dataOri.hostid];
    };
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
.aside {
  background-color: aqua;
}
.main {
  background-color: blueviolet;
}
</style>
