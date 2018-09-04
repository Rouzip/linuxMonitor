from django.http import HttpResponse
from dwebsocket import *
import multiprocessing


vue_request = HttpResponse


@accept_websocket
def echo(request):
    global vue_request
    while True:
        message = request.websocket.wait()
        print(message)
        vue_request = request.websocket
        send(message)


def send(message_package):
    global vue_request
    vue_request.send(message_package)