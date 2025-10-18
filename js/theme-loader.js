// SUBSTITUA O CONTEÚDO DO js/theme-loader.js POR ISTO:
(function() {
  const html = document.documentElement; 

  const modoContrasteSalvo = localStorage.getItem('alto-contraste');
  const modoEscuroSalvo = localStorage.getItem('modo-escuro');

  // PRIORIDADE 1: Alto Contraste
  // Se o alto contraste estiver salvo como 'true', aplica-o e para.
  if (modoContrasteSalvo === 'true') {
    html.classList.add('alto-contraste');
  } 
  // PRIORIDADE 2: Modo Escuro
  // Só verifica o modo escuro SE o alto contraste NÃO estiver ativo.
  else if (modoEscuroSalvo === 'true') {
    html.classList.add('modo-escuro');
  }
})();