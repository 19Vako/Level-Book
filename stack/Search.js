import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { gStyle } from '../styles/styles'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Search() {
  const [inputValue, setInput] = useState('');
  const [list, setList] = useState(
    [])

  const handleInputChange = (text) => {
    setInput(text)
  }
  const cleanInput = () => {
    setInput('')
  }
  const cleanHistory = () => {
    setList('')
  }

  const addHistory = () => {
    if(inputValue){
      setList((prev) => [...prev, { text: inputValue }])
    }
    
  }

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.inputContainer}>
        <Entypo name="magnifying-glass" size={25} color='silver' onPress={addHistory} />
        <TextInput style={styles.input} 
        placeholder='Books and audio' 
        placeholderTextColor={'silver'} 
        onChangeText={handleInputChange} 
        value={inputValue} 
        onSubmitEditing={addHistory}
        />
        <AntDesign name="closecircle" size={20} color="silver" onPress={cleanInput} />
      </View>

      <View style={styles.listContainer}>
        <View style={styles.listTextContainer}>
          <Text style={styles.listHeader}>Search history</Text>
          <TouchableOpacity onPress={cleanHistory}>
          <Text style={styles.listButton}>Clean</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listBox}>
              <Entypo name="magnifying-glass" size={25} color='silver' />
              <Text style={styles.listText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#3d3c3c',
    marginTop: 45,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    width: 260,
    height: 40,
    fontSize: 20,
    color: 'white'
  },
  listContainer: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  listTextContainer: {
    borderBottomColor: 'silver',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listHeader: {
    borderBottomColor: 'silver',
    borderBottomWidth: 0.2,
    fontSize: 30,
    fontFamily: 'ari-bold',
    color: 'white',
    marginVertical: 10
  },
  listButton: {
    color: 'white',
    fontSize: 20,
  },
  listBox: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontSize: 20,
    fontFamily: 'ari-med',
    color: 'white',
    marginVertical: 15,
  }
})
