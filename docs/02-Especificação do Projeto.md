# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

| ID    | Descrição do Requisito                                      | Prioridade |
|-------|-------------------------------------------------------------|------------|
| RF-001| Permitir que os usuários realizem o login no aplicativo.    | ALTA       |
| RF-002| Permitir que os usuários registrem negociações de compra e venda de grãos no aplicativo. | ALTA |
| RF-003| Mostrar uma lista ordenada das negociações, da mais recente para a menos recente, na tela principal. | MÉDIA |
| RF-004| Calcular e exibir a média dos preços de compra e venda negociados por dia. | MÉDIA |
| RF-005| Fornecer informações consolidadas do dia anterior. | MÉDIA |
| RF-006| Notificar os usuários em tempo real sobre novas negociações. | MÉDIA |
| RF-007| Permitir que os usuários escolham o tipo de operação (compra ou venda) ao registrar uma negociação. | ALTA |
| RF-008| Registrar o nome da filial e os nomes do vendedor ou comprador ao registrar uma negociação. | ALTA |
| RF-009| Permitir que os usuários escolham o tipo de produto (por exemplo, soja) ao registrar uma negociação. | ALTA |
| RF-010| Registrar o preço por saca, quantidade de sacas e data de vencimento ao registrar uma negociação. | ALTA |
| RF-011| Atualizar automaticamente o saldo do dia e a média de preço do dia ao registrar uma negociação. | ALTA |
| RF-012| Detectar e alertar os usuários sobre saldo negativo (compras maiores que vendas). | ALTA |
| RF-013| Fornecer uma tela de login para autenticação dos usuários. | ALTA |
| RF-014| Integrar notificações via WhatsApp para informar os usuários sobre eventos importantes no aplicativo. | MÉDIA |

### Requisitos não Funcionais

| ID     | Descrição do Requisito                                                  | Prioridade |
|--------|-------------------------------------------------------------------------|------------|
| RNF-001| O aplicativo deve ser responsivo para funcionar em dispositivos móveis. | MÉDIA      |
| RNF-002| O aplicativo deve processar as requisições do usuário em no máximo 3 segundos. | BAIXA    |
| RNF-003| O aplicativo deve ser desenvolvido em linguagem JavaScript, tanto no frontend quanto no backend. | ALTA |
| RNF-004| O aplicativo deve ser hospedado na plataforma Google Cloud e utilizar um banco de dados MySQL para armazenar os dados. | ALTA |
| RNF-005| O aplicativo deve ser desenvolvido utilizando tecnologias como AngularJS/TypeScript (front-end) e Node.js (back-end), com a possibilidade de utilizar Ionic/React para futuras versões móveis. | ALTA |
| RNF-006| O layout do aplicativo deve seguir uma paleta de cores composta por verde, preto e branco, com um ícone de grão de soja como símbolo. | BAIXA |
| RNF-007| O aplicativo deve ser projetado para ser de fácil utilização, fluido e com bom desempenho. | ALTA |
| RNF-008| A aplicação deve permitir até 10 usuários simultâneos devido a restrições de uso. | MÉDIA |

A priorização dos requisitos foi definida com base na importância de cada funcionalidade.

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
