// Header.js
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Modal, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation }) {

  const loadScene = () => {
    navigation.navigate('LogIn')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Level Book</Text>
      <Ionicons name="person-circle" size={50} color="white" onPress={loadScene} />
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
