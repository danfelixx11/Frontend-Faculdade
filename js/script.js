// ============================================= //
// CAPTURA DOS ELEMENTOS DO FORMULÁRIO           //
// ============================================= //
const form = document.querySelector(".formulario-cadastro");
const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const cpfInput = document.querySelector("#cpf");
const telefoneInput = document.querySelector("#telefone"); // Adicionado
const cepInput = document.querySelector("#cep");       // Adicionado
// Adicione a captura dos outros inputs aqui no futuro

console.log("Script carregado e elementos capturados!");

// ============================================= //
// MÁSCARAS DE INPUT (IMask.js)                  //
// ============================================= //
const cpfMask = IMask(cpfInput, {
  mask: '000.000.000-00'
});

const telefoneMask = IMask(telefoneInput, {
  mask: [
    {
      mask: '(00) 0000-0000' // Máscara para telefone fixo (8 dígitos + DDD)
    },
    {
      mask: '(00) 00000-0000' // Máscara para celular (9 dígitos + DDD)
    }
  ]
});

const cepMask = IMask(cepInput, { // Adicionado
  mask: '00000-000'
});

// ============================================= //
// FUNÇÕES AUXILIARES DE UI (FEEDBACK DE ERRO)   //
// ============================================= //
function mostraErro(input, mensagem) {
  const campoContainer = input.parentElement;
  const mensagemExistente = campoContainer.querySelector(".mensagem-erro");
  if (mensagemExistente) {
    mensagemExistente.remove();
  }

  campoContainer.classList.add("erro");
  const mensagemErro = document.createElement("span");
  mensagemErro.className = "mensagem-erro";
  mensagemErro.innerText = mensagem;
  campoContainer.appendChild(mensagemErro);
}

function limpaErro(input) {
  const campoContainer = input.parentElement;
  if (campoContainer.classList.contains("erro")) {
    campoContainer.classList.remove("erro");
    const mensagemErro = campoContainer.querySelector(".mensagem-erro");
    if (mensagemErro) {
      mensagemErro.remove();
    }
  }
}

// ============================================= //
// FUNÇÕES DE VALIDAÇÃO ESPECÍFICAS              //
// ============================================= //

function isEmailValido(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function validaNome() {
  if (nomeInput.value.trim() === "") {
    mostraErro(nomeInput, "O campo de nome não pode ficar vazio.");
    return false;
  }
  limpaErro(nomeInput);
  return true;
}

function validaEmail() {
  const valorEmail = emailInput.value.trim();
  if (valorEmail === "") {
    mostraErro(emailInput, "O campo de e-mail não pode ficar vazio.");
    return false;
  } else if (!isEmailValido(valorEmail)) {
    mostraErro(emailInput, "Por favor, insira um e-mail válido.");
    return false;
  }
  limpaErro(emailInput);
  return true;
}

function validaCPF() {
  const cpfLimpo = cpfMask.unmaskedValue;
  if (cpfLimpo === "") {
    mostraErro(cpfInput, "O campo de CPF não pode ficar vazio.");
    return false;
  } else if (cpfLimpo.length !== 11) {
    mostraErro(cpfInput, "O CPF deve conter 11 dígitos.");
    return false;
  }
  limpaErro(cpfInput);
  return true;
}

// --- VALIDAÇÃO DO TELEFONE --- (Adicionado)
function validaTelefone() {
  const telefoneLimpo = telefoneMask.unmaskedValue;
  if (telefoneLimpo === "") {
    mostraErro(telefoneInput, "O campo de telefone não pode ficar vazio.");
    return false;
  } else if (telefoneLimpo.length < 10) { // Aceita 10 ou 11 dígitos
    mostraErro(telefoneInput, "O telefone deve conter no mínimo 10 dígitos.");
    return false;
  }
  limpaErro(telefoneInput);
  return true;
}

// --- VALIDAÇÃO DO CEP --- (Adicionado)
function validaCEP() {
    const cepLimpo = cepMask.unmaskedValue;
    if (cepLimpo === "") {
        mostraErro(cepInput, "O campo de CEP não pode ficar vazio.");
        return false;
    } else if (cepLimpo.length !== 8) {
        mostraErro(cepInput, "O CEP deve conter 8 dígitos.");
        return false;
    }
    limpaErro(cepInput);
    return true;
}


// ============================================= //
// OUVINTE DE EVENTO PRINCIPAL (ORQUESTRADOR)    //
// ============================================= //
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Formulário enviado! Executando validações...");

  const nomeEhValido = validaNome();
  const emailEhValido = validaEmail();
  const cpfEhValido = validaCPF();
  const telefoneEhValido = validaTelefone(); // Adicionado
  const cepEhValido = validaCEP();           // Adicionado

  if (nomeEhValido && emailEhValido && cpfEhValido && telefoneEhValido && cepEhValido) {
    console.log("Formulário válido! Pronto para ser enviado.");
    // Lógica de envio aqui...
  } else {
    console.log("Formulário inválido. Corrija os erros.");
  }
});