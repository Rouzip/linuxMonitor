import { Ipackage } from './declare';

export const parseMessage = (data: any) => {
  // TODO: 解析json数据，将数据按照不同的type进行分发
  try {
    const jsonData = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
