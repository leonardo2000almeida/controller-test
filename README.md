
<h1 align="center">
List of contacts API
</h1>
Essa API usa uma arquitetura DDD, onde irá ter regras de negócios, validações para requisições, integrações com o banco de dados Postgres usando ORM.

O banco de dados é rodado localmente através de sua máquina, sendo apenas necessário usar suas credenciais.

O servidor por padrão escuta na porta 3000

## Entenda a organização de pastas:
```
- Regras de negocio: src/application
- Schema, entidades: src/domain
- Servidor, orm, redis: src/infrastructure
- Adaptadores para rotas: src/interface
```

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

## Rotas da api
#### Retorna um contato

```http
  GET localhost:3000/contact/:id
```

| Param | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `id`      |   `string`   |     `id do contato desjeado`     |        `true`     |

#
#### Criar um contato

```http
  POST localhost:3000/contact
```


| Body | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `name`      |   `string`   |     `nome completo`     |        `true`     |
|    `email`      |   `string`   |     `email do usuário`     |        `true`     |
|    `phone`      |   `string`   |     `celular do usuário`     |        `true`     |
|    `type`      |   `string`   |     `PF OU PJ`     |        `true`     |
|    `cpfCnpj`      |   `string`   |     `PF = CPF, PJ = CNPJ`     |        `true`     |
|    `address`      |   `objeto`   |     `{ zipcode, street, number, complement (não obrigatorio), district, city, state }`     |        `true`     |

#
#### Atualiza um contato, menos o status

```http
  PUT localhost:3000/contact/:id
```

| Param | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `id`      |   `string`   |     `id do contato`     |        `true`     |


| Body | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `name`      |   `string`   |     `nome completo`     |        `false`     |
|    `email`      |   `string`   |     `email do usuário`     |        `false`     |
|    `phone`      |   `string`   |     `celular do usuário`     |        `false`     |
|    `type`      |   `string`   |     `PF OU PJ`     |        `false`     |
|    `cpfCnpj`      |   `string`   |     `PF = CPF, PJ = CNPJ`     |        `false`     |
|    `address`      |   `objeto`   |     `{ zipcode, street, number, complement (não obrigatorio), district, city, state }`     |  `false` |

#

#### Ativa um contato

```http
  PUT localhost:3000/contact/:id/active
```

| Param | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `id`      |   `string`   |     `id do contato`     |        `true`     |

#

#### Desativa um contato

```http
  DEL localhost:3000/contact/:id
```

| Param | Tipo | Descrição | Obrigatorio |
| :-------- | :--- | :-------- | :---------- | 
|    `id`      |   `string`   |     `id do contato`     |        `true`     |

#

