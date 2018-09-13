from dwebsocket import *
import simplejson


vue_request = []

create_bodys = {}


@accept_websocket
def echo(request):
    global vue_request
    send_create_bodys(request.websocket)
    vue_request.append(request.websocket)
    print("--###-- get a websocket connect")
    while True:
        try:
            message = request.websocket.wait()
            print(message)
            deal_kill_order(message)
        except Exception as e:
            continue


def send(message_package):
    global vue_request
    for client in vue_request:
        client.send(message_package.encode(encoding="utf8"))


def deal_kill_order(message):
    if None == message:
        return
    data = simplejson.loads(message.decode(encoding='utf8'))
    try:
        with open("D:\git\linuxMonitor\pyServer\pyServer\order.txt", 'a+') as file_handler:
            file_handler.write(data['hostid']+"\n"+data['id'])
    except exec:
        print("file write failed")


def deal_connect(key, connect_body):
    create_bodys[key] = connect_body


def deal_disconnect(key):
    create_bodys.pop(key)


def send_create_bodys(client):
    for key in create_bodys:
        client.send(bytes(create_bodys[key], encoding="utf8"))
