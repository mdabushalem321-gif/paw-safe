// Import Firebase modules
import { db, storage, collection, addDoc, getDocs, query, orderBy, limit, onSnapshot, ref, uploadBytes, getDownloadURL } from './firebase-config.js';

// Global state
let uploadedPhotoURL = null;

// ==================== REPORT STRAY ANIMAL ====================
window.handleReport = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        const reportData = {
            location: formData.get('location'),
            condition: formData.get('condition'),
            details: formData.get('details'),
            contact: formData.get('contact'),
            photoURL: uploadedPhotoURL || null,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Add to Firestore
        const docRef = await addDoc(collection(db, 'strayReports'), reportData);
        
        alert(`✅ Report submitted successfully!\n\nReport ID: ${docRef.id}\n\nOur rescue team has been notified and will respond shortly. Thank you for helping! 🐾`);
        event.target.reset();
        uploadedPhotoURL = null;
        
        // Add to live feed
        addToLiveFeed(`🚨 New stray reported at ${reportData.location}`);
        
    } catch (error) {
        console.error('Error submitting report:', error);
        alert('❌ Error submitting report. Please try again or call us directly at +91 78209 81034');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Report';
    }
};

// Handle photo upload
document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.querySelector('input[name="photo"]');
    if (photoInput) {
        photoInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const storageRef = ref(storage, `stray-reports/${Date.now()}_${file.name}`);
                    await uploadBytes(storageRef, file);
                    uploadedPhotoURL = await getDownloadURL(storageRef);
                    console.log('Photo uploaded:', uploadedPhotoURL);
                } catch (error) {
                    console.error('Error uploading photo:', error);
                    alert('Error uploading photo. Report will be submitted without photo.');
                }
            }
        });
    }
});

// ==================== ADOPTION ====================
window.adoptAnimal = async function(name) {
    const userEmail = prompt(`🐾 Adopt ${name}\n\nPlease enter your email address to start the adoption process:`);
    
    if (userEmail && userEmail.includes('@')) {
        try {
            const adoptionData = {
                animalName: name,
                userEmail: userEmail,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };
            
            const docRef = await addDoc(collection(db, 'adoptionRequests'), adoptionData);
            
            alert(`🎉 Adoption request submitted!\n\nApplication ID: ${docRef.id}\n\nWe'll contact you at ${userEmail} within 24 hours to schedule a meet & greet with ${name}!\n\nThank you for choosing to adopt! 🐾`);
            
            // Add to live feed
            addToLiveFeed(`💝 New adoption request for ${name}!`);
            
        } catch (error) {
            console.error('Error submitting adoption:', error);
            alert('Error submitting request. Please contact us directly.');
        }
    } else if (userEmail) {
        alert('Please enter a valid email address.');
    }
};

// ==================== VOLUNTEER SIGNUP ====================
window.handleVolunteer = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        const volunteerData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            interest: formData.get('interest'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            status: 'active'
        };
        
        const docRef = await addDoc(collection(db, 'volunteers'), volunteerData);
        
        alert(`🎉 Welcome to the team, ${volunteerData.name}!\n\nVolunteer ID: ${docRef.id}\n\nWe'll contact you at ${volunteerData.email} with next steps and training information.\n\nThank you for joining our mission! 🐾`);
        event.target.reset();
        
        // Add to live feed
        addToLiveFeed(`🙋 New volunteer joined: ${volunteerData.name}`);
        
    } catch (error) {
        console.error('Error submitting volunteer form:', error);
        alert('Error submitting form. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join Us';
    }
};

// ==================== EVENT REGISTRATION ====================
window.registerEvent = async function(eventName) {
    const userName = prompt(`📅 Register for ${eventName}\n\nPlease enter your name:`);
    const userEmail = prompt('Please enter your email:');
    const userPhone = prompt('Please enter your phone number:');
    
    if (userName && userEmail && userPhone) {
        try {
            const registrationData = {
                eventName: eventName,
                userName: userName,
                userEmail: userEmail,
                userPhone: userPhone,
                timestamp: new Date().toISOString(),
                status: 'confirmed'
            };
            
            const docRef = await addDoc(collection(db, 'eventRegistrations'), registrationData);
            
            alert(`✅ Registration Confirmed!\n\nEvent: ${eventName}\nName: ${userName}\nConfirmation ID: ${docRef.id}\n\nWe'll send details to ${userEmail}\n\nSee you there! 🎉`);
            
            // Add to live feed
            addToLiveFeed(`📅 ${userName} registered for ${eventName}`);
            
        } catch (error) {
            console.error('Error registering for event:', error);
            alert('Error registering. Please try again.');
        }
    }
};

// ==================== NEWSLETTER SUBSCRIPTION ====================
window.handleNewsletter = async function(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    
    try {
        const subscriptionData = {
            email: email,
            timestamp: new Date().toISOString(),
            status: 'active'
        };
        
        await addDoc(collection(db, 'newsletterSubscribers'), subscriptionData);
        
        alert(`📬 Successfully subscribed!\n\nWelcome to the Paw Safe family!\n\nYou'll receive updates at: ${email}\n\n🐾`);
        event.target.reset();
        
    } catch (error) {
        console.error('Error subscribing:', error);
        alert('Error subscribing. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
    }
};

// ==================== CONTACT FORM ====================
window.handleContact = async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString(),
            status: 'unread'
        };
        
        const docRef = await addDoc(collection(db, 'contactMessages'), contactData);
        
        alert(`✅ Message sent successfully!\n\nTicket ID: ${docRef.id}\n\nThank you ${contactData.name}!\n\nWe'll respond to ${contactData.email} within 24 hours. 📧`);
        event.target.reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again or call us directly.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
};

