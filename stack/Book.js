import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { gStyle } from '../styles/styles'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Book({ route, navigation }) {
  const  { book }  = route.params;
  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.imgContainer}>
      <Image source={{ uri: book.photo }} style={styles.img} />
      <Text style={styles.namebook}>{book.namebook}</Text>
      <Text style={styles.author}>{book.author}</Text>
      </View>

      <View style={styles.elContainer}>
          <TouchableOpacity style={styles.readNow} onPress={() => navigation.navigate('ReadBook', {book})}>
            <Text style={styles.readNowTitle}>READ NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.audioContainer}>
            <Text style={styles.addLibrary}>RUN AUDIO</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addContainer}>
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={styles.addLibrary}>ADD TO LIBRARY</Text>
          </TouchableOpacity> 
      </View> 
      
      <View style={styles.Description}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{book.text}</Text>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
 imgContainer:{
  marginTop: 50,
  marginBottom: 15,
  alignItems: 'center'
 },
 img: {
  height: 450,
  width: 300
 },
 author: {
  color: 'white',
  fontFamily: 'ari-med'
 },
 namebook: {
  color: 'white',
  fontFamily: 'ari-bold',
  fontSize: 25,
  marginVertical: 10
 },
 like: {
  marginVertical: 15
 },
 elContainer:{
  marginHorizontal: 45,
  borderBottomWidth: 1,
  borderColor: 'gray',
  paddingBottom: 25
 },
 readNow:{
   borderWidth: 1,
   borderRadius: 20,
   padding: 14,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#3d3c3c',
   marginVertical: 5,
 },
 readNowTitle: {
   color: 'white',
   fontFamily: 'ari-bold',
 },
 box: {
  marginVertical: 15,
  flexDirection: 'row',
  justifyContent: 'space-between'
 },
 addContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'silver',
  borderRadius: 20,
  padding: 10,
  marginVertical: 5
 },
 addLibrary:{
  color: 'white',
  fontFamily: 'ari-bold',
 },
 audioContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 20,
  padding: 14,
  backgroundColor: '#3d3c3c',
  marginTop: 5,
  marginBottom: 20
 },
 Description: {
  marginTop: 30,
  marginBottom: 50,
  marginHorizontal: 45,
  borderBottomWidth: 1,
  borderColor: 'gray',
  paddingBottom: 25

 },
 DescriptionTitle: {
  color: "white",
  fontFamily: 'ari-bold',
  fontSize: 20,
  marginBottom: 10
 },
 DescriptionText: {
  color: 'white',
  fontFamily: 'ari-med'
 }

})