document.addEventListener('DOMContentLoaded', () => {
    // Navegación responsive
  

    //IDIOMASSS

    function toggleDropdown(event) {
    const dropdown = event.currentTarget;
    dropdown.classList.toggle('active');
}

window.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.language-dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Cierra el dropdown al hacer scroll
window.addEventListener('scroll', () => {
    const dropdowns = document.querySelectorAll('.language-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

//HAMBURGUESA

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});


    
    // Carrusel
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].style.display = 'none';
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].style.display = 'block';
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Iniciar el carrusel
    showSlide(0);
    setInterval(() => showSlide(currentSlide + 1), 5000); // Cambiar slide cada 5 segundos

    // Animación de aparición en scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    document.querySelectorAll('.about-card, .package-card, .recommendation-card').forEach(el => {
        observer.observe(el);
    });

    // Validación del formulario
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, ingrese un email válido.');
            return;
        }
        
        // Aquí iría el código para enviar el formulario
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animación de las tarjetas de paquetes
    const packageCards = document.querySelectorAll('.package-card');

    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

//EQUIPO DE TRABAJOOOO

function checkVisibility() {
    const miembros = document.querySelectorAll('.miembro-equipo');
    miembros.forEach(miembro => {
        const rect = miembro.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0);
        if (isVisible) {
            miembro.classList.add('visible');
        }
    });
}

window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);



document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.miembro-equipo img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Error loading image:', this.src);
            // Opcionalmente, puedes establecer una imagen de respaldo
            // this.src = 'ruta/a/imagen/de/respaldo.jpg';
        });

        // Forzar la recarga de la imagen
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
    });
});


//CONTACTO
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
            }, 1000);
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}-error`);
            if (input.hasAttribute('required') && !input.value.trim()) {
                markAsError(input, errorElement);
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                markAsError(input, errorElement);
                isValid = false;
            } else {
                removeError(input, errorElement);
            }
        });

        return isValid;
    }

    function markAsError(element, errorElement) {
        element.classList.add('error');
        if (errorElement) errorElement.style.display = 'block';
    }

    function removeError(element, errorElement) {
        element.classList.remove('error');
        if (errorElement) errorElement.style.display = 'none';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Interactive effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-5px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });

        input.addEventListener('input', function() {
            const errorElement = document.getElementById(`${this.id}-error`);
            removeError(this, errorElement);
        });
    });
});