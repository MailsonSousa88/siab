# Entidades

## Propósito

Entidades representam conceitos do domínio da aplicação. Uma Entity descreve
os dados associados a um conceito do sistema sem determinar como eles serão
apresentados ou armazenados.

No SIAB, as entidades ficam em `src/model/entities/`.

## Responsabilidades

Uma entidade é responsável por:

- dar nome e forma a um conceito do domínio;
- declarar seus dados e tipos;
- expressar invariantes puras quando necessário;
- servir como contrato compartilhado dentro do Model e com a ViewModel.

## Limites

Entidades devem permanecer puras. Elas não devem:

- renderizar JSX;
- importar React ou React Native;
- acessar mecanismos de persistência;
- chamar APIs;
- realizar navegação;
- conhecer Views ou ViewModels;
- depender de detalhes de uma plataforma móvel.

## Pureza

Uma entidade pura pode ser criada, validada e testada em TypeScript sem
inicializar a aplicação. Essa independência evita que regras do domínio fiquem
presas a componentes ou tecnologias de armazenamento.

## Exemplo no SIAB

[`src/model/entities/user.ts`](../../../src/model/entities/user.ts) define o
conceito de usuário:

```ts
export type User = {
  id: number;
  name: string;
  email: string;
  pin: number;
};
```

O tipo descreve os dados do usuário. Ele não sabe se esses dados vieram da
memória, de uma API ou de um banco local, nem como serão exibidos na tela.

## Quando criar uma entidade

Crie uma entidade quando houver um conceito relevante para o domínio do SIAB,
como usuário, livro ou empréstimo, e esse conceito precisar ser compartilhado
entre operações do Model.

Não crie uma entidade apenas para representar cores, textos, estado de abertura
de um componente ou outros detalhes exclusivamente visuais.

## Referências internas

- [Responsabilidades do Model](./responsibilities.md)
- [DataSources](./data-sources.md)
- [Services](./services.md)
- [Regras do projeto](../../../RULES.md)
