"""pyServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import dealHttp
from django.conf.urls import url
from . import dealWebsocket

from . import settings


urlpatterns = [
    # http请求
    url(r'^hello$', dealHttp.hello),
    url(r'^data$', dealHttp.receive),
    url(r'^post$', dealHttp.post),
    url(r'^index$', dealHttp.index),
    url(r'^$', dealHttp.index),
    url(r'^disconnect$', dealHttp.disconnect),
    url(r'^connect$', dealHttp.connect),
    # 静态资源配置
    # url( r'^static/(?P<path>.*)$', 'django.views.static.serve',{ 'document_root': settings.STATIC_URL }),

    url(r'^$', dealHttp.receive),
    # websocket请求
    url(r'websocket', dealWebsocket.echo)
]

