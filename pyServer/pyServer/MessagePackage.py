import simpleJson


class MessagPackage:
    mtype = ""
    host_name = ""
    data = ""

    def __init__(self, mtype, host_name, host_situation):
        self.mtype = mtype
        self.host_name = host_name
        self.host_situation = host_situation

    def to_json(self):
        dictionary = {'type': self.mtype, 'host_name': self.host_name, 'host_situation': self.host_situation }
        return simpleJson.load(dictionary)
