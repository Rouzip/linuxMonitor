import Vue from 'vue';
import Vuex from 'vuex';

import { Iprocess } from './declare';
import { StorePackage } from '@/util';

Vue.use(Vuex);

const WEBSOCKETURL = 'ws://192.168.43.30:8000/websocket';
// const WEBSOCKETURL = 'ws://localhost:8000';

export default new Vuex.Store({
  state: {
    websocket: new WebSocket(WEBSOCKETURL),
    items: new Map<string, StorePackage[]>(), // 储存所有主机信息，以主机id作为键值，值为snapshot
    linuxs: {}, // 主机id与主机名映射
    active: '', // 显示主机列表
    memlabel: true,
    cpulabel: false,
    processlabel: false,
    times: [
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
      '00-00',
    ],
    mems: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    cpus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    processes: [] as Iprocess[],
    disable: {},
    deleteId: new Map<string, number>(),
  },
  mutations: {
    removeLinux(state, id: string): void {
      Vue.delete(state.linuxs, id);
      Vue.delete(state.items, id);
      state.deleteId.delete(id);
    },
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
        // Vue.set(state.items, id, newData);
        state.items.set(id, tmp);
      } else {
        // 去除旧数据，换为新数据
        data.shift();
        data.push(newData);
        Vue.set(state.items, id, data);
      }
    },
    changeActiveTimes(state, { linuxid, time }) {
      if (linuxid === state.active) {
        state.times.shift();
        state.times.push(time);
      }
    },
    changeActiveMems(state, { linuxid, mem }) {
      if (linuxid === state.active) {
        state.mems.shift();
        state.mems.push(mem);
      }
    },
    changeActiveCpus(state, { linuxid, cpu }) {
      if (linuxid === state.active) {
        state.cpus.shift();
        state.cpus.push(cpu);
      }
    },
    changeActiveProcesses(state, { linuxid, processes }) {
      if (linuxid === state.active) {
        const length = state.processes.length;
        for (let i = 0; i < length; i++) {
          state.processes.pop();
        }
        for (const item of processes) {
          state.processes.push(item);
        }
      }
    },
    initItems(state, { id, datas }) {
      state.items.set(id, datas);
    },
    changeLinuxTime(state, id) {
      // 从数据集中找到对应主机数据
      const items = state.items.get(id);
      // 由于服务器保证已经create，所以这列不会为空
      if (items !== undefined) {
        const times: string[] = [];
        items.map((item) => times.push(item.time));
        state.times = times;
      }
    },
    changeLinuxMem(state, id) {
      // 从数据集中找到对应主机数据
      const items = state.items.get(id);
      if (items !== undefined) {
        const mems: number[] = [];
        items.map((item) => mems.push(item.mem));
        state.mems = mems;
      }
    },
    changeLinuxCpu(state, id) {
      // 从数据集中找到对应主机数据
      const items = state.items.get(id);
      if (items !== undefined) {
        const cpus: number[] = [];
        items.map((item) => cpus.push(item.cpu));
        state.cpus = cpus;
      }
    },
    changeTab(state, index) {
      state.memlabel = false;
      state.cpulabel = false;
      state.processlabel = false;
      switch (index) {
        case '0':
          state.memlabel = true;
          break;
        case '1':
          state.cpulabel = true;
          break;
        case '2':
          state.processlabel = true;
          break;
        default:
          break;
      }
    },
    changeDisable(state, id) {
      Vue.set(state.disable, id, true);
    },
    checkDelete(state, id: string) {
      // 检查是否有定时器可以删除
      const linuxid = state.deleteId.get(id);
      if (linuxid !== undefined) {
        clearTimeout(linuxid);
        state.deleteId.delete(id);
      }
    },
    addDelete(state, { linuxid, timeid }) {
      state.deleteId.set(linuxid, timeid);
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
    addLinux({ state, dispatch, commit }, { id, linuxName }) {
      // 添加主机id与主机名映射
      Vue.set(state.linuxs, id, linuxName);
      Vue.set(state.disable, id, false);
      commit('checkDelete', id);
      dispatch('initLinux', id);
    },
    async selectLinux({ commit }, id) {
      await commit('changeLinuxTime', id);
      await commit('changeLinuxMem', id);
      await commit('changeLinuxCpu', id);
      // 选择查看主机
      commit('changeShowLinuxStatus', id);
    },
    // 获取数据之后，改动某个主机的数据，重新绘图
    async getData({ commit }, { id, newData }) {
      commit('changeData', { id, newData });
      commit('changeActiveTimes', { linuxid: id, time: newData.time });
      commit('changeActiveMems', { linuxid: id, mem: newData.mem });
      commit('changeActiveCpus', { linuxid: id, cpu: newData.cpu });
      commit('changeActiveProcesses', {
        linuxid: id,
        processes: newData.processes,
      });
    },
  },
});
