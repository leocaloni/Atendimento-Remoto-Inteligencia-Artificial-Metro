from pymongo import MongoClient
from flask import Flask, request, jsonify
from bcrypt import hashpw, gensalt, checkpw
from bson.json_util import dumps

app = Flask(__name__)

# Conexão com o MongoDB
connection_string = "mongodb://localhost:27017"
client = MongoClient(connection_string)
db_connection = client["testeBanco"]
funcionario_collection = db_connection.get_collection("funcionarioTesteCollection")

class Funcionario:
    
    def __init__(self, usuario, email, senha):
        self.usuario = usuario
        self.email = email
        self.senha = senha

    def cadastrarFuncionario(self):
        try:
            hashed_senha = hashpw(self.senha.encode('utf-8'), gensalt())
            funcionario_id = funcionario_collection.insert_one({
                "usuario": self.usuario,
                "email": self.email,
                "senha": hashed_senha
            }).inserted_id

            print(f"Funcionário cadastrado com sucesso! ID: {funcionario_id}")
            return str(funcionario_id)
        
        except Exception as e:
            print(f"Erro ao cadastrar funcionário: {e}")
            return None

    @staticmethod
    def buscarFuncionario(usuario):
        try:
            funcionario = funcionario_collection.find_one({"usuario": usuario})
            return funcionario if funcionario else None
        except Exception as e:
            print(f"Erro ao buscar funcionário: {e}")
            return None
        
    @staticmethod
    def atualizarFuncioanrio(usuario, novos_dados):
        try:
            resultado = funcionario_collection.update_one(
                {"usuario": usuario},
                {"$set": novos_dados}
            )
            print(f"Os dados foram atualizados")
            return resultado.modified_count > 0
        except Exception as e:
            print(f"Erro ao atualizar funcionário: {e}")
            return False
        
    @staticmethod
    def deletarFuncionario(usuario):
        try:
            resultado = funcionario_collection.delete_one({"usuario": usuario})
            print("Funcionario deletado")
            return resultado.deleted_count > 0
        except Exception as e:
            print(f"Erro ao deletar funcionário: {e}")
            return False
        
    @staticmethod
    def logarFuncionario(usuario, senha):
        try:
            funcionario = funcionario_collection.find_one({"usuario": usuario})
            if funcionario and checkpw(senha.encode('utf-8'), funcionario['senha']):
                return True
            return False
        except Exception as e:
            print(f"Erro ao logar funcionário: {e}")
            return False
        

#Endpoints do flask para conexão com o front

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    usuario = data.get('usuario')
    email = data.get('email')
    senha = data.get('senha')

    novo_funcionario = Funcionario(usuario, email, senha)
    result = novo_funcionario.cadastrarFuncionario()
    if result:
        return jsonify({"msg": "Funcionário registrado com sucesso", "id": result}), 201
    else:
        return jsonify({"msg": "Erro ao registrar funcionário"}), 400
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = data.get('usuario')
    senha = data.get('senha')

    autenticado = Funcionario.logarFuncionario(usuario, senha)
    if autenticado:
        return jsonify({"msg": "Funcionário autenticado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao autenticar funcionário"}), 401
    
@app.route('/get_user/<string:usuario>', methods=['GET'])
def get_user(usuario):
    funcionario = Funcionario.buscarFuncionario(usuario)
    if funcionario:
        return jsonify(dumps(funcionario)), 200
    else:
        return jsonify({"msg": "Funcionário não encontrado"}), 404
    
@app.route('/update_user/<string:usuario>', methods=['PUT'])
def update_user(usuario):
    novos_dados = request.get_json()
    atualizado = Funcionario.atualizarFuncionario(usuario, novos_dados)
    if atualizado:
        return jsonify({"msg": "Dados atualizados com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao atualizar dados"}), 400

@app.route('/delete_user/<string:usuario>', methods=['DELETE'])
def delete_user(usuario):
    deletado = Funcionario.deletarFuncionario(usuario)
    if(deletado):
        return jsonify({"msg": "Funcionário deletado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao deletar funcionário"}), 400
    