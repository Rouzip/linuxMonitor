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
import { setInterval } from 'timers';

@Component({
  components: {
    Board,
    NavMenu,
  },
})
export default class IndexView extends Vue {
  public get wsocket() {
    return this.$store.state.websocket;
  }

  public created() {
    this.wsocket.onmessage = (event: any) => {
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
          // 需要使nav中无法选择这个主机
          // TODO: 向nav发送事件，使得其不可选中
          this.$store.commit('changeDisable', dataOri.hostid);
          // 60s之后删除
          // TODO: 不知道之后是继续发，还是重新create
          setInterval(() => {
            console.log(dataOri.hostid);
          }, 60000);
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
