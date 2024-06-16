import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

import { Text, View } from '@/components/Themed';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        if (email !== '' && password !== '' && password2 !== '' && password === password2) {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setLoading(false);
                    router.replace('/login');
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.message);
                });
        } else {
            if (password !== password2) {
                setError('Passwords do not match');
            } else {
                setError('Fill in all fields');
            }
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <>
                    <Text style={styles.title}>Register</Text>
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
                    <Text style={styles.label}>Repeat Password</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password" 
                        value={password2} 
                        onChangeText={setPassword2} 
                        secureTextEntry 
                        placeholderTextColor="#888"
                    />
                    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                    <TouchableOpacity onPress={handleRegister} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </>
            )}
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
});
