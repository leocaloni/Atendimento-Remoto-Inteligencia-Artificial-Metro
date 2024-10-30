from pymongo import MongoClient
import gridfs
import io
import face_recognition as fr
from PIL import Image

# Conexão com o MongoDB
connection_string = "mongodb://localhost:27017"
client = MongoClient(connection_string)
db_connection = client["testeBanco"]
passageiro_collection = db_connection.get_collection("testeCollection")
fs = gridfs.GridFS(db_connection)

class Passageiro:
    
    def __init__(self, nome, rg, cpf, data_nascimento):
        self.nome = nome
        self.rg = rg
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.foto_id = None

    def cadastrarPassageiro(self, caminho_foto):
        try:
            with open(caminho_foto, 'rb') as arquivo_foto:
                self.foto_id = fs.put(arquivo_foto, filename=caminho_foto.split('/')[-1])

            passageiro_id = passageiro_collection.insert_one({
                "nome": self.nome,
                "rg": self.rg,
                "cpf": self.cpf,
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
            return resultado.modified_count > 0
        except Exception as e:
            print(f"Erro ao atualizar passageiro: {e}")
            return False

    @staticmethod
    def deletarPassageiro(cpf):
        try:
            resultado = passageiro_collection.delete_one({"cpf": cpf})
            return resultado.deleted_count > 0
        except Exception as e:
            print(f"Erro ao deletar passageiro: {e}")
            return False

    def obterFoto(self):
        try:
            if self.foto_id:
                foto_binaria = fs.get(self.foto_id).read()
                imagem = Image.open(io.BytesIO(foto_binaria))
                return imagem
            return None
        except Exception as e:
            print(f"Erro ao obter foto: {e}")
            return None

# Função para obter codificações faciais
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
