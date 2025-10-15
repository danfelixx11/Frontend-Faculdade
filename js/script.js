// ============================================= //
// CAPTURA DOS ELEMENTOS DO FORMULÁRIO           //
// ============================================= //
const form = document.querySelector(".formulario-cadastro");
const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email");
const cpfInput = document.querySelector("#cpf");
const telefoneInput = document.querySelector("#telefone");
const nascimentoInput = document.querySelector("#nascimento");
const cepInput = document.querySelector("#cep");
const enderecoInput = document.querySelector("#endereco");
const numeroInput = document.querySelector("#numero");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estado");

console.log("Script carregado e elementos capturados!");

// ============================================= //
// MÁSCARAS DE INPUT (IMask.js)                  //
// ============================================= //
const cpfMask = IMask(cpfInput, { mask: '000.000.000-00' });
const telefoneMask = IMask(telefoneInput, { mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }] });
const cepMask = IMask(cepInput, { mask: '00000-000' });

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

function validaTelefone() {
  const telefoneLimpo = telefoneMask.unmaskedValue;
  if (telefoneLimpo === "") {
    mostraErro(telefoneInput, "O campo de telefone não pode ficar vazio.");
    return false;
  } else if (telefoneLimpo.length < 10) {
    mostraErro(telefoneInput, "O telefone deve conter no mínimo 10 dígitos.");
    return false;
  }
  limpaErro(telefoneInput);
  return true;
}

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

function validaNascimento() {
  if (nascimentoInput.value.trim() === "") {
    mostraErro(nascimentoInput, "O campo de Data de Nascimento não pode ficar vazio.");
    return false;
  }
  limpaErro(nascimentoInput);
  return true;
}

function validaEndereco() {
  if (enderecoInput.value.trim() === "") {
    mostraErro(enderecoInput, "O campo de Endereço não pode ficar vazio.");
    return false;
  }
  limpaErro(enderecoInput);
  return true;
}

function validaNumero() {
  if (numeroInput.value.trim() === "") {
    mostraErro(numeroInput, "O campo de Número não pode ficar vazio.");
    return false;
  }
  limpaErro(numeroInput);
  return true;
}

function validaCidade() {
  if (cidadeInput.value.trim() === "") {
    mostraErro(cidadeInput, "O campo de Cidade não pode ficar vazio.");
    return false;
  }
  limpaErro(cidadeInput);
  return true;
}

function validaEstado() {
  if (estadoInput.value.trim() === "") {
    mostraErro(estadoInput, "O campo de Estado não pode ficar vazio.");
    return false;
  }
  limpaErro(estadoInput);
  return true;
}

// ============================================= //
// LÓGICA DA API VIACEP (PREENCHIMENTO AUTOMÁTICO) //
// ============================================= //
cepInput.addEventListener('blur', async () => {
    const cepLimpo = cepMask.unmaskedValue;
    if (cepLimpo.length !== 8) {
        return;
    }
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (data.erro) {
            mostraErro(cepInput, "CEP não encontrado.");
            return;
        }
        limpaErro(cepInput);
        enderecoInput.value = data.logradouro;
        cidadeInput.value = data.localidade;
        estadoInput.value = data.uf;
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        mostraErro(cepInput, "Não foi possível buscar o CEP. Verifique sua conexão.");
    }
});

// ============================================= //
// OUVINTE DE EVENTO PRINCIPAL (ORQUESTRADOR)    //
// ============================================= //
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Formulário enviado! Executando validações...");

  const checks = [
    validaNome(),
    validaEmail(),
    validaCPF(),
    validaTelefone(),
    validaNascimento(),
    validaCEP(),
    validaEndereco(),
    validaNumero(),
    validaCidade(),
    validaEstado()
  ];

  const formularioValido = checks.every(check => check === true);

  if (formularioValido) {
    console.log("Formulário válido! Pronto para ser enviado.");
    // Lógica de envio aqui...
  } else {
    console.log("Formulário inválido. Corrija os erros.");
  }
});