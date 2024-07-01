import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'

export default function A1List() {
  return 
    /* <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>A1 Level</Text>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity style={styles.content}>
            <Image style={styles.img} source={require('../assets/The_Cat_That_Walked_by_Himself-Rudyard_Kipling.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <Image style={styles.img} source={require('../assets/Give_Us_the_Money-Clarke_Maeve.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <Image style={styles.img} source={require('../assets/London-John_Escott.jpg')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.content}>
            <Image style={styles.img} source={require('../assets/Escape-Phillip_Burrows.jpg')} />
          </TouchableOpacity>
        </ScrollView>
    </TouchableOpacity> */
  
}

const styles = StyleSheet.create({
  container:{
    marginTop: 50,
    borderRadius: 10, // чтобы добавить закругленные углы
    overflow: 'hidden' // чтобы градиент и его содержимое не выходили за границы
  },
  gradient: {
    padding: 20,
    borderRadius: 10
  },
  scrollViewContent: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  content:{
    marginHorizontal: 5,
    marginBottom: 30
  },
  title: {
    fontSize: 40,
    fontFamily: 'ari-bold',
    margin: 30,
    color: 'white'
  },
  img:{
    width: 150,
    height: 250,
    borderRadius: 10
  }
})
