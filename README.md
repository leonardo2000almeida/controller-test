<h1 align="center">
List of contacts API
</h1>
Essa API usa uma arquitetura DDD, onde irá ter regras de negócios, validações para requisições, integrações com o banco de dados Postgres usando ORM.

O banco de dados é rodado localmente através de sua máquina, sendo apenas necessário usar suas credenciais.

O servidor por padrão escuta na porta `3000`

## Entenda a organização de pastas:

```
- Regras de negocio: src/application
- Schema, entidades: src/domain
- Servidor, orm, redis: src/infrastructure
- Adaptadores para rotas: src/interface
```

# Dependências

| Nome             | versão    |
| :--------------- | :-------- |
| `dotenv`         | `^15.0.0` |
| `express`        | `^4.17.2` |
| `helmet`         | `^5.0.2`  |
| `joi`            | `^17.6.0` |
| `morgan`         | `^1.10.0` |
| `pg`             | `^8.7.1`  |
| `redis`          | `^4.0.3`  |
| `typeorm`        | `^0.2.41` |
| `validations-br` | `^1.2.0`  |

#

## Redis

> Nesse projeto, apenas instalei a imagem oficial do redis no container, e deixei a porta sendo escutada na padrão.

```
port: 6379
```

## Rodar localmente

```diff
- *Para rodar esse projeto, é necssário ter instalado docker, pois o redis roda em um container.*
```

Clone o projeto

```git
  git clone https://github.com/leonardo2000almeida/controller-test.git
```

Va para a pasta do raiz do repositório

```shell
cd nome_repositorio
```

instale as dependências

```shell
  npm install
```

Rode as migrations:

```shell
npm run typeorm migration:run
```

