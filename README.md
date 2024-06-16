
# PersonAI: Chat with Personalized Intelligence 🚀

[![Expo](https://img.shields.io/badge/Expo-^44.0.0-blue.svg)](https://docs.expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-^0.71.0-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-^5.1.0-blue.svg)](https://www.typescriptlang.org/)

## Table of Contents 📑
- [PersonAI: Chat with Personalized Intelligence 🚀](#personai-chat-with-personalized-intelligence-)
  - [Table of Contents 📑](#table-of-contents-)
  - [Project Description 📜](#project-description-)
  - [Features 🌟](#features-)
  - [Technologies Used 🛠️](#technologies-used-️)
  - [Installation ⚙️](#installation-️)
    - [Prerequisites ✅](#prerequisites-)
    - [Steps 📋](#steps-)
  - [Usage 📲](#usage-)
  - [Contributing 🤝](#contributing-)
  - [License 📄](#license-)

## Project Description 📜

Welcome to the IFAI Chat Bot App repository! This project is a chat application that allows users to interact with various AI-powered personas, such as a yoga specialist, life coach, and more. The app leverages OpenAI's GPT-3.5-turbo/GPT-4 model to provide engaging and context-aware conversations.

## Screenshots 🌟
![slaj1light](https://github.com/WukerDev/PersonAI/assets/108416911/d6a7188a-545d-4733-a487-9d35cf5bd2be | width=100)    ![slaj2light](https://github.com/WukerDev/PersonAI/assets/108416911/49d85481-8986-4f48-aad8-d368f538058b | width=100)






## Features 🌟

- **Multiple AI Personas**: Users can choose from various AI personas like a yoga specialist, life coach, and more for personalized conversations.
- **User Authentication**: Secure user authentication using Firebase Authentication.
- **Real-time Messaging**: Real-time message synchronization using Firebase Firestore.
- **Dark Mode Support**: The app adapts to the device's dark mode setting for a better user experience.
- **Typing Indicator**: Displays a typing indicator when the AI is generating a response.
- **Chat History**: Persist chat history for each user, allowing users to continue their conversations where they left off.

## Technologies Used 🛠️

- **React Native**: Framework for building native apps using React.
- **Expo**: A platform for making React Native development easier.
- **Firebase Authentication**: Secure authentication system by Firebase.
- **Firebase Firestore**: Real-time NoSQL database by Firebase.
- **OpenAI API**: API for AI-generated responses using GPT-3.5-turbo/GPT-4.
- **React Navigation**: Library for routing and navigation in React Native apps.
- **GiftedChat**: Customizable chat UI for React Native.

## Installation ⚙️

### Prerequisites ✅

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A package manager like npm or yarn
- .env file with a Firebase api configurated

### Steps 📋

1. Clone the repository:
   ```bash
   git clone https://github.com/WukerDev/Ifai-Inzynierka.git
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run android
   ```

## Usage 📲

1. **Run the app on your preferred device or emulator**:
   - Use the Expo Go app for quick testing on a physical device.
   - Use an emulator (like Android Studio or Xcode) for testing on a virtual device.

2. **Register or log in with your credentials**:
   - The app uses Firebase Authentication, so you can sign up with an email and password or log in if you already have an account.

3. **Choose an AI persona to start a conversation**:
   - Once logged in, you can select from various AI personas. Each persona provides a unique conversational experience.

4. **Chat with the selected persona and enjoy the AI-powered responses**:
   - Type your messages in the chat input and send them. The AI will respond based on its persona's characteristics and the conversation context.

5. **Dark Mode Support**:
   - The app automatically adapts to your device's dark mode setting to provide a comfortable user experience in low-light environments.

6. **Real-time Messaging**:
   - Messages are synchronized in real-time using Firebase Firestore, ensuring a smooth and responsive chat experience.

7. **Typing Indicator**:
   - The app shows a typing indicator when the AI is generating a response, giving you a more interactive and realistic chat experience.

8. **Chat History**:
   - Your chat history is saved, allowing you to pick up conversations where you left off during future sessions.

## Contributing 🤝

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License 📄

This project is licensed under the [MIT License](LICENSE).
