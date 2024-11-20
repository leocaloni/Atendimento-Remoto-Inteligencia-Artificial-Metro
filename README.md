# Software de Autoatendimento - Metrô de São Paulo

## Visão Geral

Este projeto tem como objetivo desenvolver um sistema de autoatendimento para o Metrô de São Paulo, com foco no cadastro e gerenciamento de usuários que possuem benefícios, como idosos, utilizando tecnologias modernas e seguras. O sistema será intuitivo, automatizando processos de cadastro e controle de passageiros, oferecendo maior agilidade e segurança nas operações do metrô.

## Objetivos

- Automatizar o cadastramento de usuários, especialmente os idosos, com o auxílio de reconhecimento facial.
- Prover uma solução segura para o armazenamento e gestão de dados pessoais.
- Criar uma interface amigável e acessível, principalmente para os usuários com benefícios.

## Funcionalidades Principais

- **Cadastro de clientes** com reconhecimento facial.
- **Autenticação** de usuários no momento de entrada e saída no metrô.
- **Emissão de relatórios** sobre a utilização do benefício.
- **Controle de acesso** para permitir a passagem dos passageiros com benefícios.

## Tecnologias Utilizadas

- **Linguagens de Programação**: Python, React, React Native.
- **Banco de Dados**: MongoDB.
- **Sistema de Nuvem**: AWS (DocumentDB para banco de dados, EC2 para back-end).
- **APIs Abertas**: Facilitar a integração com outros sistemas no futuro.

## Requisitos

### Funcionais

- O sistema deve permitir o **cadastro de clientes** com bilhete único ou pessoas aptas a receber o benefício.
- O sistema deve realizar a **verificação de autenticidade** para impedir fraudes.

### Não Funcionais

- O sistema deve ser capaz de liberar as catracas em **tempo real**.
- O tempo de resposta das operações deve ser inferior a **2 segundos**.

## Escopo

### Inclui:

- Desenvolvimento do sistema de cadastro e gestão de clientes com benefícios.
- Implementação de relatórios e extratos sobre a utilização do benefício.
- Integração com o sistema de **bilhete único**.
  
### Exclui:

- Cadastro de usuários fora das estações específicas.
- Integração com métodos de pagamento ou recarga de bilhetes.

## Público-Alvo

- Idosos e demais usuários com benefícios que utilizam o Metrô de São Paulo.
- Funcionários do Metrô de São Paulo envolvidos no processo de cadastro e gestão de usuários com benefícios.

## Cronograma

- **Fase 1**: Levantamento de requisitos e design (1 mês).
- **Fase 2**: Desenvolvimento do sistema (2 meses).
- **Fase 3**: Testes e validação (1 mês).
- **Fase 4**: Implementação e apresentação (1 mês).

## Orçamento

- **Custo estimado da aparelhagem**: R$800,00 por aparelho.
- **Banco de Dados AWS (DocumentDB)**: R$18.000,00/mês.
- **Back-end na Nuvem (Amazon EC2)**: R$730,00/mês.

## Estratégia de Desenvolvimento

O desenvolvimento será conduzido usando a metodologia ágil, com **sprints de 2 semanas**. A equipe se concentrará em entregas incrementais e validações contínuas com os stakeholders.

## Equipe

- **Front-end**: João Felipe e João Victor.
- **Back-end**: Leonardo e Raphael.
- **Banco de Dados**: Henrique.

## Comunicação

A comunicação da equipe será realizada por meio de **reuniões semanais no Microsoft Teams** para revisar requisitos e protótipos, garantindo a qualidade e aderência ao cronograma.

## Benefícios Esperados

- **Agilidade e praticidade** no uso do metrô, especialmente para idosos.
- **Facilidade no cadastramento de usuários** com benefícios.
- **Segurança e controle aprimorados** nas operações do metrô.
