import socket
import simplejson
import multiprocessing
import os
import pyServer.MessagePackage as MessagePackage
import time
from socketserver import BaseRequestHandler, ThreadingTCPServer
import threading


clients = {}


def deal_receive():
    while True:
        client, addr = s.accept()
        print('连接地址：', addr)

        clients[MessagePackage.MessagePackage.generate_uuid()] = client
        buff = client.recv(2048)
        print("接收到"+str(buff))
        client.send(b"wang wang wang")
        client.sendall(b"wang wang wang")
        # data = simplejson.load(str(buff))
        # print("json化"+data)
        # response = requests.post('http://1k27.0.0.1:8000/post', data=buff)
        # print("响应200 = " + response)


def deal_order():
    while True:
        try:
            with open("order.txt", 'r+') as file_handler:
                with open("./temp_order.txt", "a+") as tempfile_handler:
                    lines = file_handler.readlines()
                    uuid = file_handler.readline()
                    pid = file_handler.readline()
                    del lines[0:2]
                    for line in lines:
                        tempfile_handler.writelines(line)
            os.remove('order.txt')
            os.rename("temp_order.txt", 'order.txt')
        except Exception as e:
            time.sleep(1000)


if __name__ == '__main__':
    s = socket.socket()
    host = socket.gethostname()
    port = 8124
    s.bind(("192.168.43.30", port))
    s.listen(5)
    print("start server")
    threading.Thread(target=deal_receive).start()
    threading.Thread(target=deal_order).start()
    # while True:
    #     client, addr = s.accept()
    #     print('连接地址：', addr)
    #     client.send(bytes("wang wang wang", encoding="utf-8"))
    #     clients[MessagePackage.MessagePackage.generate_uuid()] = client
    #     client.sendall(b"wang wang wang")
        # buff = client.recv(2048)
        # print("接收到"+str(buff))
        # data = simplejson.load(buff)
        # print("json化"+data)
        # response = requests.post('http://1k27.0.0.1:8000/post', data=data)
        # print("响应200 = "+response)


