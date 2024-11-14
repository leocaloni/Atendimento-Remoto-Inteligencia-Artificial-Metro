from bcrypt import hashpw, gensalt, checkpw
from db import get_funcionario_collection
from bson import ObjectId

class Funcionario:
    
    def __init__(self, nome, funcional, senha, is_admin=False):
        self.nome = nome
        self.funcional = funcional
        self.senha = senha
        self.is_admin = is_admin

    def cadastrarFuncionario(self):
        try:
            funcionario_collection = get_funcionario_collection()
            if funcionario_collection.find_one({"funcional": self.funcional}):
                print("Funcional já cadastrada.")
                return None
            
            # Cria o hash da senha antes de armazenar no banco de dados
            hashed_senha = hashpw(self.senha.encode('utf-8'), gensalt())
            funcionario_id = funcionario_collection.insert_one({
                "nome": self.nome,
                "funcional": self.funcional,
                "senha": hashed_senha,
                "isAdmin": self.is_admin
            }).inserted_id

            print(f"Funcionário cadastrado com sucesso. ID: {funcionario_id}")
            return str(funcionario_id)
        except Exception as e:
            print(f"Erro ao cadastrar funcionário: {e}")
            return None
            
    @staticmethod
    def buscarFuncionario(funcional):
        try:
            funcionario_collection = get_funcionario_collection()
            funcionario = funcionario_collection.find_one({"funcional": funcional})

            if funcionario:
                funcionario.pop('senha', None)  # Remove a senha antes de retornar
                funcionario['_id'] = str(funcionario['_id'])  # Converte o ObjectId para string
                return funcionario
            else:
                print("Funcionário não encontrado.")
                return None
        except Exception as e:
            print(f"Erro ao buscar funcionário: {e}")
            return None

    @staticmethod
    def atualizarFuncionario(funcional, novos_dados):
        try:
            funcionario_collection = get_funcionario_collection()
            if 'senha' in novos_dados:
                novos_dados['senha'] = hashpw(novos_dados['senha'].encode('utf-8'), gensalt())
            resultado = funcionario_collection.update_one(
                {"funcional": funcional},
                {"$set": novos_dados}
            )
            if resultado.modified_count > 0:
                print("Os dados foram atualizados")
                return True
            else:
                print("Nenhuma modificação feita nos dados")
                return False
        except Exception as e:
            print(f"Erro ao atualizar funcionário: {e}")
            return False

    @staticmethod
    def deletarFuncionario(funcional):
        try:
            funcionario_collection = get_funcionario_collection()
            resultado = funcionario_collection.delete_one({"funcional": funcional})
            print("Funcionario deletado")
            return resultado.deleted_count > 0
        except Exception as e:
            print(f"Erro ao deletar funcionário: {e}")
            return False
        
    @staticmethod
    def logarFuncionario(funcional, senha):
            try:
                funcionario_collection = get_funcionario_collection()
                funcionario = funcionario_collection.find_one({"funcional": funcional})

                if not funcionario:
                    print(f"Erro: Funcionário {funcional} não encontrado.")
                    return {"msg": "Erro ao autenticar funcionário. Funcional não encontrado."}, 401

                if checkpw(senha.encode('utf-8'), funcionario['senha']):
                    is_admin = funcionario.get('isAdmin', False)  
                    print(f"Funcionário {funcional} autenticado com sucesso.")
                    return {
                        "msg": "Funcionário autenticado com sucesso",
                        "isAdmin": is_admin 
                    }, 200
                else:
                    print(f"Erro: Senha incorreta para o funcionário {funcional}.")
                    return {"msg": "Erro ao autenticar funcionário. Senha incorreta."}, 401

            except Exception as e:
                print(f"Erro ao logar funcionário: {e}")
                return {"msg": "Erro ao autenticar funcionário. Tente novamente mais tarde."}, 500