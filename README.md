# SIAB

> Aplicativo acadêmico para aprendizado e aplicação prática dos conceitos de
> Programação para Dispositivos Móveis (PDM).

O **SIAB** é um aplicativo mobile de gerenciamento de biblioteca desenvolvido
com Expo e React Native. O projeto foi criado para evoluir ao longo das aulas
de **PDM — Programação para Dispositivos Móveis**, transformando os conteúdos
estudados em uma aplicação organizada, multiplataforma e próxima de um cenário
real.

O sistema tem finalidade exclusivamente educacional: não possui fins
comerciais e não pretende substituir plataformas profissionais de gestão de
bibliotecas.

## Sobre o projeto

A proposta do SIAB é centralizar, de forma simples, experiências comuns a um
sistema de biblioteca — como autenticação, consulta do acervo, empréstimos e
gestão de usuários — enquanto serve como laboratório para praticar conceitos
de desenvolvimento mobile.

O projeto está em desenvolvimento contínuo. No estado atual, possui:

- interface de login responsiva;
- validação de e-mail e PIN;
- autenticação simulada com dados locais;
- feedback visual de carregamento e mensagens de erro;
- navegação baseada em arquivos com Expo Router;
- organização inicial em camadas inspirada em MVVM.

## Objetivos de aprendizagem

- desenvolver interfaces mobile com componentes nativos;
- trabalhar navegação e fluxo entre telas;
- gerenciar estado e regras de apresentação com hooks;
- separar interface, lógica de negócio e acesso a dados;
- aplicar tipagem estática com TypeScript;
- exercitar boas práticas de organização, manutenção e evolução de software;
- preparar uma base compatível com Android, iOS e web.

## Tecnologias

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [React Native 0.86](https://reactnative.dev/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://docs.expo.dev/router/introduction/) para rotas e navegação
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/) para os ícones da interface

## Arquitetura e organização

A aplicação adota uma separação inspirada no padrão **MVVM
(Model–View–ViewModel)**:

```text
src/
├── app/                    # Rotas e layouts do Expo Router
├── model/
│   ├── entities/           # Entidades e tipos do domínio
│   ├── repositories/       # Fontes de dados
│   └── services/           # Regras de negócio
├── view/
│   └── screens/            # Componentes visuais das telas
└── viewmodel/              # Estado e ações consumidos pelas views
```

As rotas ficam exclusivamente em `src/app`. As telas delegam estado e ações às
ViewModels, enquanto serviços e repositórios concentram regras de negócio e
acesso a dados.

## Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) 22.13 ou superior;
- npm, distribuído com o Node.js;
- [Expo Go](https://expo.dev/go) em um dispositivo compatível ou um ambiente de
  execução para Android, iOS ou web.

## Como executar

Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd siab
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

No terminal do Expo, escolha a plataforma desejada ou leia o QR Code com um
dispositivo compatível. Também é possível iniciar diretamente cada destino:

```bash
npm run android
npm run ios
npm run web
```

> A execução do simulador iOS requer macOS. Em outros sistemas operacionais,
> utilize um dispositivo físico, Android ou a versão web.

## Comandos úteis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Abre o projeto no Android |
| `npm run ios` | Abre o projeto no simulador iOS |
| `npm run web` | Abre a aplicação no navegador |
| `npm run lint` | Executa a análise estática do código |
| `npx tsc --noEmit` | Verifica os tipos sem gerar arquivos |
| `npx expo-doctor` | Diagnostica configuração e dependências do projeto |

Para adicionar pacotes do ecossistema Expo, utilize `npx expo install
<pacote>`. Esse comando seleciona uma versão compatível com o SDK usado pelo
projeto.

## Estado atual e próximos passos

O SIAB ainda está em uma fase inicial. A autenticação utiliza um repositório em
memória e um atraso artificial para simular uma operação assíncrona; portanto,
ela não deve ser tratada como um mecanismo de segurança real.

Possíveis evoluções do projeto incluem:

- implementação da tela inicial;
- catálogo e pesquisa de livros;
- detalhes e disponibilidade de exemplares;
- fluxo de empréstimos, devoluções e reservas;
- histórico do usuário;
- persistência local e integração com uma API;
- testes automatizados e melhorias de acessibilidade.

Esses itens representam a direção pretendida para o aprendizado e podem mudar
conforme o projeto evoluir.

## Aviso

Este projeto é uma iniciativa acadêmica, sem vínculo oficial com bibliotecas,
instituições ou sistemas comerciais. Dados, usuários e fluxos presentes na
aplicação podem ser fictícios e utilizados apenas para demonstração.

## Licença

Consulte o arquivo [LICENSE](./LICENSE) para conhecer os termos aplicáveis ao
repositório.
