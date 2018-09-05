import { hostname } from 'os';

// 从websocket传输的时候linux格式
export interface Ipackage {
  [index: number]: Ipackage;
  type: string; // 不可为空
  time: string; // 不可为空，服务器时间，hh-mm-ss
  hostid: string; // 默认不重复
  hostname: string; // linux主机名
  cpu: number; // cpu占用百分比
  mem: number; // 内存占用百分比
  processes: Iprocess[]; // 程序列表
}

export interface Ilinux {
  [index: number]: Ilinux;
  id: string; // 主机id，为了区分同名的linux主机，不显示给用户
  name: string; // 主机名
  cpu: number; // cpu使用数据
  mem: number; // 内存使用量
  processes: Iprocess[]; // 程序列表
}

// 从websocket传输的时候process格式
export interface Iprocess {
  [index: number]: Iprocess;
  id: string; // 程序pid
  name: string; // 程序名
  mem: number; // 程序占用内存
  cpu: number; // 程序消耗cpu量
}

// store中存储格式
export interface IlinuxShot {
  [index: number]: IlinuxShot;
  cpu: number; // cpu使用数据
  mem: number; // 内存使用量
  processes: Iprocess[]; // 程序列表
}
