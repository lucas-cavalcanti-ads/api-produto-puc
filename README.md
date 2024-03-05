# API Produtos | Puc Minas | Arquitetura API e Web Services

Essa API consiste em um CRUD completo e de forma local relacionado ao contexto de produtos.


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Recurso criado com sucesso (success).|
| `304` | Dados não foram modificados.|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|


## Endpoints

### 1. GET /produtos

- **Descrição:** Retorna todos os produtos disponíveis.
- **Cache:** Utiliza cache com tempo de vida de 2 minutos para reduzir o tráfego de rede.
- **Headers:** `If-Modified-Since` para controle de cache.
  
#### Exemplo de Requisição:
```http
GET /produtos HTTP/1.1
Host: localhost:3000
```

#### Exemplo de Resposta:
```json
[
    { "id": 1, "descricao": "Arroz parboilizado 5Kg", "valor": 25.00, "marca": "Tio João" },
    { "id": 2, "descricao": "Maionese 250gr", "valor": 7.20, "marca": "Helmans" },
    { "id": 3, "descricao": "Iogurte Natural 200ml", "valor": 2.50, "marca": "Itambé" },
    { "id": 4, "descricao": "Batata Maior Palha 300gr", "valor": 15.20, "marca": "Chipps" },
    { "id": 5, "descricao": "Nescau 400gr", "valor": 8.00, "marca": "Nestlé" }
]
```

### 2. GET /produtos/:id

- **Descrição:** Retorna um produto específico pelo seu ID.
- **Cache:** Utiliza cache com tempo de vida de 2 minutos para reduzir o tráfego de rede.
- **Headers:** `If-Modified-Since` para controle de cache.
  
#### Exemplo de Requisição:
```http
GET /produtos/3 HTTP/1.1
Host: localhost:3000
```

#### Exemplo de Resposta:
```json
{ "id": 3, "descricao": "Iogurte Natural 200ml", "valor": 2.50, "marca": "Itambé" }
```

### 3. POST /produtos

- **Descrição:** Adiciona um novo produto.
- **Body:** Deve conter os campos `descricao`, `valor` e `marca` do produto.
  
#### Exemplo de Requisição:
```http
POST /produtos HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "descricao": "Feijão Carioca 1kg",
    "valor": 6.50,
    "marca": "Camil"
}
```

#### Exemplo de Resposta:
```json
[
    { "id": 1, "descricao": "Arroz parboilizado 5Kg", "valor": 25.00, "marca": "Tio João" },
    { "id": 2, "descricao": "Maionese 250gr", "valor": 7.20, "marca": "Helmans" },
    { "id": 3, "descricao": "Iogurte Natural 200ml", "valor": 2.50, "marca": "Itambé" },
    { "id": 4, "descricao": "Batata Maior Palha 300gr", "valor": 15.20, "marca": "Chipps" },
    { "id": 5, "descricao": "Nescau 400gr", "valor": 8.00, "marca": "Nestlé" },
    { "id": 6, "descricao": "Feijão Carioca 1kg", "valor": 6.50, "marca": "Camil" }
]
```

### 4. PUT /produtos/:id

- **Descrição:** Atualiza os dados de um produto existente pelo seu ID.
- **Body:** Deve conter os campos `descricao`, `valor` e `marca` do produto.
  
#### Exemplo de Requisição:
```http
PUT /produtos/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "descricao": "Arroz Parboilizado 10Kg",
    "valor": 40.00,
    "marca": "Tio João"
}
```

#### Exemplo de Resposta:
```json
{ "id": 1, "descricao": "Arroz Parboilizado 10Kg", "valor": 40.00, "marca": "Tio João" }
```

### 5. DELETE /produtos/:id

- **Descrição:** Remove um produto pelo seu ID.
  
#### Exemplo de Requisição:
```http
DELETE /produtos/2 HTTP/1.1
Host: localhost:3000
```

#### Exemplo de Resposta:
```json
No Content
```

## Notas

- O cache é controlado utilizando o header `Last-Modified` e `If-Modified-Since` para melhorar a eficiência das requisições.
- Caso algum campo necessário não seja fornecido no body da requisição POST ou PUT, a API retornará um status de erro 400 (Bad Request) junto com uma mensagem informativa.
- Para os endpoints que retornam dados de um produto específico (`GET /produtos/:id`), se o produto não for encontrado, a API retornará um status de erro 404 (Not Found).
- O servidor está configurado para rodar na porta 3000.
