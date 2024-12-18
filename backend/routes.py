from flask import Flask, request, jsonify
from flask_cors import CORS
from funcionario import Funcionario
from passageiro import Passageiro
import os
from bcrypt import checkpw  
from db import get_funcionario_collection

app = Flask(__name__)
CORS(app)

# Endpoints da classe funcionário

@app.route('/register_func', methods=['POST'])
def register_func():
    data = request.get_json()
    nome = data.get('nome')
    funcional = data.get('funcional')
    senha = data.get('senha')

    novo_funcionario = Funcionario(nome, funcional, senha)
    result = novo_funcionario.cadastrarFuncionario()
    if result:
        return jsonify({"msg": "Funcionário registrado com sucesso", "id": result}), 201
    else:
        return jsonify({"msg": "Erro ao registrar funcionário"}), 400
    
@app.route('/login_func', methods=['POST'])
def login_func():
    data = request.get_json()

    if not data or 'funcional' not in data or 'senha' not in data:
        return jsonify({"msg": "Dados inválidos."}), 400

    funcional = data['funcional']
    senha = data['senha']
    
    print(f"Valor de funcional recebido: {funcional}")  

    funcionario_collection = get_funcionario_collection()  
    funcionario = funcionario_collection.find_one({"funcional": funcional})

    if not funcionario:
        print(f"Erro: Funcionário {funcional} não encontrado.")  
        return jsonify({"msg": "Erro ao autenticar funcionário. Funcional não encontrado."}), 401

    if checkpw(senha.encode('utf-8'), funcionario['senha']):
        print(f"Funcionário {funcional} autenticado com sucesso.") 
        return jsonify({
            "msg": "Funcionário autenticado com sucesso",
            "isAdmin": funcionario.get("isAdmin", False)  
        }), 200
    else:
        print(f"Erro: Senha incorreta para o funcionário {funcional}.")  
        return jsonify({"msg": "Erro ao autenticar funcionário. Senha incorreta."}), 401

    
@app.route('/get_func/<string:funcional>', methods=['GET'])
def get_func(funcional):
    funcionario = Funcionario.buscarFuncionario(funcional)
    if funcionario:
        return jsonify(funcionario), 200
    else:
        return jsonify({"msg": "Funcionário não encontrado"}), 404
    
@app.route('/update_func/<string:funcional>', methods=['PUT'])
def update_func(funcional):
    novos_dados = request.get_json()
    atualizado = Funcionario.atualizarFuncionario(funcional, novos_dados)
    if atualizado:
        return jsonify({"msg": "Dados atualizados com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao atualizar dados"}), 400

@app.route('/delete_func/<string:funcional>', methods=['DELETE'])
def delete_func(funcional):
    deletado = Funcionario.deletarFuncionario(funcional)
    if deletado:
        return jsonify({"msg": "Funcionário deletado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao deletar funcionário"}), 400

# Endpoints da classe Passageiro

@app.route('/register_passenger', methods=['POST'])
def register_passenger():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    gratuidade = data.get('gratuidade')
    data_nascimento = data.get('data_nascimento')
    foto_base64 = data.get('foto_base64') 

    if not all([nome, cpf, data_nascimento, foto_base64]):
        return jsonify({"msg": "Todos os campos devem ser preenchidos"}), 400

    novo_passageiro = Passageiro(nome, cpf, gratuidade, data_nascimento, foto_base64)
    result = novo_passageiro.cadastrarPassageiro()
    if result:
        return jsonify({"msg": "Passageiro cadastrado com sucesso", "id": result}), 201
    else:
        return jsonify({"msg": "Erro ao cadastrar passageiro"}), 400

@app.route('/get_passenger/<string:cpf>', methods=['GET'])
def get_passenger(cpf):
    passageiro = Passageiro.buscarPassageiro(cpf)
    if passageiro:
        return jsonify(passageiro), 200 
    else:
        return jsonify({"msg": "Passageiro não encontrado"}), 404


@app.route('/get_passenger_photo/<string:cpf>', methods=['GET'])
def get_passenger_photo(cpf):
    foto_base64 = Passageiro.obterFotoBase64(cpf)
    if foto_base64:
        return jsonify({"foto_base64": foto_base64}), 200
    else:
        return jsonify({"msg": "Foto não encontrada para o passageiro"}), 404

@app.route('/update_passenger/<string:cpf>', methods=['PUT'])
def update_passenger(cpf):
    novos_dados = request.get_json()
    atualizado = Passageiro.atualizarPassageiro(cpf, novos_dados)
    if atualizado:
        return jsonify({"msg": "Dados do passageiro atualizados com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao atualizar dados do passageiro ou dados inalterados"}), 400

@app.route('/delete_passenger/<string:cpf>', methods=['DELETE'])
def delete_passenger(cpf):
    deletado = Passageiro.deletarPassageiro(cpf)
    if deletado:
        return jsonify({"msg": "Passageiro deletado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao deletar passageiro ou passageiro não encontrado"}), 404
    
import base64

@app.route('/get_unknown_face', methods=['GET'])
def get_unknown_face():
    try:
        # Caminho para a imagem capturada do rosto desconhecido
        img_path = 'rostoDesconhecido.jpg'
        
        # Converte a imagem para base64
        with open(img_path, "rb") as img_file:
            img_base64 = base64.b64encode(img_file.read()).decode('utf-8')
        
        return jsonify({"foto_base64": img_base64}), 200
    except Exception as e:
        print(f"Erro ao enviar rosto desconhecido: {e}")
        return jsonify({"msg": "Erro ao obter a imagem do rosto desconhecido"}), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
