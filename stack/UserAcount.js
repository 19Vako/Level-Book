import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { gStyle } from '../styles/styles';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UserAcount() {
  


  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.userBox}>
        <TouchableOpacity>
         
            <Ionicons name="person-circle" size={150} style={styles.image} color="white" />
          
        </TouchableOpacity>
        <Text style={styles.title}>User</Text>

        <View style={styles.box}>
          <TouchableOpacity style={styles.list}>
            <AntDesign name="heart" size={24} color="white" />
            <View style={styles.icons}>
              <Text style={styles.title}>Favorite</Text>
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list}>
            <Octicons name="book" size={24} color="white" />
            <View style={styles.icons}>
              <Text style={styles.title}>Books</Text>
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list}>
            <MaterialCommunityIcons name="headphones" size={24} color="white" />
            <View style={styles.icons}>
              <Text style={styles.title}>Audio</Text>
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userBox: {
    alignItems: 'center',
    padding: 30,
  },
  box: {
    marginTop: 40,
    backgroundColor: '#3d3c3c',
    width: '100%',
    borderRadius: 10,
  },
  list: {
    marginHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'ari-med',
    marginHorizontal: 15,
  },
  icons: {
    width: '100%',
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
