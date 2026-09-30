# Responsabilidades do Model

## Propósito

O Model representa os conceitos, dados e comportamentos da aplicação que não
dependem da interface. Ele fornece à ViewModel as operações e os resultados
necessários para conduzir o fluxo da tela.

## Model no MVVM Simplificado

No SIAB, `Model` é utilizado em sentido amplo:

```text
Model
├── Entities
├── DataSources
└── Services
```

Essa composição é uma simplificação didática adotada pelo projeto. Em outras
formulações arquiteturais, persistência, casos de uso e infraestrutura podem
ser camadas separadas. Essas formulações não devem ser introduzidas no SIAB sem
uma necessidade concreta e uma decisão arquitetural explícita.

## Partes do Model

### Entities

Representam conceitos do domínio e os dados associados a eles. Devem ser puras
e independentes de interface e infraestrutura.

Consulte [Entidades](./entities.md).

### DataSources

Guardam ou recuperam dados em fontes locais ou remotas. Isolam detalhes como
memória, armazenamento local, arquivos, bancos de dados e APIs.

No SIAB, ficam fisicamente em `src/model/repositories/`.

Consulte [DataSources](./data-sources.md).

### Services

Executam funcionalidades específicas, como autenticação, processamento ou uma
integração externa cujo objetivo principal não seja apenas armazenar e
recuperar dados.

Consulte [Services](./services.md).

## Responsabilidades

O Model é responsável por:

- representar os conceitos do domínio;
- definir contratos de dados independentes da interface;
- acessar fontes de dados por meio de DataSources;
- executar funcionalidades específicas por meio de Services;
- validar regras que não pertencem exclusivamente à apresentação;
- retornar resultados para que a ViewModel atualize o estado.

## Limites

O Model não é responsável por:

- renderizar JSX;
- definir estilos ou componentes;
- acessar a View ou a ViewModel;
- decidir como um resultado será apresentado;
- controlar a navegação;
- ler parâmetros de rota;
- manter estados estritamente visuais.

## Independência

Entities e regras puras devem poder ser utilizadas e testadas sem inicializar o
React Native. DataSources e Services podem depender de bibliotecas necessárias
à sua função, mas não podem importar componentes, telas ou ViewModels.

## Exemplo atual

O Model do login é composto por:

- [`User`](../../../src/model/entities/user.ts), entidade que representa o
  usuário;
- [`UserDataSource`](../../../src/model/repositories/userDataSource.ts), que
  recupera usuários de uma coleção em memória;
- [`authService.ts`](../../../src/model/services/authService.ts), que executa a
  autenticação usando o DataSource.

A ViewModel coordena essas partes, mas a validação das credenciais e a origem
dos usuários não pertencem à View.

## Critério de decisão

Ao classificar um código dentro do Model:

```text
Representa um conceito do domínio?          → Entity
Guarda ou recupera dados?                   → DataSource
Executa uma funcionalidade específica?      → Service
```

A responsabilidade principal, e não apenas a tecnologia utilizada, determina a
classificação.

## Referências internas

- [Regras do projeto](../../../RULES.md)
- [Mapa arquitetural](../../../ARCHITECTURE.md)
- [Visão geral da arquitetura detalhada](../README.md)
- [Responsabilidades da ViewModel](../viewmodel/responsibilities.md)
