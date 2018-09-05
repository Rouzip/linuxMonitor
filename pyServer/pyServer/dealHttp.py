from django.http import HttpResponse
import simplejson
from . import MessagePackage
from . import dealWebsocket
import multiprocessing
from django.shortcuts import render
from django.views.decorators import csrf
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from django.template import RequestContext
from django.shortcuts import render_to_response


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


def post(request):
    print(request.body)
    return HttpResponse("200")
