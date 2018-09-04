from django.http import HttpResponse
import simplejson
from . import MessagePackage
from . import dealWebsocket


def hello(request):
    return HttpResponse()


def receive(request):
    print(request)
    data = simplejson.load(request.raw_post_data)
    print(data)
    mp = MessagePackage(data.mtype, data.host_name,data.memery,  data.cpu, data.process)
    dealWebsocket.send(mp)
    return HttpResponse()
