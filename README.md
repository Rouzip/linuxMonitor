# 项目设计书

### linux

#### 技术栈

1. c/cpp获取cpu等数据进行整合处理
2. c/cpp发送http请求给python服务器，发送时间间隔定为15s

### windows

#### 技术栈

1. django服务器开发
2. 多进程或者异步接受数据，聚合进行展示

### 前端

#### 技术栈

1. vue，typescript，websocket
2. 接受消息

### 人员任务分配

linux：毕涛

windows：王浩东、樊培源

测试：张威威

前端，组长：宋博文

### protocal

```javascript
# 前后端交互协议
# 为每个linux主机启动不同的定时器，即异步处理
# 默认百分数没有百分号
# 一开是服务器发送的create包中只有hostid和hostname
{
    type: 'create/warn/message',  # 不可为空，必填
    time: 'mm-ss',  # 不可为空，必填，服务器接受时间
    hostid: 'uuid',  # 默认不重复
    hostname:'',  # 主机名字
    cpu: '',  # cpu使用量，百分数(数字)
    mem: '',  # 内存占用(数字)
    processes: process[]  # 程序列表
}

# 进程格式
{
    id: 'pid',  # 字符串
    name: '',  # 程序的指令名字
    mem: '',  # 内存占用量，百分比
    cpu: '',  # cpu占用量，百分比
    auth: boolean  # 是否有权限
}

# 杀死某个linux上的特定进程
{
    id: 'pid',
    'hostid': 'uuid'
}
```