Modifique o arquivo .env citado na Modifique o arquivo .env citado na [seção abaixo](README.md#variaveis-de-ambiente).

#

Rode o container

```shell
docker compose up
```

Após modificar o arquivo, rode o comando

```shell
npm run dev
```

## Variaveis de ambiente

Para rodar esse projeto é necessário editar o arquivo src/infrastructure/config

`PG_PORT=PORT_DO_SEU_POSTGRES`
`PG_HOST=HOST_DO_SEU_POSTGRES`
`PG_PASSWORD=SENHA_DO_SEU_POSTGRES`
`PG_USERNAME=USUARIO_DO_SEU_POSTGRES`
`PG_DATABASE=listOfContacts`

## Rotas da

> Collection do postman

```json
{
	"info": {
		"_postman_id": "d9d90d2f-7e98-4770-8484-37f14330d660",
		"name": "controller",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Export  contacts",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "token",
						"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkBIMXRHNE0zIyIsImlhdCI6MTY0MzgzNjQwOSwiZXhwIjoxNjQzODQwMDA5fQ.nR2N-A_PW6yTJ_7pYIu-dkQf0KU1bak3Pn2WvqZ-YdQ",
						"type": "default"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "Nome,Email,Telefone,CPF/CNPJ,CEP,Logradouro,Número,Complemento,Bairro,Cidade,Estado\r\nFulano da Silva,fulano@email.com,(00) 0000-0000,76038817000110,88801-000,Av. Centenário,1,,Centro,Criciúma,SC\r\nCiclano Ferreira,ciclano@email.com,(00) 0000-0000,63229617053,,,,,,,\r\nBeltrano dos Santos,beltrano@email.com,(00) 9 0000-0000,45310594094,88801-000,,1,,Centro,Criciúma,SC\r\nOutros da Costa,outrossilva@email.com,(00) 0000-0000,89958193086,,Av. Centenário teste,1,,Centro,Criciúma,SC\r\nCliente da Cunha,cliente@email.com,(00) 0000-0000,22718689048,88801-000,,1,,Centro,Criciúma,SC\r\nFornecedor de Souza,fornecedor@email.com,(00) 0000-0000,150706000130,,,,,,,\r\njonathan,jonathan@email.com,(00) 0000-0000,150706000130,,,,,,,\r\n",
					"options": {
						"raw": {
							"language": "text"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/contact/export",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"export"
					]
				}
			},
			"response": []
		},
		{
			"name": "Import contacts",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "Nome,Email,Telefone,CPF/CNPJ,CEP,Logradouro,Número,Complemento,Bairro,Cidade,Estado\r\nFulano da Silva,fulano@email.com,(00) 0000-0000,76038817000110,88801-000,Av. Centenário,1,,Centro,Criciúma,SC\r\nCiclano Ferreira,ciclano@email.com,(00) 0000-0000,63229617053,,,,,,,\r\nBeltrano dos Santos,beltrano@email.com,(00) 9 0000-0000,45310594094,88801-000,,1,,Centro,Criciúma,SC\r\nOutros da Costa,outrossilva@email.com,(00) 0000-0000,89958193086,,Av. Centenário teste,1,,Centro,Criciúma,SC\r\nCliente da Cunha,cliente@email.com,(00) 0000-0000,22718689048,88801-000,,1,,Centro,Criciúma,SC\r\nFornecedor de Souza,fornecedor@email.com,(00) 0000-0000,150706000130,,,,,,,\r\njonathan,jonathan@email.com,(00) 0000-0000,150706000130,,,,,,,\r\n"
				},
				"url": {
					"raw": "localhost:3000/contact/import",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"import"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create contact",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"name\": \"Leonardo almeida rodrigues de oliveira\",\r\n    \"email\": \"leonardo16almeida@gmail.com\",\r\n    \"phone\": \"5553991576413\",\r\n    \"type\": \"PF\",\r\n    \"cpfCnpj\": \"04955338022\",\r\n    \"address\": {\r\n        \"city\": \"Rio grande\",\r\n        \"district\": \"Cassino\",\r\n        \"number\": 132,\r\n        \"state\": \"Rio grande do sul\",\r\n        \"zipcode\": \"96207-471\",\r\n        \"street\":\"Paulino Maternal\",\r\n        \"complement\":\"A\"\r\n    }\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/contact/",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "disable contact",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:3000/contact/1",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"1"
					]
				}
			},
			"response": []
		},
		{
			"name": "get one",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "localhost:3000/contact/1",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"1"
					]
				}
			},
			"response": []
		},
		{
			"name": "active contact",
			"request": {
				"method": "PUT",
				"header": [],
				"url": {
					"raw": "localhost:3000/contact/4/active",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"4",
						"active"
					]
				}
			},
			"response": []
		},
		{
			"name": "update contact",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"name\":\"teste de update \"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "localhost:3000/contact/1",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"contact",
						"1"
					]
				}
			},
			"response": []
		}
	]
}
```

#### Retorna um contato

```diff
+ GET localhost:3000/contact/:id
```

| Param | Tipo     | Descrição                | Obrigatorio |
| :---- | :------- | :----------------------- | :---------- |
| `id`  | `string` | `id do contato desjeado` | `true`      |

#

#### Criar um contato

```diff
+ POST localhost:3000/contact
```

| Body      | Tipo     | Descrição                                                                          | Obrigatorio |
| :-------- | :------- | :--------------------------------------------------------------------------------- | :---------- |
| `name`    | `string` | `nome completo`                                                                    | `true`      |
| `email`   | `string` | `email do usuário`                                                                 | `true`      |
| `phone`   | `string` | `celular do usuário`                                                               | `true`      |
| `type`    | `string` | `PF OU PJ`                                                                         | `true`      |
| `cpfCnpj` | `string` | `PF = CPF, PJ = CNPJ`                                                              | `true`      |
| `address` | `objeto` | `{ zipcode, street, number, complement (não obrigatorio), district, city, state }` | `true`      |

#

#### Atualiza um contato, menos o status

```diff
! PUT localhost:3000/contact/:id
```

| Param | Tipo     | Descrição       | Obrigatorio |
| :---- | :------- | :-------------- | :---------- |
| `id`  | `string` | `id do contato` | `true`      |

| Body      | Tipo     | Descrição                                                                          | Obrigatorio |
| :-------- | :------- | :--------------------------------------------------------------------------------- | :---------- |
| `name`    | `string` | `nome completo`                                                                    | `false`     |
| `email`   | `string` | `email do usuário`                                                                 | `false`     |
| `phone`   | `string` | `celular do usuário`                                                               | `false`     |
| `type`    | `string` | `PF OU PJ`                                                                         | `false`     |
| `cpfCnpj` | `string` | `PF = CPF, PJ = CNPJ`                                                              | `false`     |
| `address` | `objeto` | `{ zipcode, street, number, complement (não obrigatorio), district, city, state }` | `false`     |

#

#### Ativa um contato

```diff
! PUT localhost:3000/contact/:id/active
```

| Param | Tipo     | Descrição       | Obrigatorio |
| :---- | :------- | :-------------- | :---------- |
| `id`  | `string` | `id do contato` | `true`      |

#

#### Desativa um contato

```diff
- DEL localhost:3000/contact/:id
```

| Param | Tipo     | Descrição       | Obrigatorio |
| :---- | :------- | :-------------- | :---------- |
| `id`  | `string` | `id do contato` | `true`      |

#

#### Importar um csv de contatos

```diff
+ POST localhost:3000/contact/import
```

| Body | Tipo     | Descrição          | Obrigatorio |
| :--- | :------- | :----------------- | :---------- |
| `id` | Raw text | `csv com contatos` | `true`      |

#

#### export um csv de contatos

```diff
+ GET localhost:3000/contact/export
```

#
