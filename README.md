# Admin Hub

## **Deploy**

Todas as requisições devem ser feitas para o link [admin-hub-api](https://admin-hub-api.herokuapp.com/). A aplicação está hospedada no Heroku.

## Sumário
- [Sobre](#sobre)
- [Contatos](#contatos)
- [Ferramentas](#ferramentas)
- [Iniciando projeto](#iniciando-projeto)
- [Scripts](#scripts)
- [Autenticação de usuário](#auth)
- [Rotas](#rotas)
  - [/login - POST](#login)
  - [/users - POST](#users-post)
  - [/users - GET](#users-all-get)
  - [/users/:id - GET](#users-id-get)
  - [/users/:id - PUT](#users-id-put)
  - [/users/:id - DELETE](#users-id-delete)
  - [/voucher - GET](#voucher-all-get)
  - [/voucher/filter - GET](#voucher-filter-get)
  - [/voucher - POST](#voucher-post)
  - [/voucher/:id - GET](#voucher-id-get)
  - [/voucher/:id - PUT](#voucher-id-put)
  - [/voucher/:id - DELETE](#voucher-id-delete)
- [Formatos de erros](#formatos-de-erros)
  - [Erros de validação](#erros-de-validacao)
  - [Regras da aplicação](#regras-da-aplicacao)
- [Feedbacks](#feedbacks)

***
## **Sobre**
  Aplicação desenvolvida para fazer o controle financeiro e conseguir visualizar o faturamento mensal ou anual de dentistas.
  
## **Contatos**
<a targer="_blank" href="https://www.linkedin.com/in/elias-forte/"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/></a>

***

## **Ferramentas**

- [Typescript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/atlas/database)
- [Joi](https://joi.dev/api/?v=17.6.0)

## **Iniciando projeto**

Primeiro use esse comando no seu terminal para fazer um clone do repositório no seu computador:

```bash
git clone git@github.com:eliforte/admin-hub-api.git
```
Use o comando abaixo para entrar na pasta principal do projeto:

```bash
cd admin-hub-api
```

Na pasta raiz do projeto use:

```bash
yarn
```

## **Scripts**

- <code>yarn</code> => Para instalar todas as dependências do projeto.
- <code>yarn start</code> => Para iniciar a aplicação em ambiente de produção.
- <code>yarn dev</code> => Para iniciar a aplicação em ambiente de desenvolvimento.
- <code>yarn build</code> => Para iniciar o build a aplicação.
- <code>yarn test</code> => Para iniciar todos os testes.

***
<br>

## <a name="auth">**Autenticação de usuário**</a>
  Todas as rotas validam se o usuário logado, é autorizado a ler as informações do banco de dados. Para conseguir esse acesso, após logar na aplicação, retornará na resposta da API, um **token** de usuário que deve ser enviando no **headers** da requisição, na chave **Authorization** no formato de **Bearer Token** para conseguir acesso.

## **Rotas**
  É preciso estar logado para fazer requisições e obter respostas da API. A validação dos **body** das requisições são feitas usando o [Joi](https://joi.dev/api/?v=17.6.0).

  <br>

  ## <code>/login - POST</code><a name="login"></a>
  
  <br>

  Para conseguir acesso as rotas, precisa fazer login na aplicação por meio de uma requisição do método **POST** para o endpoint <code>/login</code> enviando o email e senha no corpo da requisição.
   Exemplo de corpo da requisição:

 ```json
{
  "email": "daenerys@targaryen.com",
  "password": "dracarys"
}

```
  Após conseguir acesso, retornará um **token** do usuário que deve ser enviando no **headers** na requisição, na chave **Authorization** para conseguir acesso as informações da API.

**Exemplo de resposta:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBkNDJiOWEwNzE0ODVmYTNkZDEzOGEiLCJlbWFpbCI6ImVyaWNhQGRlbnRpc3RhLmNvbSIsIm5hbWUiOiJFcmljYSBEZW50aXN0YSI.umH3ulubOoSdnZWi0eHOuvtcIB7UXMxakSwn32qRAZg",
    "name": "Daenerys Targaryen",
    "_id": "630d42b9a4567821fa3weqwe444a"
}
```
  **Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/users - POST</code><a name="users-post"></a>

Para criar um novo usuário, basta fazer uma nova requisição do método **POST** para o endpoint <code>/users</code> enviando o nome, email e senha no corpo da requisição.
   Exemplo de corpo da requisição:
   
```json
{
    "name": "Jon Snow",
    "email": "jon@snow.com",
    "password": "whitewolf"
}
```
**Exemplo de resposta:**
```json
{
    "_id": "6313fc045c0736788f9c29c5",
    "name": "Jon Snow",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzEzZmMwNDVjMDczNjc4OGY5YzI5YzUiLCJuYW1lIjoiSm9uIFNub3ciLCJlbWFpbCI6ImpvbkBzbm93LmNvbSIsImlhdCI6MTY2MjI1NDA4NCwiZXhwIjoxNjYyMjU3Njg0fQ.eDPg6pVXNhYEYdmY1i2ri0vtFuWHC2b-3VowOee1cl0",
    "message": "successfully created"
}
```
**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/users - GET</code><a name="users-all-get"></a>

Para conseguir informações de todos os usuários, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer requisição do método **GET** para o endpoint <code>/users</code>.

Exemplo de URL para requisição:
   
<code>[https://admin-hub-api.herokuapp.com/users]()</code>

**Exemplo de resposta:**
```json
{
   [
    {
        "_id": "630d42b9a4567821fa3weqwe444a",
        "name": "Daenerys Targaryen",
        "email": "daenerys@targaryen.com",
        "password": "$2b$10$Ey106ZcrC.PuaAyFI2zt7O7wzqk3l1WASDA@F#FASSbbfItf5IaDje"
    },
    {
        "_id": "6313fc045c0736788f9c29c5",
        "name": "Jon Snow",
        "email": "jon@snow.com",
        "password": "$2b$10$wDJgJgfAbiZQCBSbxIFH.emrXL1bKIZ0g7/dVa.ajsruTVXJ2DhKK"
    }
  ]
}
```
**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/users/:id - GET</code><a name="users-id-get"></a>

Para conseguir informações de um usuário, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **GET** para o endpoint <code>/users/:id</code> enviando o **id** do usuário nos parâmetros da **URL** da requisição. 

Exemplo de URL para requisição:
   
<code>[https://admin-hub-api.herokuapp.com/users/6313fc045c0736788f9c29c5]()</code>

**Exemplo de resposta:**
```json
{
    "_id": "6313fc045c0736788f9c29c5",
    "name": "Jon Snow",
    "email": "jon@snow.com",
    "password": "$2b$10$wDJgJgfAbiZQCBSbxIFH.emrXL1bKIZ0g7/dVa.ajsruTVXJ2DhKK"
}
```
**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/users/:id - PUT</code><a name="users-id-put"></a>

Para conseguir editar informações de um usuário, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **PUT** para o endpoint <code>/users/:id</code> enviando o **id** do usuário nos parâmetros da **URL** e o corpo da requisição deve conter os campos nome, email e senha. 

Exemplo de URL e corpo da requisição:
   
<code>[https://admin-hub-api.herokuapp.com/users/6313fc045c0736788f9c29c5]()</code>

```json
{
    "name": "Aegon Targaryen",
    "email": "aegon@targaryen.com",
    "password": "dragonstoneprince"
}
```

**Exemplo de resposta:**
```json
{
    "_id": "6313fc045c0736788f9c29c5",
    "name": "Jon Snow",
    "email": "jon@snow.com",
    "password": "$2b$10$4odrWRGkAr2Lwobnv5jM8eveHHewRSUldJDo8LkMJBkEG4UjTBYD."
}
```
**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)
  
<br>

## <code>/users/:id - DELETE</code><a name="users-id-delete"></a>

Para conseguir deletar informações de um usuário, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **DELETE** para o endpoint <code>/users/:id</code> enviando o **id** do usuário nos parâmetros da **URL** da requisição. A caso entrado o usuário, a resposta será somente um status code <code>204 No Content</code>

Exemplo de URL e corpo da requisição:
   
<code>[https://admin-hub-api.herokuapp.com/users/6313fc045c0736788f9c29c5]()</code>

**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/voucher - GET</code><a name="voucher-all-get"></a>

Para conseguir todos os comprovantes registrados pelo usuário, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **GET** para o endpoint <code>/voucher</code>. A resposta será os comprovantes de atendimentos registrados **somente por aquele usuário**, nenhum usuário vai ter acesso aos comprovantes de outros usuários.
   
<code>[https://admin-hub-api.herokuapp.com/users]()</code>

**Exemplo de resposta:**
```json
{
    [
      {
          "_id": "63113eaa7698efc3b1512a91",
          "type": "Extração de dentes 25 e 24",
          "pacient_fullname": "Maria José",
          "plan": "Hapvida",
          "payment_method": "Cartão de débito",
          "form_of_payment": "À vista",
          "quantity_installments": 2,
          "total": 200,
          "quantity_installments_paid": 1,
          "payment_day": 0,
          "last_payment": "2022-09-01",
          "next_payment": "",
          "installment_value": 200,
          "responsible_id": "630d42b9a071485fa3d4457a"
      },
      {
          "_id": "631140077698efc3b1512a94",
          "type": "clareamento",
          "pacient_fullname": "Elias Forte",
          "plan": "Odonto System",
          "payment_method": "Cartão de crédito",
          "form_of_payment": "Parcelamento",
          "quantity_installments": 4,
          "total": 1120,
          "quantity_installments_paid": 1,
          "payment_day": 15,
          "last_payment": "2022-09-01",
          "next_payment": "2022-10-15",
          "installment_value": 280,
          "responsible_id": "630d42b9a071485fa3d4457a"
      }
    ]
}
```

**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/voucher/filter - GET</code><a name="voucher-filter-get"></a>

Para conseguir filtrar todos os comprovantes registrados pelo usuário, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **GET** para o endpoint <code>/voucher/filter</code>. A resposta será os comprovantes de atendimentos registrados **somente por aquele usuário**, nenhum usuário vai ter acesso aos comprovantes de outros usuários. Por padrão, a API enviará somente os comprovantes do mês/ano atual do acesso do usuário. Por meio das **querys** da URL deve ser feito o filtro:

Exemplo de URL com querys:
   
<code>[https://admin-hub-api.herokuapp.com/voucher/filter?periodFomat=&month=Agosto&paymentMethod=&formOfPayment=À vista]()</code>

Explicando as querys:
- <code>periodFormat</code> deve ser **"Ano"** ou **"Mês"**, definindo o range do filtro. Se vazio, será definido por padrão como **"Mês"**.
- <code>month</code> deve ser o mês que o usuário deseja filtrar, como por exemplo "Agosto". Se vazio, será definido o mês atual por padrão.
- <code>paymentMethod</code> deve ser o método de pagamento, que pode ser **"Cartão de crédito"**, **"Cartão de débito"** ou **"Em dinheiro"**.
- <code>formOfPayment</code> deve ser a forma de pagamento, que pode ser **"À vista"** ou **"Parcelamento"**.

**Exemplo de resposta:**
```json
{
    [
      {
          "_id": "6312827a04bfdb2b412db1f1",
          "type": "Obturação",
          "pacient_fullname": "Miguel",
          "plan": "Hapvida",
          "payment_method": "Cartão de débito",
          "form_of_payment": "À vista",
          "quantity_installments": 2,
          "total": 150,
          "quantity_installments_paid": 1,
          "payment_day": 0,
          "last_payment": "2022-08-23",
          "next_payment": "",
          "installment_value": 150,
          "responsible_id": "630d42b9a071485fa3dd138a"
      },
    ]
}
```

**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

<br>

## <code>/voucher/:id - GET</code><a name="voucher-id-get"></a>

Para conseguir informações de um comprovante de atendimento, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **GET** para o endpoint <code>/voucher/:id</code> enviando o **id** do comprovante de atendimento nos parâmetros da **URL** da requisição. 

Exemplo de URL para requisição:
   
<code>[https://admin-hub-api.herokuapp.com/voucher/63113eaa7698efc3b1512a91]()</code>

**Exemplo de resposta:**
```json
{
    "_id": "631140077698efc3b1512a94",
    "type": "clareamento",
    "pacient_fullname": "Elias Forte",
    "plan": "Odonto System",
    "payment_method": "Cartão de crédito",
    "form_of_payment": "Parcelamento",
    "quantity_installments": 4,
    "total": 1120,
    "quantity_installments_paid": 1,
    "payment_day": 15,
    "last_payment": "2022-09-01",
    "next_payment": "2022-10-15",
    "installment_value": 280,
    "responsible_id": "630d42b9a071485fa3dd138a"
}
```
**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## <code>/voucher - POST</code><a name="voucher-post"></a>

Para registrar novos comprovantes de atendimentos, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **POST** para o endpoint <code>/voucher</code>, com as informações do atendimento no corpo da requisição. 

Exemplo do corpo da requisição:

```json
{
    "form_of_payment": "Parcelamento",
    "installment_value": 387.5,
    "last_payment": "2022-09-03",
    "next_payment": null,
    "pacient_fullname": "Camila Barbosa",
    "payment_day": "18",
    "payment_method": "Cartão de crédito",
    "plan": "Hapvida",
    "quantity_installments": "8",
    "quantity_installments_paid": 1,
    "total": 3100,
    "type": "Clareamento"
}
```

**Exemplo de resposta:**
```json
{
    "message": "successfully created"
}
```

**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)
  
<br>

## <code>/voucher/:id - DELETE</code><a name="voucher-id-delete"></a>

Para conseguir deletar um comprovante de atendimento, precisa-se estar logado. Após o processo para [autorização e validação do usuário](#auth), para conseguir as informações da rota basta fazer uma requisição do método **DELETE** para o endpoint <code>/voucher/:id</code> enviando o **id** do comprovante nos parâmetros da **URL** da requisição. A caso entrado o comprovante, a resposta será somente um status code <code>204 No Content</code>

Exemplo de URL e corpo da requisição:
   
<code>[https://admin-hub-api.herokuapp.com/users/63113eaa7698efc3b1512a91]()</code>

**Formatos de erros que podem acontecer**
  - [Erros de validação](#erros-de-validacao)
  - [Erros de autenticação](#erros-de-autenticacao)

<br>

## **Formatos de erros**

### <a name="erros-de-validacao"><u>*Erros de validação*</u></a>

  São erros que ocorrem quando o cliente envia dados inválidos — em branco ou de tipo incorreto — gerando as respostas a seguir.


  - Email ou senha inválidas:
  ```json
  {
    "message": "Senha ou email incorretos"
  }
  ```
  
  - Tipo incorreto:
  ```json
  {
    "message": "paymente_method must be a number"
  }
  ```

   ### <a name="erros-de-autenticacao"><u>*Erros de autenticação*</u></a>
  São erros que ocorrem quando os usuários são impedidos pelo middleware de validação de token. Isso limita suas ações de acordo com seu nível de acesso ou se eles estão tentando alterar o token de forma maliciosa para obter mais controle sobre o aplicativo.

  - Missing auth token:
  ```json
  {
    "message": "Usuário não autorizado"
  }
  ```
  - <a name="jwt-malformed">JWT malformed:</a>
  ```json
  {
    "message": "Token inválido"
  }
  ```
