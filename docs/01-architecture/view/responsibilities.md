# Responsabilidades da View

## Propósito

A View é a camada responsável pela apresentação da aplicação. Ela representa
as telas e os componentes visuais com os quais o usuário interage.

No SIAB, as Views ficam em `src/view/`. Telas completas ficam em
`src/view/screens/`, enquanto componentes reutilizáveis devem permanecer fora
de `src/app/` e ser organizados conforme sua função visual.

## Responsabilidades

A View é responsável por:

- renderizar a interface;
- consumir o estado fornecido pela ViewModel;
- disparar ações fornecidas pela ViewModel;
- receber entradas do usuário e encaminhá-las pelas ações;
- compor componentes visuais;
- apresentar carregamento, sucesso, estado vazio e erro;
- aplicar estilos e comportamentos de acessibilidade;
- manter apenas estados estritamente visuais e locais.

Estados estritamente visuais são aqueles que não alteram regras ou fluxo da
aplicação, como a abertura de uma seção puramente decorativa ou o estado de uma
animação local. Dados de formulário, carregamento e erros que participam do
fluxo da tela pertencem à ViewModel.

## Limites

A View não é responsável por:

- persistência;
- acesso direto a DataSources;
- acesso direto a Services;
- chamadas diretas a bancos de dados ou APIs;
- regras de negócio;
- decisões de navegação;
- leitura ou tratamento de parâmetros de rota;
- criação de entidades como efeito de uma regra do domínio.

Esses limites evitam que a interface fique acoplada à origem dos dados ou ao
fluxo da aplicação.

## Dependências permitidas

Uma View pode depender de:

- sua ViewModel;
- componentes visuais reutilizáveis;
- recursos estáticos;
- APIs de apresentação do React e do React Native;
- módulos do Expo usados exclusivamente para apresentação.

Uma View não pode importar módulos de `model/repositories` ou
`model/services`. O acesso ao Model acontece por intermédio da ViewModel.

## Relação com as rotas

Uma View não é uma rota. Os arquivos de `src/app/` conectam o Expo Router às
telas de `src/view/screens/`. Essa separação permite reorganizar a navegação sem
transformar a tela em um arquivo responsável por duas camadas.

Exemplo atual:

```ts
// src/app/index.tsx
import Login from "@/view/screens/login";

export default Login;
```

## Relação com estado e ações

A View obtém da ViewModel tudo o que precisa para representar e operar seu
fluxo:

```ts
const [loginState, loginActions] = useLoginViewModel();
```

- `loginState` é somente lido durante a renderização;
- `loginActions` recebe as intenções do usuário;
- a View não precisa conhecer como uma ação será executada.

## Exemplo no SIAB

A tela [`src/view/screens/login.tsx`](../../../src/view/screens/login.tsx):

- exibe os campos de e-mail e PIN;
- lê `email`, `pin`, `loading` e `error` do estado;
- chama `alterarEmail`, `alterarPin` e `entrar` em resposta às interações;
- troca o conteúdo do botão por um indicador de carregamento;
- apresenta mensagens de erro recebidas da ViewModel.

Ela não procura usuários, não valida credenciais e não decide a rota após o
login. Essas responsabilidades permanecem fora da View.

## Critério de decisão

Antes de adicionar uma lógica à View, pergunte:

> Esta lógica existe somente para apresentar algo ou captar uma interação?

Se a resposta for não, a lógica provavelmente pertence à ViewModel ou ao
Model.

## Referências internas

- [Regras do projeto](../../../RULES.md)
- [Mapa arquitetural](../../../ARCHITECTURE.md)
- [Visão geral da arquitetura detalhada](../README.md)
- [Responsabilidades da ViewModel](../viewmodel/responsibilities.md)
