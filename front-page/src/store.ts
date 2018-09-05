import Vue from 'vue';
import Vuex from 'vuex';

import { Ilinux, Iprocess } from './declare';

Vue.use(Vuex);

/**
 * @author Rouzip
 * @class 每一个linux主机的一个时间状态的记录
 * TODO: 如何将快照，linux传输的数据对应起来
 */
class LinuxSnapShot implements Ilinux {
  [index: number]: Ilinux;

  public active: boolean[]; // 是否活跃
  public id: string; // 主机id
  public name: string; // 主机名
  public cpu: number; // cpu使用数据
  public mem: number; // 内存使用量
  public processes: Iprocess[]; // 程序列表

  constructor(l: Ilinux) {
    this.id = l.id;
    this.name = l.name;
    this.cpu = l.cpu;
    this.mem = l.mem;
    this.processes = l.processes;
    this.active = [];
    this.processes.forEach((_) => this.active.push(true));
  }
}

export default new Vuex.Store({
  state: {
    linuxs: Object, // 储存所有主机信息，以主机id作为键值，值为snapshot
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
  actions: {},
});
