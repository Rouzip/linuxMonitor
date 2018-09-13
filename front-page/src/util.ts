import { Ipackage, Iprocess, Ilinux } from './declare';

/**
 * @class 解包虚基类，从收到的包中结构对象
 */
abstract class Serialization {
  [index: string]: any;

  protected fillFromJSON(json: string) {
    try {
      const jsonObj = JSON.parse(json);
      for (const propName of Object.keys(jsonObj)) {
        this[propName] = jsonObj[propName];
      }
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * @class 监听websocket，数据解包
 */
export class Package extends Serialization implements Ipackage {
  [index: number]: Ipackage;
  public type: string = ''; // 不可为空
  public time: string = '00-00'; // 不可为空，服务器时间，mm-ss
  public hostname: string = ''; // linux主机名
  public cpu: number = 0; // cpu占用百分比
  public mem: number = 0; // 内存占用百分比
  public processes: Iprocess[] = []; // 程序列表
  public hostid: string = ''; // 默认不重复

  constructor(json: any) {
    super();
    this.fillFromJSON(json);
  }
}

/**
 * @class 储存在映射表中的数据
 */
export class StorePackage extends Serialization implements Ilinux {
  [index: number]: Ilinux;

  public time: string = '00-00'; // 不可为空，服务器时间，mm-ss
  public cpu: number = 0; // cpu占用百分比
  public mem: number = 0; // 内存占用百分比
  public processes: Iprocess[] = []; // 程序列表

  constructor(json: any | {}) {
    super();
    // 如果是空数据，为创建数据
    if (Object.keys(json).length === 0) {
      return;
    }
    this.fillFromJSON(json);
  }
}

/**
 * @class 结构传送包中的进程
 */
export class StoreProcess extends Serialization implements Iprocess {
  [index: number]: Iprocess;

  public id: string = ''; // 程序pid
  public name: string = ''; // 程序名
  public mem: number = 0; // 程序占用内存
  public cpu: number = 0; // 程序消耗cpu量
  public auth: boolean = false; // 是否有权限杀进程

  constructor(json: any | {}) {
    super();
    // 如果是空数据，为创建数据
    if (Object.keys(json).length === 0) {
      return;
    }
    this.fillFromJSON(json);
  }
}
