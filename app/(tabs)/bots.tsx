import { StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { router, Redirect } from 'expo-router';
import { collection, getDocs, query, onSnapshot, orderBy, addDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const screenWidth = Dimensions.get('window').width;

export default function TabBotsScreen() {
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const startChat = async (name, placeholder, profile, id, prompt) => {
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'chats-history'), {
        botId: id,
        botName: name,
        botPlaceholder: placeholder,
        botProfile: profile,
        botPrompt: prompt,
        lastMessage: 'New Chat Started!',
        lastUpdate: new Date(),
        userId: auth.currentUser.uid,
      });
      console.log('Chat started:', docRef);

      const chatId = docRef.id;
      router.push(`/(tabs)`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.botItem}>
      <Image source={{ uri: item.botProfile }} style={styles.botImage} />
      <View style={styles.botInfo}>
        <Text style={styles.botName}>{item.botName}</Text>
        <Text style={styles.botDetails}>{item.botDetails}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => startChat(item.botName, item.botPlaceholder, item.botProfile, item.botId, item.botPrompt)}>
        <Text style={styles.addButtonText}>Start Chat</Text>
      </TouchableOpacity>
    </View>
  );

  useLayoutEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, 'bots');
    console.log('Bots Snapshot Loaded!');
    const q = query(collectionRef, orderBy('botName', 'asc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const sortedDocs = snapshot.docs.sort((a, b) => {
        const nameA = a.data().botName.toLowerCase();
        const nameB = b.data().botName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setBots(
        sortedDocs.map(doc => ({
          botId: doc.id,
          botName: doc.data().botName,
          botDetails: doc.data().botDetails,
          botPlaceholder: doc.data().botPlaceholder,
          botProfile: doc.data().botProfile,
          botPrompt: doc.data().botPrompt
        }))
      );
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.activity} />
      ) : (
        <FlatList
          data={bots}
          renderItem={renderItem}
          keyExtractor={item => item.botId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  botInfo: {
    flex: 1,
    marginLeft: 10,
  },
  botImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  botName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botDetails: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
