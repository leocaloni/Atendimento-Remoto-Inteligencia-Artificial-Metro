# App Reconhecimento Facial e Atendimento - Metrô

## Visão Geral

Esse projeto realiza o cadastro de funcionários e passageiros, onde o funcionário poderá realizar seu login para cadastrar passageiros e seus rostos. A partir disso os passageiros que possuem algum tipo de gratuidade poderão economizar tempo ao passar nas catracas com reconhecimento facial e serem liberados rapidamente para pegar seu metrô.

## Objetivos

- Automatizar catracas para pessoas com gratuidade.
- Rapidez no fluxo do Metrô
- Acabar com fraudes nas catracas com o bilhete único

## Funcionalidades Principais

- Cadastro de passageiros
- Cadastro de funcionários
- Reconhecimento facial pela câmera em tempo real
- Administração do sistema

## Tecnologias Utilizadas

- **Linguagens de Programação**: Python, React, React Native.
- **Banco de Dados**: MongoDB.

## Como rodar o App

Para rodar localmente você irá precisar primeiramente realizar as instalações das bibliotecas python, o seguinte comando deve instalar todas elas:


<p align="center">pip install bcrypt pymongo flask flask-cors deepface opencv-python-headless numpy unidecode
</p>


Após instalar as bibliotecas do python você deve instalar as bibliotecas utilizadas no react, o seguinte comando deve instalar todas elas:


<p align="center">npm install react-router-dom @mui/material @emotion/react @emotion/styled
</p>


Por fim, é necessário instalar as bibliotecas utilizadas no react-native, o seguinte comando deve instalar todas elas:


<p align="center">npm install react-native-paper @react-navigation/native @react-navigation/stack react-native-safe-area-context expo-camera @expo/vector-icons react-native-gesture-handler react-native-reanimated react-navigation-stack
</p>


Após isso nas telas login.tsx e cadastro.tsx, altere o ip da variável API_URL para seu ip.

Agora para poder rodar tudo localmente, você deve criar 4 terminais, sendo eles, um para rodar o sistema de reconhecimento facial pela câmera, um para o servidor flask das requisições, um para rodar a aplicação mobile e um para rodar a aplicação web.

Para rodar o reconhecimento facial, você deve ir até a pasta "backend" com o comando "cd backend", e após isso rodar o seguinte comando:


<p align="center">
  python reconhecimento.py
</p>


Para rodar o servidor flask (necessário para a conexão com o front-end), voce deve fazer o mesmo e ir até a pasta "backend" e após isso rodar o seguinte comando:

<p align="center">python routes.py
</p>

Para rodar a aplicação mobile, você deve ir até a pasta "frontend" com o comando "cd frontend" e ir para a pasta "AtendimentoMetro" com o comando "cd AtendimentoMetro", e após isso rodar o seguinte comando:


<p align="center">npx expo start
</p>


Por fim, para rodar a aplicação web, você deve ir novamente para a pasta "frontend" e ir para a pasta "atendimentoweb" com o comando "cd atendimentoweb", e após isso rodar o seguinte comando:


<p align="center">npm start
</p>


Além das instalações você deve criar um banco de dados MongoDB local, com o nome "testeBanco", com duas collections, sendo elas "testeCollection" (coleção dos passageiros) e "funcionarioTesteCollection" (coleção dos funcionários). Elas tem esses nomes pois foram utilizadas apenas para testes, caso queira criar com outros nomes será necessário alterar também no código do arquivo "db.py".

Assim você terá a aplicação inteira sendo rodada.

## Funcionamento

Na parte do mobile você tem apenas a opção de login, pois o funcionário é cadastrado por um admin na parte web. O admin é cadastrado como um funcionário na coleção dos funcionários, com o atributo "isAdmin" como "True". Ao realizar o login o funcionário terá que preencher as informações do passageiro e tirar uma foto dele, assim o passageiro é cadastrado na coleção dos passageiros e pode ser reconhecido ao rodar o código de reconhecimento facial.

Na parte web, terá dois logins, um login onde caso o funcionário seja um admin ele será jogado para a administração do sistema, e caso seja funcionário comum será jogado para a verificação de passageiro.

Na administração do sistema, o admin poderá cadastrar, consultar ou excluir funcionários, e poderá consultar ou excluir passageiros.

Na verificação de passageiro, o funcionário receberá de tempos em tempos uma foto tirada da câmera de rostos que não foram reconhecidos, e caso o passageiro tenha problemas com o reconhecimento, o funcionário atenderá o passageiro e irá consultar a partir do cpf a foto no banco de dados do passageiro, caso seja a mesma pessoa ele poderá liberar a catraca para o passageiro, caso contrário ele não libera.

Caso o funcionário esqueça sua senha ele pode clicar na opção de recuperar a senha, nela ele irá ser redirecionado para o e-mail, onde terá uma mensgem pré-montada, onde ele irá enviar um e-mail para o supervisou ou admin do sistema, com o motivo da troca de senha. 

## Público-Alvo

- Passageiros com algum tipo de gratuidade no metrô
- Funcionários do metrô que irão cadastrar esses passageiros


## Equipe

- **Front-end**: João Felipe e João Victor.
- **Back-end**: Leonardo e Raphael.
- **Banco de Dados**: Henrique.


