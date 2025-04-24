// DOM Elements
const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('#checkbox');
const backToTop = document.querySelector('#back-to-top');
const progressBars = document.querySelectorAll('.progress-bar');
const contactForm = document.querySelector('#contact-form');
const downloadCvBtn = document.querySelector('#download-cv');

// Static typing text options for the hero section
const typingTextOptions = [
    "Web Developer",
    "Aspiring Data Scientist",
    "AI & ML Enthusiast",
    "Medical Laboratory Student",
];

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation for hamburger to X
    const bars = menuToggle.querySelectorAll('.bar');
    if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            menuToggle.click();
        }
    });
});

// Dark Mode Toggle
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    saveThemePreference();
});

// Check for saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else if (savedTheme === 'disabled') {
        document.body.classList.remove('dark-mode');
        themeToggle.checked = false;
    } else {
        // No preference saved — follow system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }
}

// Save theme preference
function saveThemePreference() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
    
    // Call function to animate elements on scroll
    animateOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect for hero section
function typeText() {
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed

    function type() {
        const currentText = typingTextOptions[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If word is complete, start deleting after pause
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of the word
        }
        
        // If deletion is complete, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTextOptions.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// Animated skill progress bars
function animateProgressBars() {
    progressBars.forEach(progressBar => {
        const percent = progressBar.getAttribute('data-percent');
        progressBar.style.width = '0%';
        
        // Trigger animation when visible
        setTimeout(() => {
            progressBar.style.width = percent + '%';
        }, 200);
    });
}

// Animate elements when they enter the viewport
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-content, .contact-card');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // For skill cards, animate the progress bar
                if (element.classList.contains('skill-card')) {
                    const progressBar = element.querySelector('.progress-bar');
                    const percent = progressBar.getAttribute('data-percent');
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = percent + '%';
                    }, 200);
                }
            }
        }
    });
}

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!name || !email || !message) {
            showToast("Please fill out all required fields.", false);
            return;
        }
    
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address.", false);
            return;
        }
    
        showToast("Sending message...", true);
    
        setTimeout(() => {
            console.log("Form submitted:", { name, email, subject, message });
            contactForm.reset();
            showToast("Message sent successfully!", false);
        }, 1500);
    });
    

// CV Download functionality
downloadCvBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const spinner = document.createElement('div');
    spinner.className = 'loader';
    document.body.appendChild(spinner);

    setTimeout(() => {
        window.open('KDMCV.pdf', '_blank');
        document.body.removeChild(spinner);
    }, 500);
});




// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 5%';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
    });
}

// Preloader functionality
// Preloader functionality (Quote Version)
function preloader() {
    const quotes = [
        "Code is like humor. When you have to explain it, it’s bad. — Cory House",
        "Programs must be written for people to read. — Harold Abelson",
        "The only way to learn a new programming language is by writing programs in it. — Dennis Ritchie",
        "Any sufficiently advanced technology is indistinguishable from magic. — Arthur C. Clarke"
    ];

    const preloader = document.createElement('div');
    preloader.className = 'quote-preloader';

    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';

    const quote = document.createElement('div');
    quote.className = 'quote-text';
    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];

    preloader.appendChild(spinner);
    preloader.appendChild(quote);
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
                typeText();
                animateProgressBars();
            }, 500);
        }, 1000);
    });
}

    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.removeChild(loader);
                
                // Start animations after preloader is gone
                typeText();
                animateProgressBars();
            }, 500);
        }, 1000);
    });


// Initialize all functions
    function init() {
        loadThemePreference();
        handleNavbarScroll();
        preloader();
    
        const chatbotClose = document.getElementById("chatbot-close");
        if (chatbotClose) {
            chatbotClose.addEventListener("click", () => {
                chatbotBox.classList.add("hidden");
            });
        }
    
        if (document.readyState === 'complete') {
            typeText();
            animateProgressBars();
            animateOnScroll();
        }
    }

    

    // If page is already loaded when script runs
    if (document.readyState === 'complete') {
        typeText();
        animateProgressBars();
        animateOnScroll();
    }


// Project Modal Logic
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent;
        const desc = card.querySelector("p").textContent;
        const imgSrc = card.querySelector("img").src;
        const tags = [...card.querySelectorAll(".tag")].map(tag => tag.textContent);

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImg.src = imgSrc;

        modalTags.innerHTML = "";
        tags.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});


// Start everything
init();



// Add some CSS programmatically for the preloader
const style = document.createElement('style');
style.innerHTML = `
    .quote-preloader {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: var(--background-color);
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 1.0s ease;
        font-family: 'Poppins', sans-serif;
        text-align: center;
        padding: 2rem;
    }

    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 6px solid #ccc;
        border-top-color: var(--primary-color);
        border-radius: 50%;
        margin-bottom: 2rem;
        animation: spin 3s linear infinite;
    }

    .quote-text {
        font-size: 1.1rem;
        max-width: 600px;
        font-weight: 500;
        opacity: 0.8;
        animation: fadeIn 3s ease-in-out;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;


document.head.appendChild(style);
// CHATBOT LOGIC
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotClose = document.getElementById("chatbot-close");

let hasGreeted = false;

chatbotToggle.addEventListener("click", () => {
    chatbotBox.classList.toggle("hidden");
});

if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
        chatbotBox.classList.add("hidden");
    });
}

chatbotInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const userMsg = chatbotInput.value.trim();
        if (userMsg !== "") {
            appendMessage("You", userMsg);
            getBotResponse(userMsg);
            chatbotInput.value = "";
        }
    }
});

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(msg) {
    let lower = msg.toLowerCase();
    let response = "Sorry, I don’t understand.";

    if (lower.includes("name")) response = "I'm Derrick Kurura.";
    else if (lower.includes("skills")) response = "HTML, CSS, JS, Python, Data Science, ML.";
    else if (lower.includes("education")) response = "I'm a Medical Lab Science student at KU.";
    else if (lower.includes("project")) response = "Check my latest projects in the Projects section.";

    const typingMsg = document.createElement("div");
    typingMsg.id = "typing";
    typingMsg.innerHTML = `<strong>DerrickBot:</strong> <em>typing...</em>`;
    chatbotMessages.appendChild(typingMsg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
        typingMsg.remove();
        appendMessage("DerrickBot", response);
    }, 1500);
}

function autoGreet(message) {
    if (!hasGreeted) {
        chatbotBox.classList.remove("hidden");
        appendMessage("DerrickBot", message);
        hasGreeted = true;
    }

// Auto greet after 10s or scroll
setTimeout(() => autoGreet("Hi there! 👋 Want to know more about my skills or projects?"), 10000);
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2) {
        autoGreet("Need help exploring my portfolio? I'm here to chat!");
    }
}, { once: true });
}

new Swiper('.education-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1.2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

if (element.classList.contains('skill-card')) {
    const icons = element.querySelectorAll('.skill-badge img');
    icons.forEach(icon => {
        icon.style.opacity = 0;
        setTimeout(() => {
            icon.style.opacity = 1;
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }, 300);
    });
}
}

function showToast(message, isLoading = false) {
    const toast = document.getElementById("toast");
    const spinner = toast.querySelector(".toast-spinner");
    const msg = document.getElementById("toast-message");

    msg.textContent = message;
    spinner.style.display = isLoading ? "inline-block" : "none";

    toast.classList.add("show");

    // Hide after 3 seconds if not loading
    if (!isLoading) {
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}
