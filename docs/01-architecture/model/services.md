# Services

## Propósito

Um Service encapsula uma funcionalidade específica do sistema. Ele existe para
executar uma operação coerente que não pertence à apresentação e cuja
responsabilidade principal não é apenas guardar ou recuperar dados.

A pergunta principal para classificar uma classe é:

> A responsabilidade principal desta classe é executar uma funcionalidade
> específica?

Se a resposta for sim, a classe é um Service.

## Exemplos de funcionalidades

Services podem encapsular funcionalidades como:

- autenticação;
- envio de notificações;
- geração de texto com modelos de linguagem;
- processamento de imagens;
- integração com uma capacidade externa;
- cálculos ou validações associados a uma operação do sistema.

O uso de uma API externa não é, por si só, o que define um Service. A
responsabilidade principal da classe é o critério decisivo.

## Responsabilidades

Um Service é responsável por:

- executar uma funcionalidade específica;
- aplicar regras associadas à operação;
- coordenar DataSources quando precisar de dados;
- receber e retornar contratos claros;
- transformar falhas técnicas em erros coerentes com a funcionalidade;
- permanecer independente da forma como o resultado será apresentado.

## Limites

Um Service não deve:

- renderizar JSX;
- definir estilos;
- controlar navegação;
- manter estado visual;
- importar Views ou ViewModels;
- assumir detalhes de apresentação;
- substituir um DataSource quando sua função principal for persistência.

## Diferença entre Service e DataSource

```text
Guardar ou recuperar dados
             ↓
         DataSource

Executar funcionalidade específica
             ↓
           Service
```

| Pergunta | DataSource | Service |
| --- | --- | --- |
| Qual é o objetivo principal? | Acessar dados | Executar uma funcionalidade |
| Pode conhecer a fonte dos dados? | Sim | Somente por meio do DataSource |
| Pode aplicar regras da operação? | Apenas as necessárias ao acesso | Sim |
| Pode controlar a interface ou navegação? | Não | Não |

## Exemplo no SIAB

[`authService.ts`](../../../src/model/services/authService.ts) encapsula a
autenticação. Ele:

1. solicita ao `UserDataSource` um usuário com o e-mail informado;
2. informa uma falha quando o usuário não existe;
3. compara o PIN recebido com o PIN do usuário;
4. retorna o usuário autenticado quando as credenciais são válidas.

O Service não sabe qual tela iniciou a operação nem para onde a aplicação
navegará. A ViewModel recebe o resultado e decide o fluxo da tela.

## Critério de decisão

Uma dependência externa não determina automaticamente a categoria. Considere a
finalidade:

- uma classe que busca registros em uma API é um DataSource;
- uma classe que executa autenticação usando esses registros é um Service;
- uma classe que apenas formata o resultado para uma tela não pertence ao Model.

## Referências internas

- [Responsabilidades do Model](./responsibilities.md)
- [DataSources](./data-sources.md)
- [Entidades](./entities.md)
- [Responsabilidades da ViewModel](../viewmodel/responsibilities.md)
- [Regras do projeto](../../../RULES.md)
