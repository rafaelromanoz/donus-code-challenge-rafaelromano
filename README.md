# Code Challenge Digital Republic Associate Software Developer

Code challenge para vaga de Associate Software Developer, API desenvolvida para realizar registros de clientes e transações financeiras.

## 🚀 Começando

- `git clone https://github.com/rafaelromanoz/donus-code-challenge-rafaelromano`

### 📋 Pré-requisitos

O projeto possui um docker-compose configurado para subir um container com MySQL, se possuir o docker e docker compose rode o seguinte comando:

```
docker-compose up
```

### 🔧 Instalação

Para executar o projeto retire o .dev do arquivo .env.dev e preencha com as informações do seu banco MySQL.

OBS: Se preferir subir o container docker as configurações serão essas:

```
JWT_SECRET=suachave
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=challenge_digitalrepublic
HOSTNAME=127.0.0.1
MYSQL_PORT=3306
```
<strong>Instalação de dependências</strong>

```
npm i ou npm install
```
<strong>Abra seu gerenciador de banco de dados e rode o comando abaixo,
Dica: Extensão para o VSCode chamado MySQL.</strong>
```
CREATE DATABASE challenge_digitalrepublic
    DEFAULT CHARACTER SET = 'utf8mb4';
```
<strong>Importante:</strong> O banco de dados com o nome challenge_digitalrepublic precisa ser criado antes de rodar as migrações.

<strong>Rode as migrações</strong>

```
npm run typeorm migration:run
```

<strong>Rode o servidor</strong>

```
npm start
```

## ⚙️ Executando os testes

<strong>Rodar os testes</strong>

```
npm test
```

## Rotas da aplicação

Para usar a aplicação recomenda-se o Insomnia, na pasta
insomnia-file possui o ambiente configurado com as rotas para usar.

Na rota /user é possível cadastrar um usuário, envie um json no seguinte formato, após o cadastro é gerado um token que com ele é possível fazer depósitos ou transferências. Copie o token e coloque no header 'authorization' das próximas requisições.
```
http://localhost:3000/user
```
```json
{
  "name": "Jose Giovani Oliveira",
  "cpf": "114.684.207-08"
}
```
Para depositar é necessário um CPF válido cadastrado antes e o seguinte JSON no corpo da requisição.
```
http://localhost:3000/account/deposit
```
```json
{
  "cpf": "114.684.207-08",
  "deposit": 3000
}
```
Na rota de transferência entre as contas, como a operação precisa ser atômica respeitando o princípio  ACID (atomic, consistency, isolation, durability) foi utilizada do método transaction do TypeORM, as contas não podem ter valor negativo então só é possível transferir se o usuário possui saldo, e também por questões de regra de negócio não é possível transferir um valor maior que 2000, para transferir dinheiro entre as contas o JSON aceito é nesse padrão:

```
http://localhost:3000/account/transfer
```

```json
{
  "cpfOrigin": "115.987.555-98",
  "quantity":  188,
  "cpfDestiny": "114.684.207-08"
}
```

## 📦 Desenvolvimento

No desenvolvimento da API foi utilizada da arquitetura MSC, Models, Services, Controller, no service estão as regras de negócio, controller estão as requisições.

Para o banco de dados foi utilizado o MySQL e o mapeamento Objeto-Relacional foi utilizado o TypeORM.

Para confecção da API foi utilizado do framework Express e Node.js com TypeScript.

Para padronização e qualidade de código foi utilizado o ESLint e o editorconfig.

## 🛠️ Construído com

* [TypeScript](https://www.typescriptlang.org/) - Linguagem
* [JavaScript](javascript.com) - Linguagem
* [TypeORM](https://typeorm.io/#/) - Mapeamento objeto-relacional
* [MySQL](https://www.mysql.com/) - Banco de Dados
* [Express](https://expressjs.com/pt-br/) - Criação API
* [Node.js](https://nodejs.org/en/) - Criação API
* [Docker](https://nodejs.org/en/) - Container MySQL
* [ESLint](https://eslint.org/) - Padronização e qualidade de código
* [Jest](https://jestjs.io/pt-BR/) - Framework de Testes
* [auth](https://jwt.io/) - Ferramenta de auth
* [Joi](https://joi.dev/api/?v=17.6.0) - Validações das informações requests.
