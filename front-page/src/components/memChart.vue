<template>
  <div id="mem">
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import echarts, { ECharts } from 'echarts';
import { Watch } from 'vue-property-decorator';

@Component
export default class MemChart extends Vue {
  public myChart: ECharts | undefined = undefined;

  // TODO: 将公用配置写在类外，生成专属的列表图
  public get getLinuxData() {
    return this.$store.getters.activeLinuxData;
  }

  mounted() {
    this.myChart = echarts.init(<HTMLDivElement>document.getElementById('mem'));
    const that = this;
    // 监听窗口大小改变事件，动态地调整图大小
    window.addEventListener('resize', () => {
      if (that.myChart !== undefined) that.myChart.resize(); //初始化的
    });
  }

  public times = [];
  public mems = [];

  public get cleanTimeData() {
    console.log(12);
    this.$store.state.items.map((item: any) => console.log(item.time));
    return this.$store.state.items.map((item: any) => item.time);
  }

  @Watch('getLinuxData')
  draw() {
    if (this.myChart === undefined) {
      this.myChart = echarts.init(<HTMLDivElement>document.getElementById(
        'mem',
      ));
      this.myChart.setOption(this.option);
    } else {
      // 有激活数据或者第一次传入数据，跟随父组件大小
      this.myChart.resize();
      this.myChart.setOption(this.option);
    }
  }

  public option = {
    title: {
      text: '内存监控图',
    },
    toolbox: {
      left: 'center',
      itemSize: 25,
      top: 55,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    tooltip: {},
    legend: {
      data: ['内存占用'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {
      name: '内存大小/MB',
    },
    series: [
      {
        name: '内存',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
}
</script>

<style scoped>
#mem {
  width: 100%;
  height: 85%;
}
canvas {
  height: 100%;
  width: 100%;
}
</style>
