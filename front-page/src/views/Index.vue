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
    const WEBSOCKETURL = 'ws://localhost:8000';
    // 展示数组长度
    const LENGTH = 10;

    const wsocket = new WebSocket(WEBSOCKETURL);

    wsocket.onmessage = (event) => {
      let dataOri: Package = new Package(event.data);
      let arr: StorePackage[] =
        this.$store.state.items.get(dataOri.hostid) || [];
      // TODO: 判断消息类型
      switch (dataOri.type) {
        case 'create':
          this.$store.dispatch({
            type: 'addLinux',
            id: dataOri.hostid,
            linuxName: dataOri.hostname,
          });
          this.$notify({
            title: '通知',
            message: `您的主机${dataOri.hostname}已上线`,
            type: 'success',
          });
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
</style>
