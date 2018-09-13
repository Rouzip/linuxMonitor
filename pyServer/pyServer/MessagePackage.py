import simplejson
import random
import uuid
import time




class MessagePackage:
    mtype = ""
    host_name = ""
    host_id = ""
    memery = ""
    cpu = ""
    process = ""
    timestamp = ""

    def __init__(self, mtype, host_name=None, memery=None, cpu=None, process=None):
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
                      'cpu': self.cpu, 'mem': self.memery, 'processes': self.process}
        return simplejson.dumps(dictionary)

    def generate_hostuuid(self):
        if self.host_name == None:
            return
        self.host_id = str(uuid.uuid3(uuid.NAMESPACE_DNS, self.host_name))


    def generate_timestamp(self):
        localtime = time.localtime()
        self.timestamp = '%02d' % localtime[4] + '-%02d' % localtime[5]

    def get_uuid(self):
        return self.host_id


    def set_uuid(self, uuid):
        self.host_id = uuid

    @classmethod
    def generate_uuid(cls, host_name):
        return str(uuid.uuid3(uuid.NAMESPACE_DNS, host_name))

