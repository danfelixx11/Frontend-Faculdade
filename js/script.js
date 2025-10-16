// ============================================= //
// LÓGICA DE ACESSIBILIDADE                      //
// ============================================= //
const btnAcessibilidade = document.querySelector("#btn-acessibilidade");
const menuAcessibilidade = document.querySelector("#menu-acessibilidade");
const html = document.documentElement;

// Função auto-executável para aplicar o estado de alto contraste ao carregar a página
(function aplicarEstadoAcessibilidade() {
  const modoContrasteSalvo = localStorage.getItem('alto-contraste');
  if (modoContrasteSalvo === 'true') {
    document.body.classList.add('alto-contraste');
  }
})();

function aumentarFonte() {
  let tamanhoFonte = parseFloat(window.getComputedStyle(html).fontSize);
  html.style.fontSize = (tamanhoFonte + 1) + 'px';
}

function diminuirFonte() {
  let tamanhoFonte = parseFloat(window.getComputedStyle(html).fontSize);
  html.style.fontSize = (tamanhoFonte - 1) + 'px';
}

function modoAltoContraste() {
  document.body.classList.toggle('alto-contraste');
  // Salva a preferência do usuário no localStorage
  if (document.body.classList.contains('alto-contraste')) {
    localStorage.setItem('alto-contraste', 'true');
  } else {
    localStorage.setItem('alto-contraste', 'false');
  }
}

if (btnAcessibilidade && menuAcessibilidade) {
  btnAcessibilidade.addEventListener('click', () => {
    menuAcessibilidade.classList.toggle('ativo');
  });

  const btnAumentarFonte = menuAcessibilidade.querySelector('ul li:nth-child(1) button');
  const btnDiminuirFonte = menuAcessibilidade.querySelector('ul li:nth-child(2) button');
  const btnAltoContraste = menuAcessibilidade.querySelector('ul li:nth-child(3) button');

  if (btnAumentarFonte && btnDiminuirFonte && btnAltoContraste) {
    btnAumentarFonte.addEventListener('click', aumentarFonte);
    btnDiminuirFonte.addEventListener('click', diminuirFonte);
    btnAltoContraste.addEventListener('click', modoAltoContraste);
  }
}

// ============================================= //
// LÓGICA DO BOTÃO "VOLTAR AO TOPO"              //
// ============================================= //
const btnVoltarTopo = document.querySelector("#btn-voltar-topo");
if (btnVoltarTopo) {
  window.addEventListener('scroll', () => {
    btnVoltarTopo.classList.toggle('visivel', window.scrollY > 400);
  });
  btnVoltarTopo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ============================================= //
// LÓGICA DO FORMULÁRIO (SÓ RODA NA PÁGINA DE CADASTRO) //
// ============================================= //
const form = document.querySelector(".formulario-cadastro");
if (form) {
  // O código só entra aqui se o formulário existir na página
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

  // MÁSCARAS DE INPUT
  const cpfMask = IMask(cpfInput, { mask: '000.000.000-00' });
  const telefoneMask = IMask(telefoneInput, { mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }] });
  const cepMask = IMask(cepInput, { mask: '00000-000' });

  // FUNÇÕES DE UI E VALIDAÇÃO
  function mostraErro(input, mensagem) {
    const campoContainer = input.parentElement;
    const mensagemExistente = campoContainer.querySelector(".mensagem-erro");
    if (mensagemExistente) mensagemExistente.remove();
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
      if (mensagemErro) mensagemErro.remove();
    }
  }

  function validaCampoVazio(input, nomeCampo) {
    if (!input || input.value.trim() === "") {
      mostraErro(input, `O campo de ${nomeCampo} não pode ficar vazio.`);
      return false;
    }
    limpaErro(input);
    return true;
  }

  function isEmailValido(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  function validaEmail() {
    const valorEmail = emailInput.value.trim();
    if (valorEmail === "") {
      mostraErro(emailInput, "O campo de e-mail não pode ficar vazio."); return false;
    } else if (!isEmailValido(valorEmail)) {
      mostraErro(emailInput, "Por favor, insira um e-mail válido."); return false;
    }
    limpaErro(emailInput);
    return true;
  }
  
  function validaCPF() {
    const cpfLimpo = cpfInput.value.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        mostraErro(cpfInput, "O CPF deve conter 11 dígitos."); return false;
    }
    limpaErro(cpfInput);
    return true;
  }

  function validaTelefone() {
    const telefoneLimpo = telefoneInput.value.replace(/\D/g, '');
    if(telefoneLimpo.length < 10) {
        mostraErro(telefoneInput, "O telefone deve conter no mínimo 10 dígitos."); return false;
    }
    limpaErro(telefoneInput);
    return true;
  }

  function validaCEP() {
      const cepLimpo = cepInput.value.replace(/\D/g, '');
      if(cepLimpo.length !== 8) {
          mostraErro(cepInput, "O CEP deve conter 8 dígitos."); return false;
      }
      limpaErro(cepInput);
      return true;
  }

  // LÓGICA DA API VIACEP
  cepInput.addEventListener('blur', async () => {
    const cepLimpo = cepInput.value.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) { mostraErro(cepInput, "CEP não encontrado."); return; }
      limpaErro(cepInput);
      enderecoInput.value = data.logradouro;
      cidadeInput.value = data.localidade;
      estadoInput.value = data.uf;
    } catch (error) { mostraErro(cepInput, "Não foi possível buscar o CEP."); }
  });

  // OUVINTE DE EVENTO DO FORMULÁRIO
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const checks = [
      validaCampoVazio(nomeInput, "Nome Completo"),
      validaEmail(),
      validaCPF(),
      validaTelefone(),
      validaCampoVazio(nascimentoInput, "Data de Nascimento"),
      validaCEP(),
      validaCampoVazio(enderecoInput, "Endereço"),
      validaCampoVazio(numeroInput, "Número"),
      validaCampoVazio(cidadeInput, "Cidade"),
      validaCampoVazio(estadoInput, "Estado")
    ];
    const formularioValido = checks.every(check => check === true);
    if (formularioValido) { console.log("Formulário válido!"); } 
    else { console.log("Formulário inválido."); }
  });
}