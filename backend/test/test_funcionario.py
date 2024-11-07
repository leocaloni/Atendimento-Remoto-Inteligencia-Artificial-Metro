import requests

BASE_URL = "http://localhost:5000"

# Teste de cadastro de funcionário
def test_cadastrar_funcionario():
    payload = {
        "nome": "junin",    
        "funcional": "1234",
        "senha": "senhaSegura123"
    }
    response = requests.post(f"{BASE_URL}/register_func", json=payload)
    print("POST /register_func:", response.status_code, response.json())

# Teste de autenticação de funcionário (login)
def test_autenticar_funcionario():
    payload = {
        "funcional": "1234",
        "senha": "senhaSegura123"
    }
    response = requests.post(f"{BASE_URL}/login_func", json=payload)
    print("POST /login_func:", response.status_code, response.json())

# Teste de busca de funcionário
def test_buscar_funcionario():
    funcional = "1234"
    response = requests.get(f"{BASE_URL}/get_func/{funcional}")
    print("GET /get_func:", response.status_code, response.json())

# Teste de atualização de funcionário
def test_atualizar_funcionario():
    funcional = "1234"
    novos_dados = {
        "senha": "novaSenhaSegura456"
    }
    response = requests.put(f"{BASE_URL}/update_func/{funcional}", json=novos_dados)
    print("PUT /update_func:", response.status_code, response.json())
    
    # Verificar o estado do funcionário após a atualização
    response = requests.get(f"{BASE_URL}/get_func/{funcional}")
    if response.status_code == 200:
        print("Dados do funcionário após atualização:", response.json())
    else:
        print("Erro ao recuperar dados atualizados:", response.status_code)

# Teste de deleção de funcionário
def test_deletar_funcionario():
    funcional = 1234
    response = requests.delete(f"{BASE_URL}/delete_func/{funcional}")
    print("DELETE /delete_func:", response.status_code, response.json())

    # Confirmar se o funcionário foi realmente deletado
    response = requests.get(f"{BASE_URL}/get_func/{funcional}")
    if response.status_code == 404:
        print("Confirmação de deleção: Funcionário não encontrado.")
    else:
        print("Erro: Funcionário ainda existe após a deleção.")

# Executando os testes
# if __name__ == "__main__":

    # test_cadastrar_funcionario() | funcionando
    # test_autenticar_funcionario() | funcionando
    # test_buscar_funcionario() | funcionando
    # test_atualizar_funcionario() | funcionando
    # test_deletar_funcionario() | funcionando
