// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Show message function
function showMessage(type) {
    const messageArea = document.getElementById('messageArea');
    let message = '';
    
    switch(type) {
        case 'email':
            message = '📧 <strong>Email:</strong> vibha.ayushi@example.com<br>Feel free to reach out anytime!';
            break;
        case 'message':
            message = '💌 <strong>Thank you for your message!</strong><br>I appreciate your kind words and interest. I\'ll get back to you soon!';
            break;
        case 'social':
            message = '🌐 <strong>Connect with me on:</strong><br>Instagram • Facebook • Twitter • LinkedIn<br>Let\'s be friends!';
            break;
        default:
            message = 'Thanks for reaching out! 💜';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    
    messageArea.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.4s ease reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 400);
    }, 5000);
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-text, .family-card, .talent-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#ffe66d';
        }
    });
});

// Easter egg - click the crown emoji multiple times
let crownClickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        crownClickCount++;
        
        if (crownClickCount === 5) {
            showMessage('message');
            crownClickCount = 0;
            
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'spin 0.5s ease';
            }, 10);
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Vibha Ayushi\'s Portfolio! 💜');
});

let lastMessageTime = 0;
const originalShowMessage = showMessage;
showMessage = function(type) {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime > 500) {
        originalShowMessage(type);
        lastMessageTime = currentTime;
    }
};