// ==================== LIVE FEED ====================
function addToLiveFeed(message) {
    const feedContainer = document.querySelector('.feed-container');
    if (feedContainer) {
        const newFeed = document.createElement('div');
        newFeed.className = 'feed-item';
        newFeed.innerHTML = `
            <span class="feed-time">Just now</span>
            <p>${message}</p>
        `;
        
        feedContainer.insertBefore(newFeed, feedContainer.firstChild);
        
        // Keep only last 5 items
        while (feedContainer.children.length > 5) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
    }
}

// Load live feed from Firebase
async function loadLiveFeed() {
    try {
        const q = query(collection(db, 'liveFeed'), orderBy('timestamp', 'desc'), limit(5));
        
        onSnapshot(q, (snapshot) => {
            const feedContainer = document.querySelector('.feed-container');
            if (feedContainer) {
                feedContainer.innerHTML = '';
                
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const timeAgo = getTimeAgo(new Date(data.timestamp));
                    
                    const feedItem = document.createElement('div');
                    feedItem.className = 'feed-item';
                    feedItem.innerHTML = `
                        <span class="feed-time">${timeAgo}</span>
                        <p>${data.message}</p>
                    `;
                    feedContainer.appendChild(feedItem);
                });
            }
        });
    } catch (error) {
        console.error('Error loading live feed:', error);
    }
}

// Helper function to calculate time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

// ==================== LOAD ADOPTION ANIMALS ====================
async function loadAdoptionAnimals() {
    try {
        const querySnapshot = await getDocs(collection(db, 'adoptionAnimals'));
        const adoptionGrid = document.querySelector('.adoption-grid');
        
        if (adoptionGrid && !querySnapshot.empty) {
            adoptionGrid.innerHTML = '';
            
            querySnapshot.forEach((doc) => {
                const animal = doc.data();
                const card = document.createElement('div');
                card.className = 'animal-card';
                card.innerHTML = `
                    <img src="${animal.photoURL}" alt="${animal.name}" class="animal-photo">
                    <h3>${animal.name}</h3>
                    <p class="age">Age: ${animal.age} • ${animal.gender}</p>
                    <p class="breed">${animal.breed}</p>
                    <p class="status ${animal.status}">${animal.status}</p>
                    <p class="description">${animal.description}</p>
                    <button class="btn btn-primary" onclick="adoptAnimal('${animal.name}')">Adopt Me</button>
                `;
                adoptionGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading animals:', error);
    }
}

// ==================== STATISTICS COUNTER ====================
async function updateStatistics() {
    try {
        const reportsSnapshot = await getDocs(collection(db, 'strayReports'));
        const adoptionsSnapshot = await getDocs(collection(db, 'adoptionRequests'));
        const volunteersSnapshot = await getDocs(collection(db, 'volunteers'));
        
        const stats = document.querySelectorAll('.stat-item h3');
        if (stats.length >= 3) {
            animateCounter(stats[0], reportsSnapshot.size || 500);
            animateCounter(stats[1], adoptionsSnapshot.size || 300);
            animateCounter(stats[2], volunteersSnapshot.size || 1000);
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

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

// ==================== QUICK EMERGENCY REPORT ====================
window.quickReport = async function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                try {
                    const emergencyData = {
                        location: `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`,
                        condition: 'emergency',
                        details: 'Quick emergency report via location',
                        timestamp: new Date().toISOString(),
                        status: 'urgent',
                        coordinates: { lat, lon }
                    };
                    
                    const docRef = await addDoc(collection(db, 'emergencyReports'), emergencyData);
                    
                    alert(`🚨 Emergency Report Sent!\n\nReport ID: ${docRef.id}\nLocation: ${lat.toFixed(6)}, ${lon.toFixed(6)}\n\nOur rescue team has been notified and will arrive shortly!`);
                    
                    closeEmergencyModal();
                    
                    // Add to live feed
                    addToLiveFeed('🚨 Emergency rescue operation initiated');
                    
                } catch (error) {
                    console.error('Error sending emergency report:', error);
                    alert('Error sending report. Please call us directly at +91 78209 81034');
                }
            },
            (error) => {
                alert('Unable to get location. Please call us directly at +91 78209 81034');
            }
        );
    } else {
        alert('Geolocation not supported. Please call: +91 78209 81034');
    }
};

// ==================== INITIALIZE ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 Paw Safe - Firebase Connected!');
    
    // Load dynamic content
    loadLiveFeed();
    loadAdoptionAnimals();
    updateStatistics();
    
    // Set up real-time listeners
    setupRealtimeListeners();
});

// Setup real-time listeners for live updates
function setupRealtimeListeners() {
    // Listen for new reports
    onSnapshot(collection(db, 'strayReports'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                console.log('New report:', change.doc.data());
            }
        });
    });
}

// Export functions for use in other scripts
window.db = db;
window.storage = storage;
