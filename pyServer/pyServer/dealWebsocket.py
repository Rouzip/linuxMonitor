from django.http import HttpResponse
from dwebsocket import *
import multiprocessing


vue_request = []


@accept_websocket
def echo(request):
    global vue_request
    while True:
        message = request.websocket.wait()
        print(message)
        vue_request.append(request.websocket)
        send(message, [request.websocket])


def send(message_package, socket_client=vue_request):
    for client in socket_client:
        client.send(message_package)
