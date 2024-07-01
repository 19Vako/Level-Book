// Header.js
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Modal, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation }) {

  const loadLogIn = () => {
    navigation.navigate('LogIn')
  }
  
  const loadUser = () => {
    navigation.navigate('UserAcount')
  }

  const [UserAcount, setUser] = useState(false)
  const UserCheck = () => {
    if(UserAcount){
     loadUser()
    }
    else loadLogIn()
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Level Book</Text>
      <Ionicons name="person-circle" size={50} color="white" onPress={UserCheck} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 15
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'ari-bold',
  },
});
