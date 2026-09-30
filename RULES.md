# Regras do projeto

Este documento define as regras concretas de desenvolvimento e organização do
SIAB. A visão geral das camadas e do fluxo do sistema está disponível em
[ARCHITECTURE.md](./ARCHITECTURE.md).

## Projeto

- A stack obrigatória é React Native, TypeScript, Expo e Expo Router.
- A arquitetura obrigatória é o MVVM simplificado adotado pelo projeto.
- O TypeScript deve ser utilizado em todo o código da aplicação.
- Arquivos com JSX usam a extensão `.tsx`; arquivos sem JSX usam `.ts`.
- Novas camadas ou padrões arquiteturais só devem ser introduzidos quando
  houver uma responsabilidade real que não seja atendida pela estrutura atual.
- O projeto tem finalidade acadêmica e deve favorecer soluções claras,
  didáticas e compatíveis com sua evolução durante as aulas de PDM.

## Idioma

- A documentação do projeto deve ser escrita em português brasileiro (`pt-BR`).
- Textos apresentados ao usuário também devem ser escritos em `pt-BR`.
- Comandos, nomes de bibliotecas, APIs e identificadores de código conservam a
  grafia técnica original quando a tradução prejudicar a precisão.
- Termos estrangeiros necessários devem ser explicados em português na primeira
  ocorrência quando não forem de conhecimento comum no contexto do projeto.

## Arquitetura

O fluxo de dependências do projeto é:

```text
app → view → viewmodel → model
```

Cada diretório possui uma responsabilidade definida:

- `app/`: rotas, layouts e navegadores do Expo Router;
- `view/`: telas, componentes reutilizáveis e recursos exclusivamente visuais;
- `viewmodel/`: estado, ações, fluxo da aplicação e navegação;
- `model/entities/`: entidades e tipos puros do domínio;
- `model/repositories/`: fontes de dados, persistência e operações de CRUD;
- `model/services/`: regras e funcionalidades específicas, locais ou externas.

As dependências devem respeitar essa direção. Camadas internas não podem
conhecer Views, ViewModels ou detalhes de apresentação.

## MVVM

- ViewModels são Hooks Personalizados e seguem o contrato `[Estado, Ações]`.
- A View consome o estado e dispara ações expostas pela ViewModel.
- Regras de negócio e fluxo da aplicação não devem ser implementados
  diretamente na View.
- Navegação e tratamento de parâmetros de rota pertencem à ViewModel.
- Views não acessam Services, DataSources, bancos de dados ou APIs diretamente.
- Somente DataSources conhecem os detalhes da persistência.
- Services encapsulam funcionalidades específicas, como autenticação,
  notificações ou integrações externas.
- O Model deve permanecer independente de React Native e da interface.

## Rotas

- `src/app/` contém apenas arquivos relacionados ao Expo Router.
- Uma rota comum deve apenas importar e reexportar sua tela de `view/`.
- Arquivos especiais, como `_layout.tsx`, podem configurar navegadores e opções
  compartilhadas.
- Rotas usam nomes em letras minúsculas ou `camelCase`, nunca `PascalCase`.
- A navegação deve utilizar as operações adequadas do Expo Router, como `push`,
  `back`, `replace` e `dismiss`.
- Quando o usuário não puder retornar à tela anterior após uma ação, deve-se
  utilizar `replace` ou uma operação equivalente.
- Componentes, Hooks e utilitários que não representam rotas ficam fora de
  `src/app/`.

## Componentes

- Componentes `.tsx` fora de `app/` usam nomes em `PascalCase`.
- Componentes de tela utilizam exportação padrão.
- Componentes reutilizáveis utilizam exportações nomeadas.
- Elementos visuais reutilizáveis devem ser desacoplados das telas.
- Propriedades de componentes devem ser declaradas com `type`.
- A renderização não deve executar acesso a dados ou provocar alterações no
  domínio.
- Listas devem utilizar chaves estáveis e renderizações desnecessárias devem ser
  evitadas.

## Nomenclatura

Os nomes devem indicar a responsabilidade do elemento. Exemplos:

- componente: `UsuarioCard.tsx`;
- propriedades: `UsuarioCardProps`;
- ViewModel: `useUsuarioViewModel.ts`;
- estado: `UsuarioState`;
- ações: `UsuarioActions`;
- entidade: `Usuario`;
- fonte de dados: `UsuarioDataSource`;
- serviço: `AuthService`.

## Estilos

- Estilos devem ser criados com `StyleSheet.create(...)`.
- O objeto de estilos segue o formato `<nomeRelativo>Styles`.
- Nomes genéricos, como apenas `styles`, devem ser evitados.
- A interface deve priorizar dispositivos móveis sem comprometer a
  compatibilidade entre Android, iOS e web.
- Componentes devem considerar áreas seguras, acessibilidade e diferentes
  tamanhos de tela.

Exemplos de nomes adequados: `usuarioCardStyles` e `homeStyles`.

## TypeScript

- O modo estrito deve permanecer habilitado.
- Propriedades, estados, ações, entidades e contratos relevantes devem ser
  tipados explicitamente.
- O tipo `any` não deve ser utilizado.
- Para valores desconhecidos, deve-se preferir `unknown` acompanhado da
  verificação necessária.
- Entidades devem ser tipos puros e independentes de Expo, React e React Native.
- Não se deve utilizar conversões inseguras apenas para ocultar erros de
  modelagem.

## Dados e segurança

- Views nunca devem importar diretamente tecnologias de persistência.
- Credenciais, chaves e segredos não podem ser incluídos no código-fonte nem em
  configurações acessíveis pelo cliente.
- Dados locais de demonstração não devem ser tratados como dados de produção.
- Autenticação simulada deve permanecer claramente identificada como recurso
  didático até ser substituída por uma implementação segura.
- Erros apresentados ao usuário devem ser claros e escritos em `pt-BR`, sem
  revelar detalhes internos ou informações sensíveis.

## Dependências e configuração

- Antes de usar uma API do Expo, EAS ou React Native, deve-se consultar a
  documentação correspondente à versão instalada no projeto.
- Pacotes compatíveis com o Expo devem ser instalados com
  `npx expo install <pacote>`.
- Módulos recomendados pelo Expo têm preferência sobre bibliotecas de terceiros.
- Uma dependência só deve ser adicionada quando a plataforma e o código existente
  não atenderem adequadamente à necessidade.
- Diretórios nativos gerados, como `ios/` e `android/`, não devem ser criados ou
  editados manualmente.
- Comportamentos nativos devem ser configurados em `app.json` e por meio de
  plugins de configuração.

## Validação

- Executar `npx expo lint` antes de concluir alterações.
- Executar `npx tsc --noEmit` antes de concluir alterações.
- Executar testes específicos quando uma regra de domínio for modificada.
- Executar `npx expo-doctor` após mudanças em dependências ou na configuração do
  Expo.
- Validar fluxos de sucesso, carregamento e erro nas funcionalidades alteradas.
- Atualizar a documentação junto com mudanças de arquitetura ou comportamento.

## Princípio central

Antes de implementar ou mover um código, sua responsabilidade deve ser
classificada:

```text
Rota                         → app
Interface                    → view
Estado, ações e fluxo        → viewmodel
Entidade do domínio          → model/entities
Persistência e CRUD          → model/repositories
Funcionalidade específica    → model/services
```

Essa separação deve ser preservada ao criar, editar ou refatorar o sistema.
