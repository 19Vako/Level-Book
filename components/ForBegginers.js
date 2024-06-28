import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react';

export default function ForBegginers() {
 
  return (
    <View style={styles.container}>
    <View style={styles.begginerBox} >
      <View style={styles.content}>
        <Image style={styles.img} source={require('../assets/The_Cat_That_Walked_by_Himself-Rudyard_Kipling.jpg')} />
      </View>
      <View style={styles.content}>
        <Image style={styles.img} source={require('../assets/Give_Us_the_Money-Clarke_Maeve.jpg')} />
      </View>
      <View style={styles.content}>
        <Image style={styles.img} source={require('../assets/London-John_Escott.jpg')} />
      </View>
      <View style={styles.content}>
        <Image style={styles.img} source={require('../assets/Escape-Phillip_Burrows.jpg')} />
      </View>
      <View style={styles.content}>
        <Image style={styles.img} source={require('../assets/Dragonheart-Patrick_Read_Johnson.jpg')} />
      </View>
    </View>
    <View>
    <Text style={styles.text}>Top For Begginers</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 40,
        marginHorizontal: 15,
        paddingHorizontal: 30,
        backgroundColor: '#fac423',
        justifyContent: 'center',
        borderRadius: 15,
        height: 400
    },
    content: {
        marginTop: 10,
        width: 35,
    },
    img: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    begginerBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
      marginTop: 20,
      marginLeft: 15,
      color: 'white',
      fontFamily: 'ari-bold',
      fontSize: 30
    }
    
})