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

| ID     | Descrição do Requisito                                       | Prioridade |
|-------|--------------------------------------------------------------|------------|
| RF-001| Cadastro de Usuários: Permitir o cadastro de até 10 usuários com informações básicas (nome, e-mail, senha). | ALTA |
| RF-002| Tela de Login: Oferecer uma tela de login para autenticação dos usuários. | ALTA |
| RF-003| Acesso de Múltiplas Filiais: Possibilitar a seleção da unidade da empresa (Matriz, Filial 1, Filial 2, Filial 3) em cada negociação. | MÉDIA |
| RF-004| Formulário Simplificado: O formulário de negociação deve ser intuitivo e fácil de preencher, com os campos essenciais pré-definidos (produto, operação, valor por saca, quantidade de sacas, data de vencimento). | ALTA |
| RF-005| Gestão de Negociações: Registro de Negociações, Listagem de Negociações, Notificação em Tempo Real, Edição e Exclusão. | ALTA |
| RF-006| Análise de Dados: Média de Preços, Consolidado do Dia Anterior (D-1), Cálculo de Saldo, Alerta de Saldo Negativo. | MÉDIA |
| RF-007| Autenticação Segura: Utilizar métodos de autenticação seguros, como o uso de tokens ou outros mecanismos de autenticação de dois fatores. | ALTA |
| RF-008| Compatibilidade com Leitores de Tela: Garantir que o aplicativo seja compatível com leitores de tela para usuários com deficiência visual. | ALTA |
| RF-009| Contraste Adequado: Utilizar cores de alto contraste para facilitar a leitura por usuários com baixa visão. | ALTA |
| RF-010| Interface Intuitiva: Criar uma interface intuitiva e de fácil navegação, considerando a usabilidade para todos os tipos de usuários. | ALTA |
| RF-011| Registro de Negociações: Os usuários devem ser capazes de registrar negociações de compra e venda. | ALTA |
| RF-012| Integração com WhatsApp: Integrar o aplicativo com o WhatsApp para notificações por meio de um bot. | BAIXA |
| RF-013| Ambiente de Banco de Dados: Utilizar um banco de dados para armazenar as informações das negociações e dos usuários. | ALTA |

### Requisitos não Funcionais

| ID     | Descrição do Requisito                                       | Prioridade |
|-------|--------------------------------------------------------------|------------|
| RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel. | MÉDIA |
| RNF-002| Deve processar requisições do usuário em no máximo 3s. | BAIXA |
| RNF-003| Proteção de Dados Pessoais: Implementar medidas de segurança para proteger os dados pessoais dos usuários, conforme a Lei Geral de Proteção de Dados (LGPD) no Brasil. | ALTA |
| RNF-004| Acesso Restrito: Garantir que cada usuário só tenha acesso às informações e funcionalidades relevantes ao seu papel na empresa. | ALTA |
| RNF-005| Tempo de Resposta: Garantir que o aplicativo tenha um tempo de resposta rápido ao carregar informações e atualizar os dados. | MÉDIA |
| RNF-006| Escalabilidade: Projetar a aplicação de forma que ela seja capaz de lidar com o aumento de usuários e de negociações sem comprometer o desempenho. | ALTA |
| RNF-007| Integração com Google Cloud: Integrar o aplicativo com a plataforma Google Cloud para hospedar a aplicação e o banco de dados. | MÉDIA |
| RNF-008| Banco de Dados MySQL: Utilizar o MySQL como banco de dados para armazenar informações de negociações e usuários. | ALTA |
| RNF-009| Interface Intuitiva: Criar uma interface de usuário intuitiva e de fácil uso, considerando a simplicidade e usabilidade para os usuários. | ALTA |
| RNF-010| Performance: Assegurar que o aplicativo seja fluido e performático, mesmo com grande volume de negociações. | ALTA |
| RNF-012| Acessibilidade Universal: Garantir que a aplicação seja acessível a todos os tipos de usuários, incluindo suporte a leitores de tela e alto contraste. | ALTA |
| RNF-013| Limite de Usuários: Considerar

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
