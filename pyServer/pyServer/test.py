import pyServer.MessagePackage as MessagePackage
import simplejson
import requests


data = '{"processInfo": [{"psName":"top","PID":"3858","CPU":"6.2","mem":"0.1"},],"cpuUser":"12.4",,"memInfo":"2250784", "host_name":"wang"}'
data = eval(data)
mp = MessagePackage.MessagePackage('create', data['host_name'])
response = requests.post('http://127.0.0.1:8000/post', data=mp)
mp = MessagePackage.MessagePackage('update', data['host_name'],
                                   data['memInfo'], data['cpuUser'],
                                   eval(str(data['processInfo']))
                                   )
response = requests.post('http://127.0.0.1:8000/post', data=mp)
