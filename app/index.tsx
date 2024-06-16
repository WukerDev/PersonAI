import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, useColorScheme, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { router, Redirect } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { auth } from '../config/firebase';

const { width } = Dimensions.get('window');

// Function to check if user is logged in and has a valid name
const isValidUser = (user) => {
  return user && user.displayName;
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function WelcomeScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Simulating an async check for user
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Adjust the timeout duration as needed
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    checkUser();
  }, []);

  // Handle scroll event
  const handleScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setCurrentPage(indexOfNextScreen);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < 3) { // 3 is the index of the last page
      scrollViewRef.current.scrollTo({ x: width * (currentPage + 1), animated: true });
    }
  };

  // Navigate to login
  const navigateToLogin = () => {
    router.push('./login');
  };

  // Navigate to register
  const navigateToRegister = () => {
    router.push('./register');
  };

  const slideImages = {
    logo: {
      main: require('../assets/images/logo.png'),
    },
    slide3: {
      light: require('../assets/images/slaj1light.png'),
      dark: require('../assets/images/slaj1dark.png')
    },
    slide2: {
      light: require('../assets/images/slaj2light.png'),
      dark: require('../assets/images/slaj2dark.png')
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (isValidUser(auth.currentUser)) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
      >
        {/* Each "page" of the ScrollView */}
        <View style={styles.slide}>
          <Text style={colorScheme === 'dark' ? styles.slideTextdark : styles.slideText}>Welcome to PersonAI!</Text>
          <Image source={slideImages.logo.main} style={styles.image2} />
        </View>
        <View style={styles.slide}>
          <Text style={colorScheme === 'dark' ? styles.slideTextdark : styles.slideText}>Discover new chatbots and have engaging conversations!</Text>
          <Image source={colorScheme === 'dark' ? slideImages.slide2.dark : slideImages.slide2.light} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={colorScheme === 'dark' ? styles.slideTextdark : styles.slideText}>Get help from AI specialists tailored to your needs</Text>
          <Image source={colorScheme === 'dark' ? slideImages.slide3.dark : slideImages.slide3.light} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Text style={colorScheme === 'dark' ? styles.slideTextdark : styles.slideText}>Get Started</Text>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dotsWrapper}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={[styles.dot, currentPage === index && styles.activeDot]} />
        ))}
      </View>

      {/* Next page button */}
      <TouchableOpacity onPress={goToNextPage} style={styles.nextButton}>
        <TabBarIcon name="arrow-right" color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  slideTextdark: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFF',
  },
  image: { //make the image scalable to screen size
    width: width,
    height: width * 1.5,
    resizeMode: 'contain',
    marginTop: 20,
  },
  image2: { //make the image scalable to screen size
    width: width,
    height: width * 0.5,
    resizeMode: 'contain',
    marginTop: 20,
  },
  dotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#888',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
