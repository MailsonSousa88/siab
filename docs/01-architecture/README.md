# Arquitetura detalhada do SIAB

Este diretório documenta em detalhes a arquitetura do SIAB. O mapa resumido e
de fácil acesso permanece em [ARCHITECTURE.md](../../ARCHITECTURE.md), na raiz
do repositório.

## Fontes e precedência

Esta documentação combina três fontes:

1. [RULES.md](../../RULES.md), que define as regras obrigatórias e as adaptações
   específicas do SIAB;
2. a síntese fornecida nesta tarefa sobre a fundamentação estudada em PDM para
   o MVVM Simplificado;
3. o código atual, usado para demonstrar como as regras são aplicadas.

Em caso de divergência, `RULES.md` tem prioridade. Essa precedência impede que o
MVVM Simplificado adotado pelo projeto seja misturado com variações mais
complexas que introduzem outras camadas, casos de uso ou inversão de
dependências.

## Padrão arquitetural

O SIAB utiliza **MVVM Simplificado**:

- **View** apresenta dados e recebe interações;
- **ViewModel** mantém o estado da tela e coordena suas ações;
- **Model** representa o domínio, o acesso a dados e funcionalidades específicas.

O Expo Router funciona como uma camada fina de entrada. Por isso, `app` aparece
no fluxo de dependências, mas não substitui nenhuma das três partes do MVVM.

## Camadas

| Camada | Localização | Responsabilidade principal |
| --- | --- | --- |
| Rotas | `src/app/` | Associar caminhos do Expo Router às Views |
| View | `src/view/` | Renderizar a interface e encaminhar interações |
| ViewModel | `src/viewmodel/` | Manter estado, expor ações e controlar o fluxo |
| Model | `src/model/` | Representar domínio, dados e funcionalidades |

## Fluxo de dependências

```text
app → view → viewmodel → model
```

Esse fluxo é unidirecional. São proibidas dependências reversas ou atalhos que
quebrem as fronteiras, como:

```text
model → view
model → viewmodel
view → DataSource
view → Service
```

Uma camada pode conhecer a camada seguinte quando necessário, mas não deve
transferir para ela uma responsabilidade que lhe pertence.

## Fluxo de dados

```text
View
  ↓ ações
ViewModel
  ↓ solicitações
Model
  ↓ resultados
ViewModel
  ↓ estado
View
```

O usuário interage com a View. A View dispara uma ação exposta pela ViewModel,
que coordena as partes necessárias do Model. Ao receber o resultado, a
ViewModel atualiza seu estado, e a View renderiza novamente a interface.

## Model em sentido amplo

Neste projeto, `Model` é usado no sentido amplo e didático do MVVM
Simplificado:

```text
Model
├── Entities
├── DataSources
└── Services
```

Outras arquiteturas podem separar essas responsabilidades em camadas próprias.
O SIAB não faz essa separação: as três pertencem ao Model, sem introduzir
camadas adicionais sem uma necessidade real e uma decisão documentada.

## Princípios arquiteturais

- Cada código deve ser classificado por sua responsabilidade.
- A View apenas apresenta estado e encaminha ações.
- A ViewModel intermedeia a comunicação entre View e Model.
- O Model não depende da interface, de rotas ou de React Native.
- A origem dos dados fica isolada em DataSources.
- Funcionalidades específicas ficam encapsuladas em Services.
- Navegação e parâmetros de rota pertencem à ViewModel.
- Entidades permanecem puras.
- A estrutura deve ser a menor capaz de representar corretamente o sistema.
- Documentação e implementação devem evoluir juntas.

## Exemplo atual: autenticação

O fluxo de autenticação existente percorre todas as camadas:

1. [`src/app/index.tsx`](../../src/app/index.tsx) associa a rota `/` à tela de
   login;
2. [`login.tsx`](../../src/view/screens/login.tsx) renderiza o formulário,
   consome o estado e dispara ações;
3. [`useLoginViewModel.ts`](../../src/viewmodel/useLoginViewModel.ts) valida a
   entrada, coordena a autenticação e controla a navegação;
4. [`authService.ts`](../../src/model/services/authService.ts) executa a
   funcionalidade de autenticação;
5. [`userDataSource.ts`](../../src/model/repositories/userDataSource.ts) recupera
   o usuário da fonte de dados em memória;
6. [`user.ts`](../../src/model/entities/user.ts) define a entidade utilizada no
   fluxo.

## Documentos desta seção

### View

- [Responsabilidades da View](./view/responsibilities.md)

### ViewModel

- [Responsabilidades da ViewModel](./viewmodel/responsibilities.md)

### Model

- [Responsabilidades do Model](./model/responsibilities.md)
- [Entidades](./model/entities.md)
- [DataSources](./model/data-sources.md)
- [Services](./model/services.md)

Novos documentos, como os dedicados a componentes, estado e ações ou
navegação, só devem ser criados quando houver conteúdo suficiente para
documentá-los sem repetição ou arquivos vazios.
