import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text as ThemedText, View as ThemedView } from '@/components/Themed';

export default function Help() {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState(0);

  const radio_props = [
    { label: 'gpt-4', value: 0 },
    { label: 'gpt-4-turbo', value: 1 },
    { label: 'gpt-4o', value: 2 },
    { label: 'gpt-3.5-turbo-0125', value: 3 }

  ];

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const saveApiKey = () => {
    console.log('API Key saved:', apiKey);
    Alert.alert('Success', 'API Key saved successfully');
  };

  const addNewBot = () => {
    console.log('Add new bot button clicked');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Select ChatGPT Model</ThemedText>
      <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={(value) => setSelectedModel(value)}
        formHorizontal={false}
        labelHorizontal={true}
        buttonColor={'#2196f3'}
        animation={true}
        selectedButtonColor={'#2196f3'}
      />

      <View style={styles.separator} />

      <ThemedText style={styles.title}>OpenAI API Key</ThemedText>
      <TextInput
        style={styles.input}
        secureTextEntry={!showApiKey}
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter your OpenAI API Key"
      />
      <TouchableOpacity onPress={toggleApiKeyVisibility} style={styles.toggleButton}>
        <Text>{showApiKey ? 'Hide' : 'Show'} API Key</Text>
      </TouchableOpacity>
      <Button title="Save API Key" onPress={saveApiKey} />

      <View style={styles.separator} />

      <Button title="Add New Bot" onPress={addNewBot} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  toggleButton: {
    marginBottom: 16,
  },
});
