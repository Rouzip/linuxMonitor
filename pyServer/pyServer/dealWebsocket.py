from dwebsocket import *
import simplejson


vue_request = []


@accept_websocket
def echo(request):
    global vue_request
    vue_request.append(request.websocket)
    print("get a websocket connect")
    while True:
        message = request.websocket.wait()
        print(message)
        deal_kill_order(message)


def send(message_package):
    global vue_request
    for client in vue_request:
        client.send(message_package.encode(encoding="utf8"))


def deal_kill_order(message):
    data = simplejson.loads(message)
    try:
        with open("D:\git\linuxMonitor\pyServer\pyServer\order.txt", 'a+') as file_handler:
            file_handler.write(data['uuid']+"\n"+data['pid'])
    except exec:
        print("file write failed")
