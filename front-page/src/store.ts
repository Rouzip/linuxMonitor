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
    items: new Map<string, StorePackage[]>(), // 储存所有主机信息，以主机id作为键值，值为snapshot
    linuxs: {}, // 主机id与主机名映射
    active: '', // 显示主机列表
  },
  getters: {
    activeLinuxData: (state) => {
      return state.items.get(state.active);
    },
  },
  mutations: {
    // removeLinux(state, id: string): void {
    //   // fp拆包进行删除属性
    //   Object.entries(state.linuxs).reduce((newObj: {}, [key, val]) => {
    //     if (id in Object.keys(state.linuxs)) {
    //       return newObj;
    //     }
    //     return {
    //       ...newObj,
    //       [key]: val,
    //     };
    //   }, {});
    //   return undefined;
    // },
    initLinux(state, id) {
      // 初始化主机状态，第一次收到消息，将主机信息填充为0
      const datas = [];
      for (let i = 0; i < 10; i++) {
        datas.push(new StorePackage({}));
      }
      state.items.set(id, datas);
    },
    showLinuxStatus(state, id: string) {
      state.active = id;
    },
    changeData(state, { id, newData }) {
      const data: StorePackage[] | undefined = state.items.get(id);
      if (data === undefined) {
        // 警告的机子又有新数据
        const tmp: StorePackage[] = [];
        for (let i = 0; i < 9; i++) {
          tmp.push(new StorePackage({}));
        }
        tmp.push(newData);
        state.items.set(id, tmp);
      } else {
        // 去除旧数据，换为新数据
        data.shift();
        data.push(newData);
        state.items.set(id, data);
      }
    },
  },
  actions: {
    addLinux({ state, commit }, { id, linuxName }) {
      // 添加主机
      Vue.set(state.linuxs, id, linuxName);
      commit('initLinux', id);
      // state.linuxs.set('123', linux);
    },
    // 删除某个主机，从nav中删除
    async removeLinux({ state }) {},
    // 获取数据之后，改动某个主机的数据，重新绘图
    async getData({ state }) {},
  },
});
