// Header.js
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../UserContext/Context';

export default function Header({ navigation }) {
  const { user } = useContext(UserContext)

  const checkUser = () => {
    if(!user){
      navigation.navigate('LogIn')
    
    }else{
      navigation.navigate('UserAcount')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Level Book</Text>
      <Ionicons name="person-circle" size={50} color="white" onPress={checkUser} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 35
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'ari-bold',
  },
});
