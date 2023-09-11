# README Projeto CRUD API

Este é um projeto simples de API Node.js que fornece funcionalidades básicas de gerenciamento de usuários e mensagens. A API foi criada para fins educacionais e não persiste dados em um banco de dados backend, portanto, todos os dados são armazenados temporariamente na memória durante a execução da aplicação.

## Instruções para uso da API

Para usar esta API, você precisará ter o [**Node.JS**](https://nodejs.org/en) instalado em sua máquina.

1. Clone o repositório:

   ```bash
   git clone https://github.com/Victoritalo/crudApi.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor da API:

   ```bash
   npm start
   ```

A API estará acessível em `http://localhost:3000`.

## Endpoints de Acesso

### 1. Mensagem de Boas-Vindas

- **GET /**

  Este ponto de acesso retorna uma mensagem de boas-vindas descrevendo a funcionalidade da API. Não requer nenhum parâmetro.

### 2. Cadastro de Usuário

- **POST /signup**

  Registra um novo usuário.

  - Corpo da Requisição:
    - `userEmail` (string): E-mail do usuário
    - `userName` (string): Nome do usuário
    - `userPass` (string): Senha do usuário
    - `confirmPassword` (string): Confirmar senha

  - Resposta:
    - Registro bem-sucedido:
      - Código de Status: 200
      - Resposta JSON:
        - `message`: "User created successfully!"
        - `userEmail`: E-mail do usuário
        - `userName`: Nome do usuário
        - `userId`: Identificador único do usuário

    - Erros:
      - Código de Status: 403
      - Resposta JSON: `{ "error": "Please fill in the fields" }`

      - Código de Status: 401
      - Resposta JSON: `{ "error": "Passwords do not match" }`

      - Código de Status: 409
      - Resposta JSON: `{ "error": "Email already registered by another user!" }`

### 3. Login de Usuário

- **POST /login**

  Autentica e faz o login de um usuário.

  - Corpo da Requisição:
    - `userEmail` (string): E-mail do usuário
    - `userPass` (string): Senha do usuário

  - Resposta:
    - Login bem-sucedido:
      - Código de Status: 200
      - Resposta JSON:
        - `message`: "Login successful!"
        - `name`: Nome do usuário
        - `userId`: Identificador único do usuário
        - `messages`: Mensagens do usuário

    - Erro:
      - Código de Status: 400
      - Resposta JSON: `{ "error": "Wrong credentials!" }`

### 4. Obter Mensagens do Usuário

- **GET /:userId/:page**

  Recupera mensagens paginadas para um usuário logado.

  - Parâmetros da URL:
    - `userId` (parseInt): Identificador único do usuário
    - `page` (parseInt): Número da página para paginação

  - Resposta:
    - Recuperação bem-sucedida:
      - Código de Status: 200
      - Resposta JSON:
        - `userid`: Identificador único do usuário
        - `name`: Nome do usuário
        - `messages`: Mensagens paginadas
        - `totalPages`: Número total de páginas

    - Erro:
      - Código de Status: 404
      - Resposta JSON: `{ "error": "No users found!" }`

### 5. Criar Mensagem

- **POST /:userId/message**

  Cria uma nova mensagem para um usuário logado.

  - Parâmetros da URL:
    - `userId` (parseInt): Identificador único do usuário

  - Corpo da Requisição:
    - `title` (string): Título da mensagem
    - `message` (string): Conteúdo da mensagem

  - Resposta:
    - Criação bem-sucedida:
      - Código de Status: 200
      - Resposta JSON: `{ "message": "Message added successfully" }`

    - Erro:
      - Código de Status: 400
      - Resposta JSON: `{ "error": "Please fill in the fields" }`

### 6. Atualizar Mensagem

- **PUT /:userId/:messageId**

  Atualiza uma mensagem existente para um usuário logado.

  - Parâmetros da URL:
    - `userId` (parseInt): Identificador único do usuário
    - `messageId` (parseInt): Identificador único da mensagem

  - Corpo da Requisição:
    - `title` (string): Título da mensagem atualizado
    - `message` (string): Conteúdo da mensagem atualizado

  - Resposta:
    - Atualização bem-sucedida:
      - Código de Status: 200
      - Resposta JSON: `{ "message": "Message updated successfully" }`

    - Erro:
      - Código de Status: 404
      - Resposta JSON: `{ "error": "User does not exist or has no permission to access this message" }`

      - Código de Status: 400
      - Resposta JSON: `{ "error": "Please fill in the fields" }`

      - Código de Status: 404
      - Resposta JSON: `{ "error": "Message does not exist" }`

### 7. Excluir Mensagem

- **DELETE /:userId/:messageId**

  Exclui uma mensagem existente para um usuário logado.

  - Parâmetros da URL:
    - `userId` (parseInt): Identificador único do usuário
    - `messageId` (parseInt): Identificador único da mensagem

  - Resposta:
    - Exclusão bem-sucedida:
      - Código de Status: 200
      - Resposta JSON: `{ "message": "Messaged successfully deleted" }`

    - Erro:
      - Código de Status: 404
      - Resposta JSON: `{ "error": "User does not exist or has no permission to access this message" }`

      - Código de Status: 404
      - Resposta JSON: `{ "error": "Message does not exist" }`

## Notas Importantes

- Esta API é apenas para fins educacionais e não deve ser usada em ambientes de produção sem mecanismos adequados de segurança e persistência de dados.

- Os dados de usuário e mensagens são armazenados na memória durante a execução

## Autor

Essa API foi criada por [Victor Italo](https://github.com/Victoritalo).

## Licença

BR: Este é um projeto open-source e está disponível sob a [MIT License](LICENSE).<br>
EN: This project is open-source and available under the [MIT License](LICENSE).<br>
## 