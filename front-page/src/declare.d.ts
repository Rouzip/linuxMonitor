// 从websocket传输的时候linux格式
export interface Ipackage extends Ilinux {
  [index: number]: Ipackage;
  type: string; // 不可为空

  hostid: string; // 默认不重复，message重要
  hostname: string; // linux主机名
}

// 基本数据定义
export interface Ilinux {
  [index: number]: Ilinux;
  time: string; // 不可为空，服务器时间，mm-ss
  cpu: number; // cpu占用百分比
  mem: number; // 内存占用量
  processes: Iprocess[]; // 程序列表
}

// 从websocket传输的时候process格式
export interface Iprocess {
  [index: number]: Iprocess;
  id: string; // 程序pid
  name: string; // 程序名
  mem: number; // 程序占用内存
  cpu: number; // 程序消耗cpu量
  auth: boolean; // 是否有权限杀进程
}
