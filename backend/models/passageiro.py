import base64
from pymongo import MongoClient
from flask import Flask, request, jsonify
from bson.json_util import dumps

app = Flask(__name__)

# Conexão com o MongoDB
connection_string = "mongodb://localhost:27017"
client = MongoClient(connection_string)
db_connection = client["testeBanco"]
passageiro_collection = db_connection.get_collection("testeCollection")

class Passageiro:
    
    def __init__(self, nome, cpf, gratuidade, data_nascimento, foto_base64):
        self.nome = nome
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.gratuidate = gratuidade
        self.foto_base64 = foto_base64

    def cadastrarPassageiro(self):
        try:
            # Inserir dados do passageiro no MongoDB
            passageiro_id = passageiro_collection.insert_one({
                "nome": self.nome,
                "cpf": self.cpf,
                "gratuidade": self.gratuidate,
                "data_nascimento": self.data_nascimento,
                "foto_base64": self.foto_base64
            }).inserted_id

            print(f"Passageiro cadastrado com sucesso! ID: {passageiro_id}")
            return str(passageiro_id)

        except Exception as e:
            print(f"Erro ao cadastrar passageiro: {e}")
            return None

    @staticmethod
    def buscarPassageiro(cpf):
        try:
            passageiro = passageiro_collection.find_one({"cpf": cpf})
            return passageiro if passageiro else None
        except Exception as e:
            print(f"Erro ao buscar passageiro: {e}")
            return None

    @staticmethod
    def obterFotoBase64(cpf):
        try:
            passageiro = passageiro_collection.find_one({"cpf": cpf})
            if passageiro and 'foto_base64' in passageiro:
                return passageiro['foto_base64']
            return None
        except Exception as e:
            print(f"Erro ao obter foto: {e}")
            return None

# Endpoints para a API
@app.route('/register_passenger', methods=['POST'])
def register_passenger():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    gratuidade = data.get('gratuidade')
    data_nascimento = data.get('data_nascimento')
    foto_base64 = data.get('foto_base64')  # Recebe a imagem diretamente em base64

    # Verifica se todos os campos obrigatórios estão presentes
    if not all([nome, cpf, data_nascimento, foto_base64]):
        return jsonify({"msg": "Todos os campos devem ser preenchidos"}), 400

    novo_passageiro = Passageiro(nome, cpf, gratuidade, data_nascimento, foto_base64)
    result = novo_passageiro.cadastrarPassageiro()
    if result:
        return jsonify({"msg": "Passageiro cadastrado com sucesso", "id": result}), 201
    else:
        return jsonify({"msg": "Erro ao cadastrar passageiro"}), 400

@app.route('/get_passenger/<string:cpf>', methods=['POST'])
def get_passenger(cpf):
    passageiro = Passageiro.buscarPassageiro(cpf)
    if passageiro:
        return jsonify(dumps(passageiro)), 200
    else:
        return jsonify({"msg": "Passageiro não encontrado"}), 404

@app.route('/get_passenger_photo/<string:cpf>', methods=['POST'])
def get_passenger_photo(cpf):
    foto_base64 = Passageiro.obterFotoBase64(cpf)
    if foto_base64:
        return jsonify({"foto_base64": foto_base64}), 200
    else:
        return jsonify({"msg": "Foto não encontrada para o passageiro"}), 404