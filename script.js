// Menu Toggle Mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menu al hacer click en un enlace
document.querySelectorAll('.nav__menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll Animation para las tarjetas
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

// Aplicar animación a las tarjetas de servicios
document.querySelectorAll('.servicio__card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// OPCIÓN 1: Usar Formspree (Recomendado)
// Regístrate en https://formspree.io/ y obtén tu endpoint
// Reemplaza 'YOUR_FORM_ID' con tu ID de Formspree

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// OPCIÓN 2: Usar EmailJS (Alternativa)
// Descomentar si prefieres usar EmailJS
// Regístrate en https://www.emailjs.com/ y configura tu servicio
/*
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
*/

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    
    // Mostrar estado de carga
    submitBtn.classList.add('loading');
    formMessage.style.display = 'none';
    
    try {
        // ==========================================
        // OPCIÓN 1: FORMSPREE
        // ==========================================
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto. 🎉', 'success');
            contactForm.reset();
        } else {
            throw new Error('Error al enviar el mensaje');
        }
        
        // ==========================================
        // OPCIÓN 2: EMAILJS (Alternativa)
        // Descomentar este bloque si prefieres usar EmailJS
        // ==========================================
        /*
        // Cargar EmailJS si no está cargado
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
        
        const templateParams = {
            from_name: formData.get('nombre'),
            from_email: formData.get('email'),
            phone: formData.get('telefono') || 'No proporcionado',
            message: formData.get('mensaje')
        };
        
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto. 🎉', 'success');
        contactForm.reset();
        */
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente. 😔', 'error');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    formMessage.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Header con efecto al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 30px rgba(1, 92, 145, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(1, 92, 145, 0.1)';
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animación adicional para los iconos flotantes del hero
const iconFloats = document.querySelectorAll('.icon-float');
iconFloats.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});