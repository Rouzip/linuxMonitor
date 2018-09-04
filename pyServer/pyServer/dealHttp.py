from django.http import HttpResponse
import simplejson
from . import MessagePackage
from . import dealWebsocket
import multiprocessing

pool = multiprocessing.Pool(processes=5)


def hello(request):
    return HttpResponse("")


def receive(request):
    pool.apply_async(deal_message, args=request)
    return HttpResponse()


def deal_message(request):
    print(request)
    data = simplejson.load(request.raw_post_data)
    print(data)
    mp = MessagePackage(data.mtype, data.host_name, data.memery, data.cpu, data.process)
    dealWebsocket.send(mp)
