import { StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { auth, storage } from '../../../config/firebase';
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes } from 'firebase/storage';
export default function TabSettingsScreen() {
  // Dummy profile data - replace with your user's dat
  const [userProfile, setUserProfile] = useState({
    name: 'EMPTY',
    profileImage: 'https://img.freepik.com/premium-vector/unknown-person-user-icon-white_116137-2948.jpg', // Put a URL to a default image
  });
 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      // Handle possible errors that occur during logout
      console.error("Logout failed: ", error);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUserProfile({
          name: displayName || email,
          profileImage: 'https://cdn-icons-png.freepik.com/256/149/149071.png?semt=ais_hybrid' // URL to a default avatar image
        });
      } else {
        setUserProfile({
          name: 'EMPTY',
          profileImage: 'https://img.freepik.com/premium-vector/unknown-person-user-icon-white_116137-2948.jpg'
        });
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);



  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
      <TouchableOpacity>
        <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.profileName}>{userProfile.name}</Text>
      </TouchableOpacity>
    </View> 

      <View style={styles.menuContainer}>
        <Link style={styles.menuItem} href="/settings/github"><Text>GitHub</Text></Link>
        <Link style={styles.menuItem} href="/settings/help"><Text>Help & Feedback</Text></Link>
        <Link style={styles.menuItem} href="/settings/socialmedia"><Text>Social Media</Text></Link>
        <TouchableOpacity onPress={handleLogout} ><Text style={styles.menuItem}>Log Out</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image round
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    fontSize: 16,
  },
  menuContainer: {
    width: '100%',
    alignItems: 'flex-start', // Align menu items to the start
    paddingLeft: 20, // Add some padding for the menu
  },
  modalView: {
    marginTop: 50,
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'normal',
    paddingVertical: 10, // Add some vertical padding to each item
  },
});
