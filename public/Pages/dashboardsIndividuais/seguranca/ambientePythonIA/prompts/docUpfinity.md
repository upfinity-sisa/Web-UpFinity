## São Paulo Tech School

_Este produto foi desenvolvido por um grupo de estudantes do segundo semestre
do curso de Sistemas da Informação_

### UpFinity

```
Monitoramento Proativo de ATMs Hardware
e Software Integrado à Governança de TI
Breno de Freitas
Catarina Pires
Gabriel Pereira
Giovanne Pagano
Gwen Raldes
Omar Nidal
```
##### SÃO PAULO

###### 2025


# Contexto

Os caixas eletrônicos (ATMs) representam ativos estratégicos para o setor
bancário, desempenhando um papel fundamental na realização de transações
financeiras presenciais e no atendimento de clientes em regiões urbanas e rurais.
Operando de forma contínua 24 horas por dia, os caixas eletrônicos são vistos
como facilitadores do dia a dia, onde clientes realizam operações como: saques,
depósitos, consultas, transferências, pagamento de contas, visualização de
extratos, alteração de PIN (número do cartão) e entre outras. Esses
equipamentos são fundamentais para geração de receita e diminuição de gastos
com tarefas que antes exigiam mão de obra física por um funcionário do banco,
além de refletir diretamente na qualidade do serviço e imagem dos bancos, um
ATM de qualidade é capaz de atender a maior das necessidades dos clientes e
induz a confiabilidade na empresa bancária.
Devido ao aumento de demanda por novas funcionalidades exercidas por
máquinas ATM, melhores tecnologias de hardware surgiram e foram aplicadas
nos modelos para um maior poder computacional, a execução das tarefas do
software do banco vinculado a rede exige que a segurança seja redobrada para
segurança da infraestrutura das máquinas devido também a evolução de
ameaças externas e internas. Além disso é possível observar que falhas críticas
nos componentes que ATM’s são dependentes como: CPU, memória, SSD,
periféricos de saque e depósito, leitores de cartão e impressoras, ou em
softwares essenciais, incluindo sistemas operacionais e aplicações bancárias
podem ocasionar indisponibilidade do serviço e perdas financeiras significativas.
A ausência de monitoramento e visibilidade adequada sobre o estado real dos
equipamentos dificulta a identificação precoce de problemas e compromete a
eficiência das equipes de suporte e operação.
Paralelamente aos desafios operacionais, os ATM’s enfrentam riscos
significativos relacionados à segurança física e lógica. Tentativas de fraude,
invasões físicas, ataques cibernéticos e vulnerabilidades de rede podem
comprometer tanto a integridade dos equipamentos quanto a proteção dos dados
financeiros dos clientes. Por isso, torna-se imprescindível adotar soluções de
monitoramento e análise de dados que integrem inspeção de hardware, software
e rede, assegurando a continuidade operacional, a conformidade com
regulamentações, e fortalecendo a governança de TI
da instituição. A implementação de estratégias proativas de monitoramento e
manutenção preditiva garante não apenas a redução de falhas e downtime, mas
também contribui para a melhoria contínua da experiência do cliente, reputação
da empresa bancária e para a sustentabilidade operacional do parque de ATMs.


# Objetivo

Como meta alcançável o projeto busca implementar um sistema de
monitoramento proativo e integrado para ATM’s, capaz de prever falhas, reduzir
indisponibilidade e aumentar a eficiência operacional e notificar a equipe
responsável através da ferramenta Slack. Para alcançar esse propósito, busca-se
monitorar continuamente componentes de hardware(CPU, memória e disco) e a
conexão com a rede, detectar anomalias por meio de predefinições de alertas,
análise de dados em tempo real e direcionar incidentes para as equipes
responsáveis, como NOC e SOC. Além disso, pretende-se reduzir o downtime,
aprimorar os acordos de SLA’s de disponibilidade, diminuir custos operacionais
por meio da manutenção preditiva e integrar a governança de TI de acordo com
as melhores práticas de ITIL e normas regulatórias, incluindo PCI-DSS (Padrão
de Segurança de Dados do Setor de Cartões de Pagamento) e BACEN
(Regulamentos, diretrizes e regras estabelecidas pelo Banco Central do Brasil).


# Justificativa

A adoção de soluções de monitoramento inteligente para ATM’s oferece diversos
benefícios estratégicos e operacionais. Estudos e práticas de mercado indicam
que é possível prever até 40% das falhas, elevando a disponibilidade dos
equipamentos em cerca de 1,5%, reduzir o downtime em até 30%, diminuir
custos de manutenção em 25% e aumentar a satisfação do cliente em 15%. Além
disso, a implementação dessas soluções permite o planejamento eficiente do
ciclo de vida dos equipamentos, prolongando sua vida útil e reduzindo riscos
operacionais. Por fim, garante-se o atendimento às exigências regulatórias e de
segurança cibernética do setor financeiro, fortalecendo a governança de TI e a
confiabilidade institucional.


# Escopo

