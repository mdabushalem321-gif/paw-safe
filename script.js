// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
});

// Smooth Scrolling
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

// Handle Report Form
function handleReport(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        location: formData.get('location'),
        condition: formData.get('condition'),
        details: formData.get('details'),
        contact: formData.get('contact')
    };
    
    // In a real application, you would send this to a server
    console.log('Report submitted:', data);
    
    alert('Thank you for reporting! We will look into this immediately. 🐾');
    event.target.reset();
}

// Handle Adoption
function adoptAnimal(name) {
    const message = `Thank you for your interest in adopting ${name}! 🐾\n\nPlease contact us at:\n📧 tanisha.malkar23@gmail.com\n📱 +91 78209 81034\n\nWe'll guide you through the adoption process.`;
    alert(message);
}

// Add animation on scroll
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

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});


// Handle Volunteer Form
function handleVolunteer(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    console.log('Volunteer signup:', data);
    
    alert(`Thank you ${data.name} for joining our mission! 🐾\n\nWe'll contact you soon at ${data.email} to get you started.`);
    event.target.reset();
}

// Find Shelters Function
function findShelters() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // In a real app, you would query a database or API
                alert(`📍 Your location: ${lat.toFixed(4)}, ${lon.toFixed(4)}\n\nNearby shelters:\n\n1. City Animal Shelter - 2.3 km\n2. Paws & Claws Rescue - 4.1 km\n3. Happy Tails Foundation - 5.8 km\n\nCall us for exact directions!`);
            },
            (error) => {
                alert('Please enable location services to find nearby shelters.\n\nOr call us at: +91 78209 81034');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.\n\nPlease call us at: 1234-567-890');
    }
}

// Counter Animation for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = document.querySelectorAll('.stat-item h3');
            statItems.forEach((item, index) => {
                const targets = [500, 300, 1000];
                animateCounter(item, targets[index]);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        statsObserver.observe(heroSection);
    }
});


// Toggle Mobile Menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    
    // Change hamburger icon
    if (navMenu.classList.contains('active')) {
        hamburger.textContent = '✕';
    } else {
        hamburger.textContent = '☰';
    }
}

// Close menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        
        if (navMenu.classList.contains('active') && 
            !navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
        }
    });
});

// Emergency Modal Functions
function showEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'block';
}

function closeEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'none';
}

function quickReport() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                alert(`📍 Location sent!\n\nLat: ${lat.toFixed(6)}\nLon: ${lon.toFixed(6)}\n\nOur rescue team has been notified and will arrive shortly!`);
                closeEmergencyModal();
            },
            (error) => {
                alert('Unable to get location. Please call us directly at +91 78209 81034');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.\n\nPlease call us at: +91 78209 81034');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('emergencyModal');
    if (event.target == modal) {
        closeEmergencyModal();
    }
}

// Event Registration
function registerEvent(eventName) {
    alert(`🎉 Thank you for registering for ${eventName}!\n\nWe'll send you confirmation details at your email.\n\nSee you there! 🐾`);
}

// Newsletter Subscription
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`📬 Thank you for subscribing!\n\nWe'll send updates to ${email}\n\nWelcome to the Paw Safe family! 🐾`);
    event.target.reset();
}

// Contact Form
function handleContact(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    console.log('Contact form submitted:', data);
    alert(`Thank you ${data.name}! 📧\n\nWe've received your message and will respond to ${data.email} within 24 hours.`);
    event.target.reset();
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Load Map Function
function loadMap() {
    alert('🗺️ Map Loading...\n\nIn a real application, this would load an interactive map showing:\n\n• Animal Shelters\n• Veterinary Clinics\n• Rescue Centers\n• Pet Stores\n• Training Centers\n\nYou can integrate Google Maps API or similar service here.');
}

// Scroll to Top Button
window.onscroll = function() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Live Feed Auto-Update Simulation
let feedUpdateInterval;

function startLiveFeed() {
    const feedMessages = [
        "🐕 New rescue operation in progress at Downtown area",
        "🐈 Luna found her forever home! Congratulations!",
        "🏥 Successful surgery completed for injured stray",
        "🎉 5 puppies available for adoption today!",
        "💝 Thank you to all our donors! You're making a difference",
        "🚨 Emergency rescue completed successfully",
        "🐾 Vaccination camp scheduled for next week"
    ];
    
    feedUpdateInterval = setInterval(() => {
        const feedContainer = document.querySelector('.feed-container');
        if (feedContainer && document.querySelector('.live-feed')) {
            const randomMessage = feedMessages[Math.floor(Math.random() * feedMessages.length)];
            const newFeed = document.createElement('div');
            newFeed.className = 'feed-item';
            newFeed.innerHTML = `
                <span class="feed-time">Just now</span>
                <p>${randomMessage}</p>
            `;
            
            feedContainer.insertBefore(newFeed, feedContainer.firstChild);
            
            // Keep only last 5 items
            while (feedContainer.children.length > 5) {
                feedContainer.removeChild(feedContainer.lastChild);
            }
        }
    }, 15000); // Update every 15 seconds
}

// Initialize live feed on page load
document.addEventListener('DOMContentLoaded', () => {
    startLiveFeed();
    
    // Add smooth reveal animation to sections
    const revealSections = document.querySelectorAll('.section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'E' for emergency
    if (e.key === 'e' || e.key === 'E') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            showEmergencyModal();
        }
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        closeEmergencyModal();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});


// Optimize for mobile performance
if ('serviceWorker' in navigator) {
    // Can register service worker for offline support in future
}

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add viewport height fix for mobile browsers
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Lazy load images for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// Improve scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});

// Add touch feedback for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
});
