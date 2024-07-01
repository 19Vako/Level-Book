import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../styles/styles';
import axios from 'axios';

export default function UserAcount({ navigation }) {
  const loadScene = () => {
    navigation.navigate('LogIn');
  }
  const [UserName, setName] = useState('');
  const [UserPassword, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', password: '' });
  const getName = (text) => {
    const trimmedText = text.trim();
    setName(trimmedText);
    if (trimmedText.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };
  const getPassword = (text) => {
    const trimmedText = text.trim();
    setPassword(trimmedText);
    if (trimmedText.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  function handelSubmit(){
    const Data = {
      name:UserName,
      password:UserPassword
    }
    if(UserName && UserPassword){
      loadScene()
    axios.post("http://192.168.1.5:5001/register", Data)
    .then(res => {
      console.log(res.data)
      
    })
    .catch(err => console.log(err))
  }
  }

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.acountPhoto}>
        <Ionicons name="person-circle" size={150} color="white" />
      </View>
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor={'silver'}
            onChangeText={getName}
          />
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={'silver'}
            onChangeText={getPassword}
          />
          {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        </View>

        <TouchableOpacity onPress={handelSubmit}>
          <View style={styles.button}>
            <Text style={styles.title}>Sign up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logIn} onPress={loadScene}>
          <Text style={styles.title}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  acountPhoto: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 20,
    marginTop: 40,
    marginHorizontal: 50,
  },
  inputBox: {
    paddingHorizontal: 50,
    paddingTop: 40,
  },
  inputContainer: {
    backgroundColor: '#3d3c3c',
    marginVertical: 15,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  input: {
    marginLeft: 10,
    color: 'white',
  },
  button: {
    marginVertical: 15,
    backgroundColor: '#c70a0a',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontFamily: 'ari-bold',
    fontSize: 15,
  },
  logIn: {
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginLeft: 10,
  },
});
