document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        const isOpen = navLinks?.classList.toggle('active');
        mobileMenuBtn.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks?.classList.remove('active');
        }
    });

    // Smooth scrolling with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = -100; // Ajuste para que no quede justo en el borde superior
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            navLinks?.classList.remove('active');
        });
    });

    // Form handling
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        // Simple client-side validation
        const name = formData.get('name');
        const email = formData.get('email');
        if (!name || !email) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        try {
            console.log('Form submitted:', Object.fromEntries(formData.entries()));
            alert('Mensaje enviado correctamente. Me pondré en contacto contigo pronto.');
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observamos las secciones para animar cuando entren en vista
    document.querySelectorAll('.service-card, .testimonial-card, .about-content, section').forEach(el => observer.observe(el));

    // Header scroll behavior
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header?.classList.remove('scroll-up');
            return;
        }
        if (currentScroll > lastScroll && !header?.classList.contains('scroll-down')) {
            header?.classList.remove('scroll-up');
            header?.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header?.classList.contains('scroll-down')) {
            header?.classList.remove('scroll-down');
            header?.classList.add('scroll-up');
        }
        lastScroll = currentScroll;

        // Close mobile menu on scroll
        navLinks?.classList.remove('active');
    });

    // Hover animation for buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover');
        });
    });

    // Load more functionality for services/testimonials (example)
    const loadMoreBtn = document.querySelector('#load-more-btn');
    loadMoreBtn?.addEventListener('click', () => {
        // You can implement dynamic loading of more content here
        console.log('Cargar más contenido...');
        loadMoreBtn.style.display = 'none'; // Hide the load more button after click
    });

    // Parallax effect for background images (optional)
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const offset = window.pageYOffset;
            el.style.backgroundPosition = `center ${offset * 0.5}px`;
        });
    });
});
// Detectar cuando los elementos entran en vista
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar los elementos que deben animarse
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
animatedElements.forEach(el => observer.observe(el));

const quotes = [
    '"El SÍNTOMA, es el camino de sanación a una vida plena"',
    '"Tu síntoma es el maestro que te guía hacia tu verdadero ser"',
    '"La sanación comienza cuando escuchas lo que tu síntoma quiere decirte"',
    '"En cada síntoma hay un mensaje de transformación esperando ser descubierto"'
];

let currentQuoteIndex = 0;

function changeQuote() {
    const quoteElement = document.getElementById('quote');
    
    // Animación de desvanecimiento
    quoteElement.style.opacity = 0; // Desaparece
    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length; // Ciclo de frases
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.style.opacity = 1; // Reaparece
    }, 500); // Sincronizado con la transición
}

// Cambiar frase cada 5 segundos
setInterval(changeQuote, 7000);

// Mostrar la primera frase inmediatamente
document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 1;
});
document.addEventListener("DOMContentLoaded", () => {
    const profileImage = document.querySelector('.profile-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                profileImage.classList.add('animate'); // Agrega la clase para iniciar la animación
            }
        });
    }, {
        threshold: 0.4 // Activa cuando el 50% del elemento esté visible
    });

    observer.observe(profileImage);
});
document.addEventListener("DOMContentLoaded", () => {
    const footerLogo = document.querySelector('.footer-logo');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footerLogo.classList.add('animate'); // Agrega la clase para iniciar la animación
            }
        });
    }, {
        threshold: 0.3 // Activa cuando el 50% del elemento esté visible
    });

    observer.observe(footerLogo);
});
document.addEventListener("DOMContentLoaded", () => {
    const contactItems = document.querySelectorAll('.contact-info li');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate'); // Agrega la clase para iniciar la animación
            }
        });
    }, {
        threshold: 0.5 // Activa cuando el 50% del elemento esté visible
    });

    contactItems.forEach(item => observer.observe(item)); // Observa cada elemento de la lista
});

