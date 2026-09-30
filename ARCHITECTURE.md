# Arquitetura do SIAB

Este documento é o mapa arquitetural do SIAB. Seu objetivo é permitir que uma
pessoa entenda rapidamente como o sistema está organizado, onde cada tipo de
código deve ficar e como as partes se relacionam.

Explicações extensas, decisões e diagramas específicos devem ser mantidos em
[`docs/01-architecture/`](./docs/01-architecture/README.md). As regras
obrigatórias de implementação ficam em [RULES.md](./RULES.md).

## Visão geral

O SIAB é uma aplicação Expo/React Native organizada com uma versão simplificada
do padrão **MVVM — Model, View, ViewModel**. O Expo Router forma uma camada fina
de entrada para as telas.

O fluxo principal de dependências é:

```text
app → view → viewmodel → model
```

As dependências apontam para as camadas mais internas. O `model` não conhece a
interface, as rotas ou o React Native.

## Camadas

| Camada | Responsabilidade | Não deve conter |
| --- | --- | --- |
| `app` | Declarar rotas, layouts e navegadores do Expo Router | Regras de negócio ou telas completas |
| `view` | Renderizar telas e componentes, receber entradas e exibir estados | Persistência, acesso direto a serviços ou fluxo da aplicação |
| `viewmodel` | Manter estado, expor ações e coordenar navegação e casos de uso | Detalhes visuais ou de persistência |
| `model/entities` | Representar entidades e tipos do domínio | Dependências de interface ou infraestrutura |
| `model/services` | Encapsular funcionalidades e regras específicas | Componentes, estilos ou estado visual |
| `model/repositories` | Implementar fontes de dados, persistência e operações de CRUD | Decisões de apresentação ou navegação |

## Estrutura do código

```text
src/
├── app/
│   ├── _layout.tsx              # Navegador raiz
│   ├── index.tsx                # Rota inicial: login
│   └── home.tsx                 # Rota da página inicial
├── view/
│   └── screens/                 # Implementação visual das telas
├── viewmodel/
│   └── useLoginViewModel.ts     # Estado e ações do login
└── model/
    ├── entities/                # Tipos do domínio
    ├── services/                # Funcionalidades e regras específicas
    └── repositories/            # Fontes de dados e persistência
```

Arquivos de imagem, ícones e demais recursos estáticos ficam em `assets/`. As
configurações do Expo ficam em `app.json`, e as dependências e scripts do
projeto ficam em `package.json`.

## Responsabilidades e dependências

### Rotas (`src/app`)

Os arquivos de rota existem para conectar URLs ou caminhos de navegação às
telas. Em geral, cada rota apenas importa e reexporta uma tela de `view`.
Arquivos especiais do Expo Router, como `_layout.tsx`, podem configurar o
navegador, cabeçalhos e opções compartilhadas.

### Views (`src/view`)

Views são responsáveis pela interface e pela interação direta com o usuário.
Elas consomem o estado da ViewModel e disparam suas ações. Uma View não deve
importar DataSources, acessar APIs, consultar bancos de dados ou implementar
regras de negócio.

### ViewModels (`src/viewmodel`)

ViewModels são implementadas como Custom Hooks e expõem o contrato:

```ts
const [state, actions] = useExampleViewModel();
```

`state` reúne os dados necessários para renderizar a tela. `actions` reúne as
operações que a View pode solicitar. A ViewModel valida entradas, coordena
Services e DataSources e controla o fluxo de navegação.

### Model (`src/model`)

O Model concentra dados e comportamento que não dependem da interface:

- **Entities** definem os tipos puros do domínio;
- **Services** implementam funcionalidades específicas, como autenticação;
- **Repositories/DataSources** isolam a origem e a persistência dos dados.

Essa separação permite trocar uma fonte de dados em memória por armazenamento
local ou por uma API sem levar detalhes de infraestrutura para as telas.

## Fluxo atual de autenticação

O login existente demonstra o fluxo completo entre as camadas:

1. o Expo Router resolve `/` por meio de `src/app/index.tsx`;
2. a rota apresenta a tela de login localizada em `src/view/screens/login.tsx`;
3. a View consome estado e ações de `useLoginViewModel`;
4. a ViewModel valida e-mail e PIN e solicita a autenticação ao Service;
5. o Service consulta o `UserDataSource` e valida as credenciais;
6. o resultado retorna à ViewModel, que atualiza o estado da tela;
7. em caso de sucesso, a ViewModel substitui a rota atual por `/home`.

Atualmente, os usuários são mantidos em memória e a espera do DataSource apenas
simula uma operação assíncrona. Essa implementação é didática e não representa
uma autenticação segura ou persistente.

## Estado, navegação e dados

- O estado de cada tela pertence à sua ViewModel.
- A navegação é feita exclusivamente com Expo Router.
- Decisões de navegação decorrentes de uma ação pertencem à ViewModel.
- Dados persistentes devem ser acessados por DataSources.
- Services podem usar DataSources, mas não conhecem Views.
- Dados de demonstração não devem ser tratados como dados de produção.

## Convenções estruturais

- O TypeScript permanece em modo estrito.
- Imports internos usam o alias `@/`, que aponta para `src/`.
- Arquivos com JSX usam `.tsx`; os demais usam `.ts`.
- Componentes ficam fora de `src/app`.
- Entidades permanecem independentes de Expo, React e React Native.
- Novas camadas só devem ser criadas quando houver uma responsabilidade real
  que não se encaixe na estrutura existente.
- Diretórios nativos gerados (`ios/` e `android/`) não são editados manualmente;
  configurações nativas pertencem ao `app.json` e a config plugins.

## Documentação detalhada

A documentação detalhada está organizada em
[`docs/01-architecture/`](./docs/01-architecture/README.md):

- [responsabilidades da View](./docs/01-architecture/view/responsibilities.md);
- [responsabilidades da ViewModel](./docs/01-architecture/viewmodel/responsibilities.md);
- [responsabilidades do Model](./docs/01-architecture/model/responsibilities.md);
- [entidades](./docs/01-architecture/model/entities.md);
- [DataSources](./docs/01-architecture/model/data-sources.md);
- [Services](./docs/01-architecture/model/services.md).

Novos arquivos devem explicar detalhes relevantes; o `ARCHITECTURE.md` deve
permanecer como uma visão geral curta e atualizada, apontando para eles quando
existirem.

## Como evoluir a arquitetura

Antes de adicionar uma funcionalidade, classifique cada parte pela sua
responsabilidade:

```text
Rota                         → app
Interface                    → view
Estado, ações e fluxo        → viewmodel
Entidade do domínio          → model/entities
Persistência e CRUD          → model/repositories
Funcionalidade específica    → model/services
```

Se uma mudança alterar os limites entre camadas, o fluxo de dados, a estratégia
de navegação ou a persistência, este mapa e a documentação detalhada relacionada
devem ser atualizados no mesmo trabalho.
