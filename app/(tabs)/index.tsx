import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { useState, useLayoutEffect } from 'react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db, auth } from '../../config/firebase';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const userId = auth.currentUser?.uid;

  useLayoutEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    const collectionRef = collection(db, 'chats-history');
    const q = query(
      collectionRef,
      where('userId', '==', userId),
      orderBy('lastUpdate', 'desc')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('Chats Snapshot Loaded!');
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          botName: doc.data().botName,
          botProfile: doc.data().botProfile,
          botPlaceholder: doc.data().botPlaceholder,
          botPrompt: doc.data().botPrompt,
          lastMessage: doc.data().lastMessage,
          lastUpdate: formatTimestamp(doc.data().lastUpdate.seconds * 1000).toLocaleString()
        }))
      );
      setIsLoading(false);
    }, error => {
      console.error('Error fetching chats: ', error);
      if (error.code === 'failed-precondition') {
        setError('The required index is currently being built. Please try again later.');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  const renderChatItem = ({ item }) => (
    <Link href={{ pathname: `/chat/[chatid]`, params: { chatid: item.id, botName: item.botName, botAvatar: item.botProfile, botPlaceholder: item.botPlaceholder, botPrompt: item.botPrompt } }} asChild>
      <TouchableOpacity style={styles.chatItem}>
        <Image source={{ uri: item.botProfile }} style={styles.profileImage} />
        <View style={styles.messageContainer}>
          <Text style={styles.senderName}>{item.botName}</Text>
          <Text numberOfLines={1} style={styles.latestMessage}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.timestamp}>{item.lastUpdate}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.activity} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          style={styles.chatList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  latestMessage: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  chatList: {
    width: '100%',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
