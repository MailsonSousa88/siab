# DataSources

## Propósito

Um DataSource é responsável por guardar ou recuperar dados. Ele isola a origem
dos dados para que as demais partes da aplicação não precisem conhecer detalhes
de persistência ou comunicação.

A pergunta principal para classificar uma classe é:

> A responsabilidade principal desta classe é guardar ou recuperar dados?

Se a resposta for sim, a classe é um DataSource.

## Fontes possíveis

Um DataSource pode acessar fontes locais ou remotas, por exemplo:

- memória;
- AsyncStorage;
- SQLite;
- arquivos;
- APIs REST;
- Firestore;
- Supabase.

A tecnologia utilizada não altera a responsabilidade arquitetural.

## Estrutura física do SIAB

O conceito arquitetural e o nome da pasta não são iguais:

| Conceito arquitetural | Estrutura física |
| --- | --- |
| DataSource | `src/model/repositories/` |

O nome `repositories` é apenas a organização física adotada pelo projeto. Ele
não significa que o SIAB implemente automaticamente o padrão Repository
clássico. As classes dessa pasta são DataSources do MVVM Simplificado.

## Responsabilidades

Um DataSource é responsável por:

- ler dados de uma fonte;
- gravar, atualizar ou remover dados quando necessário;
- converter respostas da fonte para contratos conhecidos pelo Model;
- encapsular detalhes de conexão, consulta e persistência;
- representar falhas de acesso a dados de maneira tratável.

## Limites

Um DataSource não deve:

- renderizar componentes;
- controlar navegação;
- manter estado visual;
- importar Views ou ViewModels;
- decidir como mensagens serão apresentadas ao usuário;
- concentrar funcionalidades cujo objetivo principal não seja acesso a dados.

## Relação com Services

Um Service pode utilizar um DataSource para executar uma funcionalidade. O
DataSource continua responsável apenas pelo acesso aos dados.

```text
Service
  ↓ solicita dados
DataSource
  ↓ acessa
Fonte local ou remota
```

Por exemplo, autenticar é uma funcionalidade; procurar um usuário por e-mail é
acesso a dados. A primeira responsabilidade pertence ao Service, e a segunda ao
DataSource.

## Exemplo no SIAB

[`UserDataSource`](../../../src/model/repositories/userDataSource.ts) mantém
temporariamente uma coleção de usuários em memória e oferece operações para:

- listar usuários;
- procurar um usuário por e-mail.

O atraso artificial simula uma fonte assíncrona. Quando a memória for
substituída por armazenamento local ou uma API, os detalhes da nova fonte devem
continuar isolados no DataSource.

## Critério de decisão

```text
Guardar ou recuperar dados
             ↓
         DataSource
```

Uma classe não se torna Service apenas porque acessa algo externo. Se sua
responsabilidade principal é persistência ou consulta, ela é um DataSource.

## Referências internas

- [Responsabilidades do Model](./responsibilities.md)
- [Entidades](./entities.md)
- [Services](./services.md)
- [Regras do projeto](../../../RULES.md)
