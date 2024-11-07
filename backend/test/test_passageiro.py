import requests

BASE_URL = "http://localhost:5000"

# Teste de cadastro de passageiro
def test_cadastrar_passageiro():
    payload = {
        "nome": "João Silva",
        "cpf": "12345678900",
        "gratuidade": "idoso",
        "data_nascimento": "01-01-1970",
        "foto_base64": "base64string"
    }
    response = requests.post(f"{BASE_URL}/register_passenger", json=payload)
    print("POST /register_passenger:", response.status_code, response.json())

# Teste de busca de passageiro
def test_buscar_passageiro():
    cpf = "12345678900"
    response = requests.get(f"{BASE_URL}/get_passenger/{cpf}")
    print("GET /get_passenger:", response.status_code, response.json())

# Teste de atualização de passageiro
def test_atualizar_passageiro():
    cpf = "12345678900"
    novos_dados = {
        "nome": "João da Silva",
        "gratuidade": "estudante"
    }
    response = requests.put(f"{BASE_URL}/update_passenger/{cpf}", json=novos_dados)
    print("PUT /update_passenger:", response.status_code, response.json())
    
    # Verificar o estado do passageiro após a atualização
    response = requests.get(f"{BASE_URL}/get_passenger/{cpf}")
    if response.status_code == 200:
        print("Dados do passageiro após atualização:", response.json())
    else:
        print("Erro ao recuperar dados atualizados:", response.status_code)


# Teste de deleção de passageiro
def test_deletar_passageiro():
    cpf = "12345678900"
    response = requests.delete(f"{BASE_URL}/delete_passenger/{cpf}")
    print("DELETE /delete_passenger:", response.status_code, response.json())

# Executando os testes
# if __name__ == "__main__":
    # test_cadastrar_passageiro() | funcionando
    # test_buscar_passageiro() | funcionando
    # test_atualizar_passageiro() | funcionando
    # test_deletar_passageiro() | funcionando
