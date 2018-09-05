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
    data = simplejson.dumps(message)
    try:
        file_handler = open("./order.txt", 'w')
        file_handler.write(data.uuid+"\n"+data.pid)
        file_handler.close()
    except exec:
        print("file write failed")
