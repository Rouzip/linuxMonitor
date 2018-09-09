<template>
  <el-container class="home">
    <el-aside class="aside">
      <nav-menu></nav-menu>
    </el-aside>
    <el-main class="main">
      <board></board>
    </el-main>
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
    // const WEBSOCKETURL = 'ws://192.168.43.30:8000/websocket'
    const WEBSOCKETURL = 'ws://localhost:8000';

    const wsocket = new WebSocket(WEBSOCKETURL);

    wsocket.onmessage = (event) => {
      let dataOri: Package = new Package(event.data);
      let linuxId: string = dataOri.hostid;
      let linuxName: string = dataOri.hostname;
      switch (dataOri.type) {
        case 'create':
          this.$store.dispatch({
            type: 'addLinux',
            id: linuxId,
            linuxName: linuxName,
          });
          this.$notify({
            title: '通知',
            message: `您的主机${dataOri.hostname}已上线`,
            type: 'success',
          });
          break;
        case 'message':
          // FIXME: 这里默认收到的message里面主机id都已经上线了
          // 解析数据，改变数据
          let linuxShot: StorePackage = new StorePackage(event.data);
          this.$store.dispatch({
            type: 'getData',
            id: linuxId,
            newData: linuxShot,
          });
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
    };
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
</style>
