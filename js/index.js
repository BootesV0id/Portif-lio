// Adiciona um evento ao documento para o evento "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", function() {
  // Seleciona todos os links de navegação da página
  const navLinks = document.querySelectorAll("nav a");

  // Percorre cada link
  navLinks.forEach(function(link) {
    // Adiciona um evento de clique para os link
    link.addEventListener("click", function(e) {
      // Remove o comportamento padrão do clique no link
      e.preventDefault();

      // Pega o atributo 'href' do link clicado, remove o #
      const targetId = this.getAttribute("href").substring(1);
      // Pega o elemento com o id
      const targetElement = document.getElementById(targetId);

      // Scrola a pagina
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth"
      });
    });
  });
});