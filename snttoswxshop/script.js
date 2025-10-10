// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Filtro de Categorias
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.apostila-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal de Compra
const modal = document.getElementById('modal-compra');
const comprarButtons = document.querySelectorAll('.comprar-btn');
const closeModal = document.querySelector('.close-modal');
const whatsappLink = document.getElementById('whatsapp-link');

comprarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');
        
        // Atualizar informações do modal
        document.getElementById('modal-product-name').textContent = productName;
        document.getElementById('modal-product-price').textContent = `R$ ${productPrice},00`;
        
        // Atualizar link do WhatsApp
        const message = `Olá! Acabei de comprar o produto ${productName} e gostaria de receber o acesso.`;
        whatsappLink.href = `https://wa.me/5511939255690?text=${encodeURIComponent(message)}`;
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Copiar chave PIX
const copyButton = document.querySelector('.btn-copy');
copyButton.addEventListener('click', () => {
    const pixCode = copyButton.getAttribute('data-clipboard-text');
    
    // Usar a Clipboard API se disponível
    if (navigator.clipboard) {
        navigator.clipboard.writeText(pixCode).then(() => {
            showNotification('Chave PIX copiada!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            fallbackCopy(pixCode);
        });
    } else {
        fallbackCopy(pixCode);
    }
});

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('Chave PIX copiada!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = 'var(--primary)';
    notification.style.color = '#000';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = 'var(--radius-md)';
    notification.style.zIndex = '3000';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Formulário de contato
const contactForm = document.getElementById('form-contato');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const formData = new FormData(contactForm);
    const name = formData.get('name') || 'Usuário';
    
    showNotification(`Obrigado, ${name}! Sua mensagem foi enviada.`);
    contactForm.reset();
});

// Efeito de digitação no hero
const heroTitle = document.querySelector('.hero h1');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Iniciar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Animação de entrada para elementos ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.apostila-card, .staff-member, .depoimento-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contador de alunos (para efeito visual)
const alunosCount = document.createElement('div');
alunosCount.style.position = 'fixed';
alunosCount.style.bottom = '20px';
alunosCount.style.left = '20px';
alunosCount.style.background = 'var(--card-bg)';
alunosCount.style.border = '1px solid var(--border-color)';
alunosCount.style.padding = '10px 15px';
alunosCount.style.borderRadius = 'var(--radius-md)';
alunosCount.style.fontSize = '14px';
alunosCount.style.zIndex = '1000';
alunosCount.style.backdropFilter = 'blur(10px)';
alunosCount.innerHTML = '<strong>5000+</strong> alunos satisfeitos';
document.body.appendChild(alunosCount);