```
O projeto visa implementar duas aplicações de monitoramento constante de
hardware (CPU, Memória RAM, Disco e Rede) em ATM’s (Automated Teller
Machine). As aplicações serão construídas na linguagem Python e Java, e
enviarão os dados para um banco de dados MySQL que será implementado em
um container Docker na nuvem, utilizando a plataforma da AWS (Amazon Web
Services) para a sustentação.
Todos esses dados serão tratados e disponibilizados para consulta e
monitoramento através de uma aplicação web feita em HTML, CSS, Javascript
e Node.JS, também aplicada em um container Docker na nuvem e
disponibilizada para acesso via navegador. A solução visa reduzir o tempo de
downtime de ATM’s, garantindo a estabilidade e disponibilidade do serviço por
um longo período, assim reduzindo gastos inesperados e problemas com
clientes.
```

### Funcionalidades Inclusas

```
● Monitoramento de Hardware:
Coleta contínua de métricas de utilização de CPU, uso de memória, temperatura
da CPU, saúde do SSD/HDD (com alertas para pré-falha)
● Dashboard de inspeção:
Interface para visualização geral e individual de ATM’s do usuário e da função
exercida. Deve exibir métricas em tempo real e histórico de alertas, também
conter sistema de alertas e notificação via Slack.
● Monitoramento de Rede:
Teste de conectividade, com alertas para indisponibilidade para as equipes de
operação de rede (NOC).
● Gerenciamento de usuários:
Usuários administradores podem gerenciar seus funcionários (Promover, remover
ou cadastrar)
● Gerenciamento de ATMs:
Usuários administradores podem gerenciar seus ATMs, (cadastrar novos ATMs,
excluir)
```
### Premissas e restrições

Premissas:

- Acesso e compatibilidade: A equipe do projeto terá acesso ao sistema
    instalado
nos ATM’s para garantir o pleno funcionamento dos softwares desenvolvidos.
    Assume-se também que o hardware e o sistema operacional presente nos
    ATM’s serão compatíveis com as tecnologias utilizadas;
    ● Infraestrutura na nuvem: Assume-se que a infraestrutura na nuvem
       contratada pela equipe (AWS) estarão disponíveis e terão o desempenho
       necessário para
    receber, armazenar e processar os dados enviados pelos ATM’s em tempo
    real;
    ● Conexão: Presume-se que os ATM’s terão conexão estável com a internet
       para que os dados sejam enviados e a dashboard da aplicação web
       funcione da maneira esperada;
    ● Precisão dos dados: Considera-se que os dados coletados dos
       componentes de hardware dos ATM’s serão precisos e suficientes para
       que a análise e a detecção de problemas sejam eficazes.
    ● Substituição física de componentes defeituosos, o sistema apenas alerta,
       a ação caberá às equipes de operações.
Restrições:
● Linguagens e tecnologias: O desenvolvimento do projeto está restrito ao
uso das linguagens Python e Java para as aplicações de monitoramento,
MySQL para o banco de dados e HTML, CSS, Javascript e Node.js para a
aplicação web. A utilização de outras tecnologias não está prevista;
● Atuação do sistema: As aplicações se limitam a monitorar, alertar e
notificar sobre falhas e indisponibilidades. A substituição física de
componentes
defeituosos e a atualização remota do software dos ATM’s estão fora do
escopo
do projeto.
● Dependência de plataforma de nuvem (AWS): O projeto depende da
disponibilidade da plataforma AWS para a sustentação e disponibilidade
da aplicação web e para o funcionamento da transferência de dados,
estando assim sujeito aos seus custos, políticas de uso e eventuais
disponibilidades.


● Segurança e acesso: O acesso a aplicação web e consequentemente ao
sistema de monitoramento é restrito a usuários cadastrados e
autenticados, e todas as senhas e dados sensíveis devem ser
armazenados de acordo com a Lei Geral de Proteção de Dados.


### Nossos Planos de Assinaturas:

##### ● Plano básico:

Valor: R$4.790,00/mês
Máximo de ATMs: Até **12** ATMs

##### Benefícios:

Dashboard com métricas de hardware;
Visão geral de todos os ATMs;
Controle de usuários analistas;

##### ● Plano médio:

Valor: R$10.749,00/mês
Máximo de ATMs: Até **30** ATMs

##### Benefícios

Na compra do plano médio, o cadastro de 3 ATMs sai de graça
Dashboard com métricas de hardware;
Visão geral de todos os ATMs;
Controle de usuários analistas;
Maior capacidade de ATMs;

##### ● Plano avançado:

Valor: R$20.649,00/mês
Máximo de ATMs: Até **50** ATMs

#### ● Sob demanda:

O usuário pode solicitar um orçamento caso nossos planos não atendam sua necessidade.

##### Benefícios

Na compra do plano avançado, o cadastro de 8 ATMs sai de graça
Dashboard com métricas de hardware;
Visão geral de todos os ATMs;


Controle de usuários analistas;
Maior capacidade de ATMs;
Suporte prioritário;