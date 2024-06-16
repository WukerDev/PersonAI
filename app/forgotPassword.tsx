import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

import { Text, View } from '@/components/Themed';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = () => {
        if (email !== '') {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setMessage('Password reset email sent!');
                    setError('');
                })
                .catch((error) => {
                    setError(error.message);
                    setMessage('');
                });
        } else {
            setError('Please enter your email');
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password Reset</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Example@gmail.com" 
                value={email} 
                onChangeText={setEmail} 
                placeholderTextColor="#888"
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.messageText}>{message}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 5,
    },
    input: {
        width: '80%',
        padding: 15,
        backgroundColor: '#DDD',
        borderRadius: 10,
        marginBottom: 15,
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
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageText: {
        color: 'green',
        marginTop: 15,
    },
    errorText: {
        color: 'red',
        marginTop: 15,
    },
});
