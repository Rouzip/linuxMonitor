import simpleJson


class MessagPackage:
    mtype = ""
    host_name = ""
    memery = ""
    cpu = ""
    process = ""

    def __init__(self, mtype, host_name, memery, cpu, process):
        self.mtype = mtype
        self.host_name = host_name
        self.memery = memery
        self.cpu = cpu
        self.process = process

    def to_json(self):
        dictionary = {'type': self.mtype, 'host_name': self.host_name, 'cpu': self.cpu, 'memery': self.memery, 'process': self.process}
        return simpleJson.load(dictionary)
