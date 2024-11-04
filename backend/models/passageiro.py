from pymongo import MongoClient
import gridfs
import io
import face_recognition as fr
from PIL import Image
from flask import Flask, request, jsonify, send_file
from bson.json_util import dumps

app = Flask(__name__)

# Conexão com o MongoDB
connection_string = "mongodb://localhost:27017"
client = MongoClient(connection_string)
db_connection = client["testeBanco"]
passageiro_collection = db_connection.get_collection("testeCollection")
fs = gridfs.GridFS(db_connection)

class Passageiro:
    
    def __init__(self, nome, cpf, gratuidade, data_nascimento):
        self.nome = nome
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.gratuidate = gratuidade
        self.foto_id = None

    def cadastrarPassageiro(self, caminho_foto):
        try:
            with open(caminho_foto, 'rb') as arquivo_foto:
                self.foto_id = fs.put(arquivo_foto, filename=caminho_foto.split('/')[-1])

            passageiro_id = passageiro_collection.insert_one({
                "nome": self.nome,
                "cpf": self.cpf,
                "gratuidade": self.gratuidate,
                "data_nascimento": self.data_nascimento,
                "foto_id": self.foto_id
            }).inserted_id

            print(f"Passageiro cadastrado com sucesso! ID: {passageiro_id}")
            return str(passageiro_id)

        except FileNotFoundError:
            print(f"Arquivo de foto não encontrado: {caminho_foto}")
            return None
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
    def atualizarPassageiro(cpf, novos_dados):
        try:
            resultado = passageiro_collection.update_one(
                {"cpf": cpf},
                {"$set": novos_dados}
            )
            print(f"Os dados foram atualizados")
            return resultado.modified_count > 0
        except Exception as e:
            print(f"Erro ao atualizar passageiro: {e}")
            return False

    @staticmethod
    def deletarPassageiro(cpf):
        try:
            resultado = passageiro_collection.delete_one({"cpf": cpf})
            print("Passageiro deletado")
            return resultado.deleted_count > 0
        except Exception as e:
            print(f"Erro ao deletar passageiro: {e}")
            return False

    @staticmethod
    def obterFoto(cpf):
        try:
            passageiro = passageiro_collection.find_one({"cpf": cpf})
            if passageiro and 'foto_id' in passageiro:
                foto_id = passageiro['foto_id']
                foto_binaria = fs.get(foto_id).read()
                return io.BytesIO(foto_binaria)
            return None
        except Exception as e:
            print(f"Erro ao obter foto: {e}")
            return None


# Função para obter codificações faciais (função fora da classe passageiro)
def obter_codificacoes_faces():
    try:
        passageiros = passageiro_collection.find()
        codificacoes = []
        for passageiro in passageiros:
            foto_binaria = fs.get(passageiro['foto_id']).read()
            imagem = fr.load_image_file(io.BytesIO(foto_binaria))
            codificacao = fr.face_encodings(imagem)
            if codificacao:
                codificacoes.append((passageiro, codificacao[0]))
        return codificacoes
    except Exception as e:
        print(f"Erro ao obter codificações de faces: {e}")
        return []

#Endpoints do flask para conexão com o front

@app.route('/register_passenger', methods=['POST'])
def register_passenger():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    gratuidade = data.get('gratuidade')
    data_nascimento = data.get('data_nascimento')
    caminho_foto = data.get('caminho_foto')

    novo_passageiro = Passageiro(nome, cpf, gratuidade, data_nascimento)
    result = novo_passageiro.cadastrarPassageiro(caminho_foto)
    if result:
        return jsonify({"msg": "Passageiro cadastrado com sucesso", "id": result}), 201
    else:
        return jsonify({"msg": "Erro ao cadastrar passageiro"}), 400
    
@app.route('/get_passenger/<string:cpf>', methods=['GET'])
def get_passenger(cpf):
    passageiro = Passageiro.buscarPassageiro(cpf)
    if passageiro:
        return jsonify(dumps(passageiro)), 200
    else:
        return jsonify({"msg": "Passageiro não encontrado"}),404

@app.route('/update_passenger/<string:cpf>', methods=['PUT'])
def update_passenger(cpf):
    novos_dados = request.get_json()
    atualizado = Passageiro.atualizarPassageiro(cpf, novos_dados)
    if atualizado:
        return jsonify({"msg": "Passageiro atualizado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao atualizar passageiro"}), 400
    
@app.route('/delete_passenger/<string:cpf>', methods=['DELETE'])
def delete_passenger(cpf):
    deletado = Passageiro.deletarPassageiro(cpf)
    if deletado:
        return jsonify({"msg": "Passageiro deletado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao deletar passageiro"}), 400
    
@app.route('/get_photo/<string:cpf>', methods=['GET'])
def get_photo(cpf):
    passageiro = Passageiro.buscarPassageiro(cpf)
    if passageiro and 'foto_id' in passageiro:
        foto_id = passageiro['foto_id']
        try:
            foto_binaria = fs.get(foto_id).read()
            return send_file(io.BytesIO(foto_binaria), mimetype='image/jpeg')
        except Exception as e:
            print(f"Erro ao obter foto: {e}")
            return jsonify({"msg": "Erro ao obter foto"}), 500
    else:
        return jsonify({"msg": "Foto não encontrada para o passageiro"}), 404

if __name__ == "__main__":

    pasageiro = Passageiro("teste", "123456789", "teste", "10/10/100")
    pasageiro.cadastrarPassageiro('backend\images\WIN_20241104_14_45_00_Pro.jpg')
