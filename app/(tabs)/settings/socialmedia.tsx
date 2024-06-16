import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function SocialMedia() {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect with me on Social Media</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => handlePress('https://github.com/WukerDev')}>
        <Icon name="github" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>GitHub</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => handlePress('https://www.linkedin.com/in/wiktor-kozakowski')}>
        <Icon name="linkedin" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>LinkedIn</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => handlePress('https://steamcommunity.com/id/wuker')}>
        <Icon name="steam" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Steam</Text>
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
