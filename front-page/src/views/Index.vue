<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Board msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/board.vue'; // @ is an alias to /src
import NavMenu from '@/components/nav.vue';

@Component({
  components: {
    Board,
  },
})
export default class IndexView extends Vue {}
</script>
