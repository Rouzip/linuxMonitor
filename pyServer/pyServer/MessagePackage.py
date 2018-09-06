import simplejson
import random
import uuid
import time


# node = uuid.getnode()


class MessagePackage:
    mtype = ""
    host_name = ""
    host_id = ""
    memery = ""
    cpu = ""
    process = ""
    timestamp = ""

    def __init__(self, mtype, host_name, memery=None, cpu=None, process=None):
        self.mtype = mtype
        self.host_name = host_name
        self.memery = memery
        self.cpu = cpu
        self.process = process
        self.generate_hostuuid()
        self.generate_timestamp()

    def to_json(self):
        dictionary = {'type': self.mtype, 'time': self.timestamp,
                      'hostid': self.host_id, 'hostname': self.host_name,
                      'cpu': self.cpu, 'mem': self.memery, 'process': self.process}
        return dictionary

    def generate_hostuuid(self):
        self.host_id = str(uuid.uuid1(uuid.getnode()+(int)(random.random()*100000)))

    def generate_timestamp(self):
        localtime = time.localtime()
        self.timestamp = '%02d' % localtime[4] + '-%02d' % localtime[5]

    def get_uuid(self):
        return self.host_id

    @classmethod
    def generate_uuid(cls):
        return str(uuid.uuid1(uuid.getnode()+(int)(random.random()*100000)))