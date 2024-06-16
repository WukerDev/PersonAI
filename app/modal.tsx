import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function Modal() {
  const [showAppOptions, setShowAppOptions] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>IFAI App</Text>
      <Text style={styles.description}>
        Welcome to the IFAI app! Choose different personas to chat with, such as a yoga specialist, life coach, and more.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
});
