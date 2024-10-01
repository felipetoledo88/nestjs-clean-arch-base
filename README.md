- Para ver esse arquivo formatado, ctrl + shift + v

## Padrões de projeto

- Projeto feito com base em Clean Archtecture e DDD;
- Dentro de src, os módulos, divididos em infrastructure, application e domain;
- Dentro de src, junto com os módulos, o diretório shared, contendo itens comuns a toda a aplicação, também dividido em infrastructure, application e domain;

## Documentação

/api/docs

## Recursos do projeto

- Autenticação com token JWT
- Criação, atualização e exclusão de usuário
- Configurações de swagger, typeorm, conexão com o banco de dados, erros customizados, exception filters, validações

## Configurar o projeto

- Criar um arquivo chamado `.env.development` na raíz do projeto
- Passar todas as variáveis de ambiente que estão em `.env.example` para o arquivo e colocar seus valores
- Na variável NODE_ENV colocar 'development' se for local. Caso for subir para prod, colocar 'production'

- Instalar as dependências

```
  npm i
```

## Rodar o projeto

```
  npm run dev
```
