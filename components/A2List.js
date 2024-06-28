import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'

export default function A2List() {
  return (
  <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>A2 Level</Text>
    <ScrollView horizontal={true}> 
      <TouchableOpacity style={styles.content}>
        <Image style={styles.img} source={require('../assets/UFOs-Helen_Brooke.jpg')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.content}>
        <Image style={styles.img} source={require('../assets/Dragonheart-Patrick_Read_Johnson.jpg')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.content}>
        <Image style={styles.img} source={require('../assets/Adventure_at_Haydon_Point-Elizabeth_Ferretti.jpg')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.content}>
        <Image style={styles.img} source={require('../assets/Extreme_Sports-Michael_Dean.jpg')} />
      </TouchableOpacity>
    </ScrollView>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
  container:{
    backgroundColor: '#3d3c3c',
    marginTop: 50
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