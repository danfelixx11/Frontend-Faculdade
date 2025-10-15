// ============================================= //
// CAPTURA DOS ELEMENTOS DO FORMULÁRIO           //
// ============================================= //

// Captura o formulário inteiro
const form = document.querySelector(".formulario-cadastro");

// Captura os campos de input
const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const cpfInput = document.querySelector("#cpf");
const telefoneInput = document.querySelector("#telefone");
const nascimentoInput = document.querySelector("#nascimento");
const cepInput = document.querySelector("#cep");
const enderecoInput = document.querySelector("#endereco");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

console.log("Script carregado e elementos capturados!");

// ============================================= //
// EVENT LISTENERS                               //
// ============================================= //

form.addEventListener("submit", (event) => {
  // Impede o comportamento padrão do formulário (que é recarregar a página)
  event.preventDefault();

  // Teste inicial: Verificar se estamos capturando o evento
  console.log("Formulário enviado! Validação será executada aqui.");

  // Aqui, no futuro, chamaremos nossas funções de validação
});

