# Responsabilidades da ViewModel

## Propósito

A ViewModel intermedeia a comunicação entre a View e o Model. Ela transforma
interações da interface em operações da aplicação e transforma os resultados
dessas operações em estado pronto para ser apresentado.

No SIAB, ViewModels ficam em `src/viewmodel/` e são implementadas como Hooks
Personalizados.

## Contrato com a View

Cada ViewModel expõe uma tupla com estado e ações:

```ts
const [state, actions] = useExampleViewModel();
```

O contrato separa duas direções:

- **estado:** dados que saem da ViewModel para a View;
- **ações:** intenções que saem da View para a ViewModel.

Os tipos do estado e das ações devem ser explícitos. A View não recebe Services
ou DataSources para executar por conta própria.

## Responsabilidades

A ViewModel é responsável por:

- manter o estado necessário para renderizar a tela;
- expor ações para a View;
- validar entradas relacionadas ao fluxo da tela;
- coordenar operações solicitadas pela View;
- acessar as partes necessárias do Model;
- representar carregamento e falhas no estado;
- atualizar o estado após cada resultado;
- controlar o fluxo da aplicação;
- executar decisões de navegação;
- ler e tratar parâmetros de rota.

## Limites

A ViewModel não é responsável por:

- renderizar JSX;
- definir estilos;
- escolher cores, espaçamentos ou componentes visuais;
- conhecer detalhes internos de persistência;
- implementar diretamente operações de banco de dados;
- acumular regras de domínio que pertencem a Entities ou Services.

Uma ViewModel coordena o Model, mas não substitui suas partes.

## Dependências permitidas

Uma ViewModel pode depender de:

- Hooks do React usados para manter o estado;
- Expo Router para navegação e parâmetros;
- Entities, Services e DataSources do Model;
- funções puras necessárias para coordenar o fluxo.

A ViewModel não deve depender de componentes ou estilos da View.

## Navegação

Toda decisão de navegação pertence à ViewModel, incluindo:

- avançar para uma rota;
- voltar;
- substituir a rota atual;
- encerrar uma rota ou uma sequência;
- ler e normalizar parâmetros recebidos pela rota.

A operação deve refletir o comportamento esperado. Por exemplo, depois de uma
autenticação bem-sucedida, `replace` impede que o usuário volte ao formulário
de login usando o histórico de navegação.

A View pode disparar uma ação como `entrar`, mas não deve chamar o roteador para
decidir o destino dessa ação.

## Tratamento de operações assíncronas

Uma ação assíncrona deve representar seu ciclo no estado:

1. marcar o início do carregamento;
2. limpar falhas anteriores quando apropriado;
3. solicitar a operação ao Model;
4. tratar o resultado de sucesso ou erro;
5. finalizar o carregamento mesmo quando ocorrer uma falha.

Erros desconhecidos devem ser tratados como `unknown` e convertidos em uma
mensagem segura para a View.

## Exemplo no SIAB

[`useLoginViewModel.ts`](../../../src/viewmodel/useLoginViewModel.ts) mantém:

- `email` e `pin`, que representam a entrada do formulário;
- `loading`, que representa a operação em andamento;
- `error`, que representa uma falha apresentável.

Ela também expõe:

- `alterarEmail`;
- `alterarPin`;
- `entrar`.

Ao executar `entrar`, a ViewModel valida a entrada, solicita a autenticação ao
Service e, em caso de sucesso, usa `router.replace("/home")`. A tela apenas
dispara a ação e reage ao estado resultante.

## Critério de decisão

Antes de adicionar um código à ViewModel, pergunte:

> Este código coordena o estado ou o fluxo de uma tela entre a View e o Model?

Se a resposta for sim, ele provavelmente pertence à ViewModel. Se sua função
principal for armazenar dados ou executar uma funcionalidade independente da
tela, ele pertence ao Model.

## Referências internas

- [Regras do projeto](../../../RULES.md)
- [Mapa arquitetural](../../../ARCHITECTURE.md)
- [Visão geral da arquitetura detalhada](../README.md)
- [Responsabilidades da View](../view/responsibilities.md)
- [Responsabilidades do Model](../model/responsibilities.md)
