<template>
  <div id="cpu">
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import echarts, { ECharts } from 'echarts';
import { Watch } from 'vue-property-decorator';

@Component
export default class CpuChart extends Vue {
  public myChart: ECharts | undefined = undefined;
  public option = {
    title: {
      text: 'CPU监控图',
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
        dataView: {},
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['内存占用'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      name: '时间 mm-ss',
      data: this.getTime,
      min: 'dataMin',
      max: 9,
    },
    yAxis: {
      name: '内存大小/KB',
    },
    series: [
      {
        name: '内存',
        type: 'line',
        data: this.getCpu,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' },
          ],
        },
        markLine: {
          data: [
            { type: 'average', name: '平均值' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max',
              },
              {
                symbol: 'circle',
                label: {
                  normal: {
                    position: 'start',
                    formatter: '最大值',
                  },
                },
                type: 'max',
                name: '最高点',
              },
            ],
          ],
        },
      },
    ],
  };

  public get getTime() {
    return this.$store.state.times;
  }

  public get getCpu() {
    const tmp: number[] = [];
    this.$store.state.cpus.map((item: number) => tmp.push(item));
    return tmp;
  }

  public get getCpuLabel() {
    return this.$store.state.cpulabel;
  }

  public mounted() {
    this.myChart = echarts.init(document.getElementById(
      'cpu',
    ) as HTMLDivElement);
    const that = this;
    // 监听窗口大小改变事件，动态地调整图大小
    window.addEventListener('resize', () => {
      if (that.myChart !== undefined) {
        // 初始化
        that.myChart.resize();
      }
    });
  }

  @Watch('getCpuLabel')
  public changeTab() {
    if (this.myChart !== undefined) {
      this.myChart.resize();
    }
  }

  @Watch('getCpu')
  public draw() {
    if (this.myChart === undefined) {
      // TODO:没可能走这条分支的
      this.myChart = echarts.init(document.getElementById(
        'cpu',
      ) as HTMLDivElement);
      this.myChart.setOption(this.option);
    } else {
      // 有激活数据或者第一次传入数据，跟随父组件大小
      this.myChart.resize();
      // watcher无法监控data改变，所以只能重新赋值
      this.option.series[0].data = this.getCpu;
      this.option.xAxis.data = this.getTime;
      this.myChart.setOption(this.option);
    }
  }
}
</script>

<style scoped>
#cpu {
  width: 100%;
  height: 95%;
}
canvas {
  height: 100%;
  width: 100%;
}
</style>