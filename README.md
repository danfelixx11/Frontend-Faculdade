# 🖥️ Plataforma Web ONG "Código do Futuro"

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<img src="./images/Index.png" alt="home"/>

🚀 Sobre o Projeto
Este repositório contém o projeto final da disciplina de Desenvolvimento Front-end para Web, do curso de Bacharelado em Ciência da Computação pela Cruzeiro do Sul Virtual.

O desafio foi desenvolver uma plataforma web completa e profissional para uma ONG fictícia, a "Código do Futuro". O projeto é um site institucional de 3 páginas (Início, Projetos e Cadastro) que aplica, de forma integrada, todos os conceitos estudados nas quatro unidades da disciplina.

➡️ **[Acesse a versão final do projeto no GitHub Pages](https://danfelixx11.github.io/Frontend-Faculdade/)**

✨ **Principais Funcionalidades**

O projeto é uma plataforma web responsiva e acessível que inclui:

**Design System:** Uso consistente de variáveis CSS para cores, tipografia e espaçamento.

**Layout Responsivo:** Site 100% adaptável a dispositivos móveis (mobile, tablet e desktop) usando Flexbox e Media Queries.

**Navegação Mobile:** Menu hambúrguer funcional implementado com JavaScript.

**Formulário de Cadastro Avançado:**

Validação de campos em tempo real (CPF, e-mail, telefone, campos vazios) usando JavaScript.

Máscaras de input (CPF, Telefone, CEP) com a biblioteca IMask.js.

Preenchimento automático de endereço via API (Fetch API) consultando o ViaCEP.

**Acessibilidade (WCAG AA):**

Navegação completa por teclado.

Uso correto de atributos ARIA.

Modo de Alto Contraste (com persistência via localStorage).

Modo Escuro (com persistência via localStorage).

**Otimização de Performance:**

Carregamento de arquivos CSS e JS minificados (.min.css / .min.js).

Script "Anti-Flash" (FOUC) para carregamento instantâneo dos temas.

Validação W3C: Todos os arquivos HTML foram validados e aprovados sem erros pelo W3C Validator.

## 🛠️ Tecnologias e Conceitos Aplicados

* **HTML5 Semântico:** Estrutura validada pelo W3C (`<header>`, `<nav>`, `<main>`, `<footer>`).
* **CSS3:**
    * Flexbox para layouts complexos.
    * Variáveis CSS (Design System).
    * Responsividade com `@media (max-width)`.
* **JavaScript (ES6+):**
    * Manipulação do DOM e Event Listeners.
    * Validação de formulários e expressões regulares (RegEx).
    * Fetch API (Consumo do ViaCEP).
    * `localStorage` para persistência de temas.
* **Ferramentas:**
    * Git e GitHub para versionamento semântico.
    * VS Code.
    * W3C Validator.
    * Minificadores online (CSS & JavaScript).

📋 Decisões de Projeto e Justificativas Técnicas
Conforme solicitado nos requisitos da disciplina, esta seção documenta decisões técnicas tomadas during o desenvolvimento para atender às exigências da faculdade.

**1. Arquitetura MPA vs. SPA (Requisito III)**

**Requisito:** "Implementar sistema de Single Page Application (SPA) básico."

**Decisão:** Foi decidido manter a arquitetura como MPA (Multi-Page Application), onde cada página (Início, Projetos, Cadastro) é um arquivo .html separado.

**Justificativa:** Para um site institucional focado em conteúdo e captação, a arquitetura MPA oferece vantagens significativas em SEO (Search Engine Optimization), permitindo uma indexação mais clara e robusta pelos motores de busca. Além disso, a complexidade de refatorar o projeto para um SPA básico desviaria esforços de funcionalidades críticas exigidas, como a validação de formulários avançada e os múltiplos temas de acessibilidade, que foram entregues com excelência.

**2. Sistema de Grid (Requisito II)**

**Requisito:** "Desenvolver sistema de grid customizado (12 colunas)."

**Decisão:** O projeto não utiliza um sistema de grid de 12 colunas (como o Bootstrap). Em vez disso, optou-se pelo uso direto de módulos de layout modernos do CSS3: Flexbox e CSS Grid.

**Justificativa:** Sistemas de 12 colunas são uma técnica mais antiga, criada para suprir limitações que o CSS não possuía. Com a adoção universal do Flexbox e do Grid, é mais eficiente, limpo e performático construir layouts responsivos diretamente com essas ferramentas. O uso de display: flex, flex-wrap: wrap e gap permitiu a criação de todos os layouts de cards e seções com menos código e maior fluidez.

**3. Menu Dropdown (Requisito II)**

**Requisito:** "Criar menu principal responsivo com submenu dropdown."

**Decisão:** O menu responsivo (com "hambúrguer") foi implementado, mas o submenu dropdown não foi incluído.

**Justificativa:** A arquitetura de informação do site é "plana" (flat), contendo apenas links de primeiro nível (Início, Projetos, Cadastro). Um menu dropdown serve para agrupar sub-páginas (ex: "Sobre" -> "Nossa Equipe"). Como essa sub-navegação não era necessária para o escopo do projeto, a implementação de um dropdown vazio não teria valor semântico ou funcional.

**4. Fluxo de Versionamento e Colaboração (Requisitos IV)**

**Requisitos:** "Implementar estratégia de branching GitFlow" e "Pull Requests e Issues utilizados."

**Análise (Projeto Solo):** Sendo este um projeto desenvolvido individualmente, o uso de um fluxo de branching complexo como o GitFlow (com branches develop, release, hotfix) não era prático. Os commits foram feitos diretamente na branch main.

**Justificativa Teórica (Simulação de Equipe):** Em um ambiente de equipe profissional, o fluxo seria:

**Issues:** Uma nova tarefa (ex: "Implementar Modo Escuro") seria aberta como uma Issue no GitHub.

**Branching:** O desenvolvedor criaria uma branch a partir da develop, nomeada conforme a tarefa (ex: feature/modo-escuro).

**Desenvolvimento:** O trabalho seria realizado e comitado nesta branch.

**Pull Request (PR):** Ao finalizar, o desenvolvedor abriria um Pull Request (PR) de feature/modo-escuro para develop.

**Code Review:** Outros membros da equipe revisariam o código, solicitariam ajustes e, por fim, aprovariam o PR.

**Merge:** O código seria mesclado à branch develop, e a Issue seria fechada.

🔗 Meus Outros Espaços de Aprendizado
Enquanto este repositório é focado em Front-end, minha jornada de aprendizado principal em Backend e IA/ML está documentada em outro lugar. Conecte-se comigo para acompanhar a jornada completa!

🐍 Repositório Principal (Python & IA/ML): [jornada-python](https://github.com/danfelixx11/jornada-python)

💼 Perfil Profissional no LinkedIn: [Daniel Félix de Oliveira](https://www.linkedin.com/in/danfelix-dev/)