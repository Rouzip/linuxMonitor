import Vue from 'vue';
import Vuex from 'vuex';

import { Ilinux, Iprocess } from './declare';
import { Package, StorePackage } from '@/util';

Vue.use(Vuex);

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
    times: (state) => {
      const LinuxDatas = state.items.get(state.active);
      if (LinuxDatas !== undefined) {
        return LinuxDatas.map((item) => item.time);
      }
    },
    mems: (state) => {
      const LinuxDatas = state.items.get(state.active);
      if (LinuxDatas !== undefined) {
        return LinuxDatas.map((item) => item.mem);
      }
    },
    cpus: (state) => {
      const LinuxDatas = state.items.get(state.active);
      if (LinuxDatas !== undefined) {
        return LinuxDatas.map((item) => item.cpu);
      }
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
    changeShowLinuxStatus(state, id: string) {
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
    initItems(state, { id, datas }) {
      state.items.set(id, datas);
    },
  },
  actions: {
    initLinux({ commit }, id) {
      // 初始化主机状态，第一次收到消息，将主机信息填充为0
      const datas = [];
      for (let i = 0; i < 10; i++) {
        datas.push(new StorePackage({}));
      }
      commit('initItems', { id, datas });
    },
    addLinux({ state, dispatch }, { id, linuxName }) {
      // 添加主机id与主机名映射
      Vue.set(state.linuxs, id, linuxName);
      dispatch('initLinux', id);
    },
    selectLinux({ commit }, id) {
      // 选择查看主机
      commit('changeShowLinuxStatus', id);
    },
    // 删除某个主机，从nav中删除
    async removeLinux({ state }) {},
    // 获取数据之后，改动某个主机的数据，重新绘图
    async getData({ state }) {},
  },
});
