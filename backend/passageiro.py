from .db import get_passageiro_collection
from bson import ObjectId

class Passageiro:
    
    def __init__(self, nome, cpf, gratuidade, data_nascimento, foto_base64):
        self.nome = nome
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.gratuidate = gratuidade
        self.foto_base64 = foto_base64

    def cadastrarPassageiro(self):
        try:
            passageiro_collection = get_passageiro_collection()
            if passageiro_collection.find_one({"cpf": self.cpf}):
                print("CPF já cadastrado.")
                return None
            
            passageiro_id = passageiro_collection.insert_one({
                "nome": self.nome,
                "cpf": self.cpf,
                "gratuidade": self.gratuidate,
                "data_nascimento": self.data_nascimento,
                "foto_base64": self.foto_base64
            }).inserted_id

            print(f"Passageiro cadastrado com sucesso. ID: {passageiro_id}")
            return str(passageiro_id)

        except Exception as e:
            print(f"Erro ao cadastrar passageiro: {e}")
            return None


    @staticmethod
    def buscarPassageiro(cpf):
        try:
            passageiro_collection = get_passageiro_collection()
            passageiro = passageiro_collection.find_one({"cpf": cpf})
            if passageiro:
                passageiro["_id"] = str(passageiro["_id"])
            return passageiro if passageiro else None
        except Exception as e:
            print(f"Erro ao buscar passageiro: {e}")
            return None
        
    @staticmethod
    def atualizarPassageiro(cpf, novos_dados):
        try:
            passageiro_collection = get_passageiro_collection()
            resultado = passageiro_collection.update_one(
                {"cpf": cpf},
                {"$set": novos_dados}
            )
            if resultado.modified_count > 0:
                print("Passageiro atualizado com sucesso.")
                return True
            else:
                print("Nenhum dado foi modificado.")
                return False
        except Exception as e:
            print(f"Erro ao atualizar passageiro: {e}")
            return False

    @staticmethod
    def deletarPassageiro(cpf):
        try:
            passageiro_collection = get_passageiro_collection()
            resultado = passageiro_collection.delete_one({"cpf": cpf})
            if resultado.deleted_count > 0:
                print("Passageiro deletado com sucesso.")
                return True
            else:
                print("Nenhum passageiro foi encontrado para deletar.")
                return False
        except Exception as e:
            print(f"Erro ao deletar passageiro: {e}")
            return False

    @staticmethod
    def obterFotoBase64(cpf):
        try:
            passageiro_collection = get_passageiro_collection()
            passageiro = passageiro_collection.find_one({"cpf": cpf})
            if passageiro and 'foto_base64' in passageiro:
                return passageiro['foto_base64']
            return None
        except Exception as e:
            print(f"Erro ao obter foto: {e}")
            return None
        
        