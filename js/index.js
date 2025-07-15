// Navegação suave e menu mobile
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");

  // Menu mobile toggle
  hamburger.addEventListener("click", function() {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Navegação suave
  navLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Remove active class de todos os links
      navLinks.forEach(l => l.classList.remove("active"));
      // Adiciona active class ao link clicado
      this.classList.add("active");
      
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Altura do navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
      
      // Fecha o menu mobile após clicar
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Navbar background no scroll
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Highlight do link ativo baseado na seção visível
  const sections = document.querySelectorAll("section");
  
  function highlightActiveLink() {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", highlightActiveLink);

  // Animação das barras de skill quando visíveis
  const skillBars = document.querySelectorAll(".skill-progress");
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !bar.classList.contains("animated")) {
        bar.classList.add("animated");
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      }
    });
  }
  
  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars(); // Executa uma vez no carregamento

  // Animação de fade in para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observa elementos para animação
  const animatedElements = document.querySelectorAll(
    ".project-card, .timeline-item, .tech-category, .contact-item, .about-stats .stat"
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Formulário de contato
  const contactForm = document.querySelector(".contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Aqui você pode adicionar a lógica para enviar o formulário
      // Por exemplo, usando EmailJS ou uma API própria
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      console.log("Dados do formulário:", data);
      
      // Simula envio bem-sucedido
      alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
      this.reset();
    });
  }

  // Efeito de typing no hero title (opcional)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    // Animação de digitação
    const originalHTML = heroTitle.innerHTML;
    const textToType = "Olá, eu sou Welerson";
    const highlightWord = "Welerson";
    
    heroTitle.innerHTML = "";
    heroTitle.style.opacity = "1";
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
      if (i < textToType.length) {
        const currentText = textToType.substring(0, i + 1);
        
        // Se chegou na palavra que deve ser destacada
        if (currentText.includes(highlightWord) && i >= textToType.indexOf(highlightWord) + highlightWord.length - 1) {
          const beforeHighlight = textToType.substring(0, textToType.indexOf(highlightWord));
          const afterHighlight = textToType.substring(textToType.indexOf(highlightWord) + highlightWord.length);
          const currentAfter = currentText.substring(textToType.indexOf(highlightWord) + highlightWord.length);
          
          heroTitle.innerHTML = beforeHighlight + '<span class="highlight">' + highlightWord + '</span>' + currentAfter;
        } else {
          heroTitle.textContent = currentText;
        }
        
        i++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Animação finalizada, aplica o HTML final com destaque
        setTimeout(() => {
          heroTitle.innerHTML = 'Olá, eu sou <span class="highlight">Welerson</span>';
        }, 500);
      }
    }
    
    // Inicia a animação após um pequeno delay
    setTimeout(typeWriter, 800);
  }

  // Smooth scroll para botões do hero
  const heroButtons = document.querySelectorAll(".hero-buttons .btn");
  heroButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
});

// Função para adicionar efeito parallax sutil (opcional)
window.addEventListener("scroll", function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero");
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Preloader simples (opcional)
window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

// Função para copiar email ao clicar (opcional)
const emailElement = document.querySelector('.contact-details p');
if (emailElement && emailElement.textContent.includes('@')) {
  emailElement.style.cursor = 'pointer';
  emailElement.addEventListener('click', function() {
    navigator.clipboard.writeText(this.textContent).then(function() {
      // Feedback visual
      const originalText = emailElement.textContent;
      emailElement.textContent = 'Email copiado!';
      emailElement.style.color = 'var(--primary-color)';
      
      setTimeout(() => {
        emailElement.textContent = originalText;
        emailElement.style.color = '';
      }, 2000);
    });
  });
}