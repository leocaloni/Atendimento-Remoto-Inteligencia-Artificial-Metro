from flask import Flask, request, jsonify
from funcionario import Funcionario
from passageiro import Passageiro
import os

app = Flask(__name__)

#Endpoints da classe funcionário

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
    funcional = data.get('funcional')
    senha = data.get('senha')

    autenticado = Funcionario.logarFuncionario(funcional, senha)
    if autenticado:
        return jsonify({"msg": "Funcionário autenticado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao autenticar funcionário"}), 401
    
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
    if(deletado):
        return jsonify({"msg": "Funcionário deletado com sucesso"}), 200
    else:
        return jsonify({"msg": "Erro ao deletar funcionário"}), 400

#Endpoints da classe Passageiro

@app.route('/register_passenger', methods=['POST'])
def register_passenger():
    data = request.get_json()
    nome = data.get('nome')
    cpf = data.get('cpf')
    gratuidade = data.get('gratuidade')
    data_nascimento = data.get('data_nascimento')
    foto_base64 = data.get('foto_base64') 

    # Verifica se todos os campos obrigatórios estão presentes
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
    

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))