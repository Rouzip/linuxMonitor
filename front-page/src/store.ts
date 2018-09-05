import Vue from 'vue';
import Vuex from 'vuex';

import { Ilinux, Iprocess } from './declare';
import { Package, StorePackage } from '@/util';

Vue.use(Vuex);

/**
 * @author Rouzip
 * @class 每一个linux主机的一个时间状态的记录
 * TODO: 如何将快照，linux传输的数据对应起来
 */
class LinuxSnapShot implements Ilinux {
  [index: number]: Ilinux;
  public time: string; // 不可为空，服务器时间，hh-mm-ss
  public hostname: string; // linux主机名
  public cpu: number; // cpu占用百分比
  public mem: number; // 内存占用百分比
  public processes: Iprocess[]; // 程序列表

  constructor(obj: Package) {
    this.time = obj.time;
    this.hostname = obj.hostname;
    this.cpu = obj.cpu;
    this.mem = obj.mem;
    this.processes = obj.processes;
  }
}

export default new Vuex.Store({
  state: {
    linuxs: new Map<string, StorePackage[]>(), // 储存所有主机信息，以主机id作为键值，值为snapshot
  },
  mutations: {
    removeLinux(state, id: string): void {
      // fp拆包进行删除属性
      Object.entries(state.linuxs).reduce((newObj: {}, [key, val]) => {
        if (id in Object.keys(state.linuxs)) {
          return newObj;
        }
        return {
          ...newObj,
          [key]: val,
        };
      }, {});
      return undefined;
    },
    addLinux(state, { id, linux }) {
      // TODO: 添加进对象之中
      Object.defineProperty(state.linuxs, id, linux);
    },
  },
  actions: {
    // TODO: 重新绘图
  },
});
