from django.http import HttpRequest
from django.http import HttpResponse
from dwebsocket.decorators import accept_websocket
from . import MessagePackage
from dwebsocket import *


vue_request = HttpResponse


@accept_websocket
def echo(request):
    global vue_request
    while True:
        message = request.websocket.wait()
        print(message)
        vue_request = request.websocket
        request.websocket.send(message)


def send(message_package):
    global vue_request
    vue_request.send(message_package)
