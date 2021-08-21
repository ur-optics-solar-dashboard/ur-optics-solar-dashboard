import pymongo

class DB(object):

    URI = "mongodb://localhost:27017/solar_dashboard_database"

    @staticmethod
    def init():
        client = pymongo.MongoClient(DB.URI)
        DB.DATABASE = client['solar_dashboard_database']

    @staticmethod
    def insert(collection, data):
        DB.DATABASE[collection].insert(data)

    @staticmethod
    def insert_many(collection, data):
        DB.DATABASE[collection].insert_many(data)

    @staticmethod
    def find_one(collection, query):
        return DB.DATABASE[collection].find_one(query)