<template>
  <div class="board">
    <el-tabs>
      
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Board extends Vue {
  @Prop() private msg!: string;

  created() {
    const WEBSOCKETURL = 'ws://localhost:8000';
    const wsocket = new WebSocket(WEBSOCKETURL);
    this.$store.state.linux;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
