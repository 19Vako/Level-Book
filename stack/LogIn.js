import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../styles/styles';
import UserContext from '../UserContext/Context';

export default function LogIn({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogIn = () => {
    if (userName && userPassword) {
      const data = {
        name: userName,
        password: userPassword,
      };

      axios.post("http://192.168.1.2:5001/LogIn", data)
        .then(res => {
          if (res.data) {
            setUser(res.data);  // Сохранение данных пользователя в контексте
            navigation.navigate('UserAcount');  // Переход на страницу UserAcount
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.accountPhoto}>
        <Ionicons name="person-circle" size={150} color="white" />
      </View>

      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor={'silver'}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Password'
            placeholderTextColor={'silver'}
            onChangeText={setUserPassword}
          />
        </View>
        <TouchableOpacity onPress={handleLogIn}>
          <View style={styles.button}>
            <Text style={styles.title}>Log in</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logIn} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.title}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accountPhoto: {
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
});
