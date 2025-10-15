// import TopNavButtons from '@/components/TopNavButtons';
// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const ProfileScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContent}>
//         <View style={styles.profileContainer}>
//           <Image
//             source={{
//               uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//             }}
//             style={styles.avatar}
//           />
//           <Text style={styles.name}>Vijaykumar</Text>
//           <Text style={styles.email}>test@example.com</Text>
//         </View>
//       </View>

//       <View style={styles.bottomNav}>
//         <TopNavButtons />
//       </View>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   profileContent: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//     marginTop: 30,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 12,
//     marginHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 15,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#333',
//   },
//   email: {
//     fontSize: 16,
//     color: '#777',
//     marginBottom: 20,
//   },
//   bottomNav: {
//     paddingBottom: 10,
//     paddingTop: 5,
//     backgroundColor: '#f8f9fa',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
// });





import TopNavButtons from '@/components/TopNavButtons';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // No user is signed in, navigate back to login
        navigation.replace('LoginScreen');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Fallback avatar if no photoURL
  const avatarUri = user?.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  // Fallback name if no displayName (use email prefix)
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatar}
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          />
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TopNavButtons />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  profileContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: '#f0f0f0', // Fallback background if image fails
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  bottomNav: {
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});