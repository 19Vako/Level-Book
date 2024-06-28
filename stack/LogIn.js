import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity,} from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../styles/styles'



export default function UserAcount({navigation}) {

  const loadScene = () => {
    navigation.navigate('SignUp')
  }
  const Acount = () => {
    navigation.navigate('UserAcount')
  }

  const [UserName, setUserName] = useState('');
  const getName = (text) => {
    setUserName(text)
  }

  const [UserPassword, setUserPass] = useState('')
  const getPass = (text) => {
    setUserPass(text)
  }

  function LogIn(){
    const Data = {
      name:UserName,
      Password:UserPassword
    }
      
    axios.post("http://192.168.1.3:5001/LogIn", Data)
    .then(res => {
      console.log(res.data)
      /* if(res.data.success){
        Acount()
      } */
    })
    .catch(err => console.log(err))
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
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
          secureTextEntry={true}  
          style={styles.input}  
          placeholder='Password' 
          placeholderTextColor={'silver'}
          onChangeText={getPass}
          />
        </View>
        <TouchableOpacity onPress={LogIn}>
        <View style={styles.button}><Text style={styles.title}>Log in</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logIn} onPress={loadScene}>
          <Text style={styles.title}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
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
  inputBox:{
    paddingHorizontal: 50,
    paddingTop: 40
  },
  inputContainer: {
    backgroundColor: '#3d3c3c',
    marginVertical: 15,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10
  },
  input:{
    marginLeft: 10,
    color: 'white'
  },
  button:{
    marginVertical: 15,
    backgroundColor: '#c70a0a',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  title:{
    color: 'white',
    fontFamily: 'ari-bold',
    fontSize: 15
  },
  logIn:{
    alignItems: 'center',
    marginTop: 10
  }
})