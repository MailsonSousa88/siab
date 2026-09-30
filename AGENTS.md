Este é um aplicativo móvel desenvolvido com Expo e React Native. Priorize
padrões voltados a dispositivos móveis, desempenho e compatibilidade entre
plataformas.

## Idioma da documentação

- Toda a documentação deste projeto deve ser escrita e mantida em português
  brasileiro (`pt-BR`).
- Essa regra inclui arquivos Markdown da raiz, documentos em `docs/`, registros
  de decisões arquiteturais, guias e instruções para desenvolvimento.
- Comandos, APIs, nomes de bibliotecas e identificadores de código devem manter
  sua grafia técnica original quando necessário.
- Textos exibidos pela aplicação ao usuário também devem utilizar `pt-BR`.

## O Expo muda constantemente — não confie nos dados de treinamento

O Expo pode introduzir mudanças incompatíveis a cada versão do SDK. APIs
lembradas pelo modelo podem ter sido renomeadas, movidas ou removidas. Antes de
escrever qualquer código que utilize uma API do Expo, EAS ou React Native:

1. leia a versão principal do pacote `expo` em `package.json`;
2. consulte a documentação correspondente em
   `https://docs.expo.dev/versions/v<versão-principal>.0.0/`;
3. para qualquer outro assunto, consulte `https://docs.expo.dev/llms.txt`, que
   indexa a documentação e corrige equívocos comuns de modelos de linguagem.
   Siga os links para a página específica necessária e não responda apenas com
   base na memória.

## Comandos

Use `bunx` no lugar de `npx` se o projeto utilizar Bun, identificado pela
presença do arquivo `bun.lock`.

```bash
npx expo install <pacote>  # Instala uma versão compatível com o SDK do Expo
npx expo start             # Inicia o servidor de desenvolvimento
npx expo lint              # Executa a análise estática
npx tsc --noEmit           # Verifica os tipos sem gerar arquivos
npx expo-doctor            # Diagnostica dependências e configurações
npx expo install --fix     # Corrige versões incompatíveis dos pacotes
```

Execute a análise estática e a verificação de tipos antes de declarar qualquer
tarefa concluída.

## Navegação e rotas

- Use o **Expo Router** para toda a navegação.
- As rotas ficam em `src/app/`; cada arquivo comum desse diretório representa
  uma rota, e arquivos `_layout.tsx` definem navegadores.
- Mantenha componentes, Hooks e utilitários que não sejam rotas fora de
  `src/app/`.
- Importe `Link`, `router` e `useLocalSearchParams` de `expo-router`.
- Consulte `https://docs.expo.dev/router/introduction.md`.

## Compilações com EAS

Use o EAS para compilar, assinar e enviar o aplicativo pela nuvem (`eas build` e
`eas submit`) e para distribuir atualizações remotas (`eas update`). Não é
necessário manter projetos locais no Xcode ou Android Studio para essas tarefas.

Em projetos com Bun, execute `bunx eas-cli <comando>`. Nos demais, execute
`npx eas-cli@latest <comando>`. Use essas formas no lugar do comando global
`eas` mostrado em exemplos da documentação.

Consulte `https://docs.expo.dev/eas/index.md`.

## Regras

- Se os diretórios `ios/` e `android/` não existirem, eles são gerados pela
  Geração Nativa Contínua. Nunca os crie ou edite manualmente; configure o
  comportamento nativo em `app.json` e por meio de plugins de configuração.
- O Expo Go inclui apenas os módulos nativos distribuídos com ele. Depois de
  adicionar uma biblioteca com código nativo, gere uma compilação de
  desenvolvimento com `npx expo run:ios`, `npx expo run:android` ou
  `eas build --profile development`.
- Dê preferência aos módulos recomendados pelo Expo em vez de bibliotecas de
  terceiros e verifique as habilidades disponíveis antes de adicionar
  dependências.
- Consulte `https://docs.expo.dev/versions/latest/index.md` para conhecer os
  módulos recomendados.
