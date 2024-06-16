import { StyleSheet, useColorScheme, View, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { useState, useLayoutEffect } from 'react';
import { GiftedChat, IMessage, Avatar, Bubble } from 'react-native-gifted-chat';
import { collection, getDocs, orderBy, query, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import Colors from '@/constants/Colors';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const darkMode = useColorScheme() === 'dark';
  const user = auth.currentUser;

  const navigation = useNavigation();
  const { chatid, botName, botAvatar, botPlaceholder, botPrompt } = useLocalSearchParams();
  const hash = chatid;

  useLayoutEffect(() => {
    const messagesCollectionRef = collection(db, 'chats-history', hash, 'messages');
    const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribeMessages = onSnapshot(messagesQuery, snapshot => {
      if (snapshot.empty) {
        setIsTyping(true);
        fetchInitialBotMessage();
      } else {
        console.log('Messages Snapshot Loaded!');
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user
          }))
        );
      }
    });

    return () => unsubscribeMessages();
  }, [hash]);

  const fetchInitialBotMessage = async () => {
    const chatsHistoryRef = doc(db, 'chats-history', hash);
    const initialPrompt = botPrompt;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer NULL',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: initialPrompt }],
        temperature: 0.7
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiText = data.choices[0].message.content;
      setIsTyping(true);

      const splitMessages = aiText.split('\n\n');

      splitMessages.forEach((text, index) => {
        setTimeout(async () => {
          const botMessage = {
            _id: new Date().getTime() + index,
            createdAt: new Date(),
            text: text,
            user: {
              _id: 2,
              name: botName,
              avatar: botAvatar,
            },
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
          addDoc(collection(db, 'chats-history', hash, 'messages'), {
            _id: botMessage._id,
            createdAt: botMessage.createdAt,
            text: text,
            user: botMessage.user
          });
        }, index * 4500);
      });

      setTimeout(async () => {
        setIsTyping(false);
      }, (splitMessages.length - 1) * 4500);

      updateDoc(chatsHistoryRef, {
        lastMessage: splitMessages[splitMessages.length - 1],
        lastUpdate: new Date()
      });

    } else {
      console.error("Failed to fetch response from OpenAI:", response.status);
    }
  };

  const fetchContextForAPI = async (currentText) => {
    const messagesCollectionRef = collection(db, 'chats-history', hash, 'messages');
    const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(messagesQuery);
    const contextMessages = snapshot.docs.map(doc => ({
      role: doc.data().user._id === 1 ? 'user' : 'assistant',
      content: doc.data().text
    })).reverse();

    return contextMessages;
  };

  const onSend = React.useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    setIsTyping(true);

    const { _id, createdAt, text, user } = messages[0];
    const chatsHistoryRef = doc(db, 'chats-history', hash);

    updateDoc(chatsHistoryRef, {
      lastMessage: text,
      lastUpdate: createdAt
    });

    addDoc(collection(db, 'chats-history', hash, 'messages'), {
      _id,
      createdAt,
      text,
      user
    });

    const contextMessages = await fetchContextForAPI(text);
    const fullContextMessages = [{ role: 'system', content: botPrompt }].concat(contextMessages, [{ role: 'user', content: text }]);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer NULL`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: fullContextMessages,
        temperature: 0.7
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const aiText = data.choices[0].message.content;
      const splitMessages = aiText.split('\n\n');

      splitMessages.forEach((text, index) => {
        setTimeout(async () => {
          const botMessage = {
            _id: new Date().getTime() + index,
            createdAt: new Date(),
            text: text,
            user: {
              _id: 2,
              name: botName,
              avatar: botAvatar,
            },
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
          addDoc(collection(db, 'chats-history', hash, 'messages'), {
            _id: botMessage._id,
            createdAt: botMessage.createdAt,
            text: text,
            user: botMessage.user
          });
        }, index * 4500);

        setTimeout(async () => {
          setIsTyping(false);
        }, (splitMessages.length - 1) * 4500);
      });

      updateDoc(chatsHistoryRef, {
        lastMessage: splitMessages[splitMessages.length - 1],
        lastUpdate: new Date()
      });
    } else {
      console.error("Failed to fetch response from OpenAI:", response.status);
    }
  }, [hash]);

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: botName });
  }, [navigation]);

  const renderFooter = () => {
    if (isTyping) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.typingIndicator}>Typing...</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? Colors.dark.chatbox : Colors.light.chatbox }]}>
      <GiftedChat
        messages={messages}
        timeFormat='HH:mm'
        dateFormat='DD/MM/YYYY'
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        placeholder={botPlaceholder}
        isTyping={isTyping}
        renderFooter={renderFooter}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: auth.currentUser.email
        }}
        renderAvatar={(props) => (
          <Avatar
            {...props}
            imageStyle={{
              left: styles.avatarLeft,
              right: styles.avatarRight,
            }}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: darkMode ? Colors.dark.background : Colors.light.background,
              },
              right: {
                backgroundColor: '#007AFF',
              },
            }}
            textStyle={{
              left: {
                color: darkMode ? Colors.dark.text : Colors.light.text,
              },
              right: {
                color: '#fff',
              },
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarLeft: {
    borderRadius: 20,
    marginLeft: -5,
    marginRight: -10,
    height: 50,
    width: 50,
  },
  avatarRight: {
    borderRadius: 20,
    height: 50,
    marginRight: -5,
    marginLeft: -10,
    width: 50,
  },
  footerContainer: {
    marginBottom: 10,
    marginLeft: 10,
  },
  typingIndicator: {
  },
});
