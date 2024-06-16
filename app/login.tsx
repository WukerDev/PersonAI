import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

import { Text, View } from '@/components/Themed';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if(email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    router.push('/(tabs)');
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            setError('Fill in all fields');
        }
    };

    const handleForgotPassword = () => {
        // Navigate to the Forgot Password screen
        router.push('/forgotPassword');
    };

    const handleSignUp = () => {
        // Navigate to the Sign-Up screen
        router.push('/register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Example@gmail.com" 
                value={email} 
                onChangeText={setEmail} 
                placeholderTextColor="#888"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
                placeholderTextColor="#888"
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {error ? (
                <>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.linkText}>Do not have an account?</Text>
                    </TouchableOpacity>
                </>
            ) : null}
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
    errorText: {
        color: 'red',
        marginTop: 15,
    },
    linkText: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});
