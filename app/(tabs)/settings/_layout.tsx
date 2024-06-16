import { Stack, router } from 'expo-router';


const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="account" options={{ headerTitle: "Account" }} />
      <Stack.Screen name="chatbot" options={{ headerTitle: "Chatbot" }} />
      <Stack.Screen name="github" options={{ headerTitle: "GitHub" }} />
      <Stack.Screen name="help" options={{ headerTitle: "Help & Feedback" }} />
      <Stack.Screen name="socialmedia" options={{ headerTitle: "Social Media" }} />
    </Stack>
  );
}

export default StackLayout;
