from dwebsocket import *
import simplejson


vue_request = []


@accept_websocket
def echo(request):
    global vue_request
    while True:
        message = request.websocket.wait()
        print(message)
        deal_kill_order(message)
        vue_request.append(request.websocket)
        send(message, [request.websocket])


def send(message_package, socket_client=vue_request):
    for client in socket_client:
        client.send(message_package)


def deal_kill_order(message):
    data = simplejson.loads(message)
    try:
        with open("D:\git\linuxMonitor\pyServer\pyServer\order.txt", 'a+') as file_handler:
            file_handler.write(data['uuid']+"\n"+data['pid'])
    except exec:
        print("file write failed")
