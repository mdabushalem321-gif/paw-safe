# 🐾 Paw Safe - Animal Rescue Platform

A comprehensive web platform for rescuing and protecting stray animals, built with Firebase for real-time data management.

## ✨ Features

### Active Features (Firebase-Powered):
1. **Report Stray Animals** - Submit reports with photos, location, and condition
2. **Adoption System** - Browse and request to adopt animals
3. **Volunteer Registration** - Sign up to help with rescue operations
4. **Event Registration** - Register for adoption drives, vaccination camps, walkathons
5. **Newsletter Subscription** - Stay updated with rescue stories
6. **Contact Form** - Send messages to the team
7. **Emergency Reports** - Quick location-based emergency reporting
8. **Live Feed** - Real-time updates from rescue operations
9. **Statistics Dashboard** - Live counters for rescues, adoptions, volunteers
10. **Admin Dashboard** - Manage all operations (admin.html)

### Additional Features:
- Dark/Light theme toggle
- Mobile responsive design
- Photo upload for reports
- Real-time database updates
- Success stories showcase
- Pet care blog
- Interactive map placeholder
- FAQ section with animations
- Testimonials
- Social media integration

## 🚀 Setup Instructions

### 1. Firebase Setup (Already Configured!)
Your Firebase project is already connected:
- Project: paw-paw-ceedf
- All credentials are in `firebase-config.js`

### 2. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: "paw-paw-ceedf"
3. Click "Firestore Database" in the left menu
4. Click "Create Database"
5. Choose "Start in test mode" (for development)
6. Select a location and click "Enable"

### 3. Enable Firebase Storage
1. In Firebase Console, click "Storage"
2. Click "Get Started"
3. Choose "Start in test mode"
4. Click "Done"

### 4. Firestore Collections
The app will automatically create these collections:
- `strayReports` - Animal reports from users
- `adoptionRequests` - Adoption applications
- `volunteers` - Volunteer signups
- `eventRegistrations` - Event registrations
- `newsletterSubscribers` - Email subscribers
- `contactMessages` - Contact form submissions
- `emergencyReports` - Emergency location reports
- `liveFeed` - Real-time activity feed
- `adoptionAnimals` - Animals available for adoption

### 5. Run the Website
Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)

**Important:** For Firebase to work properly, you should serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Then open: http://localhost:8000
```

## 📱 Pages

- **index.html** - Main website with all features
- **admin.html** - Admin dashboard to view all submissions

## 🎨 Customization

### Colors
Edit `style.css` to change the color scheme:
```css
:root {
    --primary: #FF6B6B;
    --secondary: #4ECDC4;
    --accent: #FFE66D;
}
```

### Firebase Rules (Production)
For production, update Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🔧 Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Firebase Firestore (Database)
- Firebase Storage (File uploads)
- Firebase Analytics
- Responsive Design
- Modern CSS Grid & Flexbox

## 📊 Admin Dashboard

Access the admin dashboard at `admin.html` to:
- View all stray reports
- Manage adoption requests
- See volunteer list
- Read contact messages
- Monitor statistics in real-time

## 🐾 How It Works

1. **Users report strays** → Data saved to Firestore → Team notified
2. **Users request adoption** → Request logged → Team contacts user
3. **Volunteers sign up** → Profile created → Training info sent
4. **Events registered** → Confirmation sent → Attendance tracked
5. **All activity** → Updates live feed in real-time

## 🎯 Next Steps

1. Add authentication for admin dashboard
2. Implement email notifications (Firebase Functions)
3. Add Google Maps integration for location
4. Create mobile app version
5. Add payment gateway for donations
6. Implement SMS notifications

## 📝 License

Made with ❤️ for all the animals

## 🤝 Contributing

This is a school/college project. Feel free to enhance and customize!

---

**Emergency Contact:** 1234-567-890
**Email:** contact@pawsafe.org
