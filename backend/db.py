from pymongo.mongo_client import MongoClient
import certifi

def setup_db():    
    # Create a new client and connect to the server
    # client = MongoClient(uri)
    ca = certifi.where()
    uri = "mongodb+srv://" + "osgroup" + ":" + "ossucks" + "@cluster0.mchrbbw.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, tlsCAFile=ca)
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    
    db = client["crAIgslist"]
    return db
    

if __name__ == '__main__':
   setup_db()