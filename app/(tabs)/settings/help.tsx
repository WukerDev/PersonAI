import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Help() {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Feedback</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => handlePress('https://github.com/WukerDev/IFAI-App#readme')}>
        <Icon name="book" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>GitHub README</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => handlePress('https://github.com/WukerDev/IFAI-App/issues')}>
        <Icon name="bug" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Report Issues</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
