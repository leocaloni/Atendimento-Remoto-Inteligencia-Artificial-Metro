from pymongo import MongoClient

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
            funcionario_id = funcionario_collection.insert_one({
                "usuario": self.usuario,
                "email": self.email,
                "senha": self.senha
            }).inserted_id

            print(f"Funcionário cadastrado com sucesso! ID: {funcionario_id}")
            return str(funcionario_id)
        
        except Exception as e:
            print(f"Erro ao cadastrar funcionário: {e}")
            return None

    @staticmethod
    def buscarFuncionario(usuario, novos_dados):
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
        
if __name__ == "__main__":
    func = Funcionario("funcionario1", "funcionario1@gmail.com", "funcionario1senha")
    func.deletarFuncionario("funcionario1")
