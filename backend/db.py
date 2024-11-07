from pymongo import MongoClient

#Conexão com o MongoDB

def get_db():
    connection_string = "mongodb://localhost:27017"
    client = MongoClient(connection_string)
    return client["testeBanco"]


def get_funcionario_collection():
    db = get_db()
    return db.get_collection("funcionarioTesteCollection")

def get_passageiro_collection():
    db = get_db()
    return db.get_collection("testeCollection")

# db.py
def get_passenger_photos():
    try:
        collection = get_passageiro_collection()
        passageiros = collection.find({}, {"nome": 1, "foto_base64": 1})
        return [{"nome": passageiro["nome"], "foto_base64": passageiro["foto_base64"]} for passageiro in passageiros if "foto_base64" in passageiro]
    except Exception as e:
        print(f"Erro ao buscar fotos do banco: {e}")
        return []

