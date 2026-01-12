# 🎬 Movie Catalogue App

A modern React Native mobile application built with Expo, TypeScript, and Firebase Authentication. Browse drama movies, search through collections, and manage your profile with ease.


## 📱 Features

### 🔐 Authentication
- **Email/Password Login** with validation
- **Google Sign-In** integration
- **Sign Up** with name, email, and password
- **Password Reset** via email
- **Session Persistence** - Stay logged in
- **Show/Hide Password** toggle

### 🎥 Movie Features
- **Browse Movies** - Drama collection from API
- **Search Movies** - Real-time search by title
- **Movie Details** - View full movie information
- **Pull-to-Refresh** - Get latest movies
- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error messages

### ⚙️ Settings & Profile
- **User Profile** - View avatar, name, and email
- **Notifications Toggle** - Enable/disable notifications
- **Settings Panel** - Language, privacy, help & support
- **Logout** - Secure logout with confirmation
- **App Version** - Display current version

---

## 🛠️ Tech Stack

### Core Technologies
- **React Native** `0.81.5` - Mobile framework
- **Expo** `~54.0.31` - Development platform
- **TypeScript** `~5.9.2` - Type safety
- **React** `19.1.0` - UI library

### Navigation & UI
- **React Navigation** `^7.1.18` - Screen navigation
- **React Native Paper** `^5.14.5` - Material Design UI
- **React Native Safe Area Context** `~5.6.0` - Safe area handling

### Authentication & Backend
- **Firebase** `^12.4.0` - Authentication & backend
- **Expo Auth Session** `~7.0.10` - OAuth integration

### Development Tools
- **ESLint** `^8.57.1` - Code linting
- **Jest** `~54.0.16` - Testing framework
- **TypeScript** - Static typing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo CLI** - `npm install -g expo-cli`
- **Git** - Version control
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **Expo Go App** - On your mobile device

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MovieCatalogueApp.git
cd MovieCatalogueApp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Email/Password** and **Google** authentication
3. Get your Web app configuration
4. Create `src/utils/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. Update Google Client ID

Update the Google Client ID in `src/screens/LoginScreen.tsx`:

```typescript
const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
});
```

---

## 🏃‍♂️ Running the App

### Start Development Server

```bash
npm start
# or
expo start
```

### Run on Different Platforms

#### Web
```bash
npm run web
# or press 'w' in terminal
```

#### Android
```bash
npm run android
# or press 'a' in terminal
# or scan QR with Expo Go app
```

#### iOS (Mac only)
```bash
npm run ios
# or press 'i' in terminal
# or scan QR with Camera app
```

---

## 📱 Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build -p android --profile preview
```

### iOS Build

```bash
# Build for iOS
eas build -p ios --profile preview
```

---

## 📂 Project Structure

```
MovieCatalogueApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── MovieCard.tsx    # Movie card component
│   │   ├── SearchBar.tsx    # Search input component
│   │   └── TopNavButtons.tsx # Navigation buttons
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # Stack navigator setup
│   ├── screens/             # App screens
│   │   ├── LoginScreen.tsx       # Login & signup
│   │   ├── MovieListScreen.tsx   # Movie list & search
│   │   ├── MovieDetailScreen.tsx # Movie details
│   │   └── SettingsScreen.tsx    # User settings
│   ├── services/            # API services
│   │   └── movieService.ts  # Movie API calls
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   └── utils/               # Utility functions
│       └── firebase.ts      # Firebase configuration
├── assets/                  # Images & icons
├── App.tsx                  # Root component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

---

## 🎨 Screenshots

### Login Screen
- Email/Password login
- Google Sign-In
- Sign Up modal
- Password reset

### Movie List
- Browse drama movies
- Real-time search
- Pull-to-refresh
- Movie cards with posters

### Movie Details
- Full poster image
- Movie title and IMDB ID
- Description
- Additional information

### Settings
- User profile with avatar
- Notification settings
- App preferences
- Logout option

---

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Movie Catalogue App",
    "slug": "MovieCatalogueApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "android": {
      "package": "com.testingapp.moviecatalogueapp"
    },
    "ios": {
      "bundleIdentifier": "com.testingapp.moviecatalogueapp"
    }
  }
}
```

### TypeScript Configuration (`tsconfig.json`)

TypeScript is pre-configured with strict mode for better type safety.

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

---

## 🌐 API

### Movies API
- **Endpoint**: `https://api.sampleapis.com/movies/drama`
- **Method**: GET
- **Response Format**:

```json
[
  {
    "id": 1,
    "title": "Black Panther",
    "posterURL": "https://...",
    "imdbId": "tt1825683"
  }
]
```

---

## 🔐 Firebase Setup Guide

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name: "MovieCatalogueApp"
4. Enable Google Analytics (optional)
5. Create Project

### 2. Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google**
4. Add support email
5. Save

### 3. Get Web App Config
1. Click **⚙️ Settings** → **Project settings**
2. Scroll to "Your apps"
3. Click **Web** icon (</>) 
4. Register app
5. Copy configuration object

### 4. Get Google Client ID
1. In Firebase Console → **Authentication** → **Sign-in method**
2. Click **Google**
3. Expand **Web SDK configuration**
4. Copy **Web client ID**

---

## 🐛 Common Issues & Solutions

### Issue: Firebase not initialized
**Solution**: Ensure `firebase.ts` is created with correct configuration

### Issue: Google Sign-In not working
**Solution**: 
- Verify Google Client ID is correct
- Ensure Google Sign-In is enabled in Firebase Console
- Check OAuth consent screen is configured

### Issue: Module not found
**Solution**:
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Issue: Build fails
**Solution**:
```bash
# Clear cache
expo start -c

# Update dependencies
npm install
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |
| `npm run web` | Run in web browser |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - For the amazing development platform
- [Firebase](https://firebase.google.com/) - For authentication services
- [Sample APIs](https://sampleapis.com/) - For the movies API
- [React Native Paper](https://reactnativepaper.com/) - For Material Design components
- [React Navigation](https://reactnavigation.org/) - For navigation solution

---

## 📊 Project Stats

- **Total Files**: 15+
- **Lines of Code**: 2000+
- **Components**: 4
- **Screens**: 4
- **Type Safety**: 100% TypeScript

---

## 🚀 Future Enhancements

- [ ] Add movie favorites/watchlist
- [ ] Implement dark mode
- [ ] Add different movie genres
- [ ] Integrate movie ratings
- [ ] Add user reviews
- [ ] Implement movie recommendations
- [ ] Add offline mode
- [ ] Social sharing features
- [ ] Advanced search filters
- [ ] User profile customization

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/MovieCatalogueApp/issues) page
2. Create a new issue if your problem isn't listed
3. Contact the maintainer

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ using React Native & TypeScript**
