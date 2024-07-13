import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { gStyle } from '../styles/styles';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export default function Search({ navigation }) {
  const [book, setInput] = useState('');
  const [list, setList] = useState([]);
  const [findBooks, setBooks] = useState([]);

  const handleInputChange = (text) => {
    setInput(text);

    if(text){
      axios.get("http://192.168.1.4:5001/Search", {
        params: { book: text }
      })
      .then(res => {
        setBooks(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
      });
    }
    
  };

  const cleanInput = () => {
    setInput('');
  };

  const cleanHistory = () => {
    setList([]);
  };

  const addHistory = () => {
    if (book) {
      setList((prev) => [...prev, { text: book, id: Date.now().toString() }]);
    }
  };

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.inputContainer}>
        <Entypo name="magnifying-glass" size={25} color="silver" onPress={addHistory} />
        <TextInput
          style={styles.input}
          placeholder="Books and audio"
          placeholderTextColor="silver"
          onChangeText={handleInputChange}
          value={book}
          onSubmitEditing={addHistory}
        />
        <AntDesign name="closecircle" size={20} color="silver" onPress={cleanInput} />
      </View>
      
      <View style={styles.bookContainer}>
        { book ?
          findBooks.map((book, index) => (
            <TouchableOpacity key={index} style={styles.book} onPress={() => navigation.navigate('Book', { book })}>
              <Image style={styles.img} source={{ uri: book.photo }} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{book.namebook}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
            </TouchableOpacity>
          ))
        : null}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listBox}>
              <Entypo name="magnifying-glass" size={25} color="silver" />
              <Text style={styles.listText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#3d3c3c',
    marginTop: 50,
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
    color: 'white',
  },
  bookContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  book: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 80,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  text: {
    fontSize: 15,
    fontFamily: 'ari-bold',
    color: 'white',
  },
  author: {
    color: 'gray',
    fontFamily: 'ari-med',
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
    alignItems: 'center',
  },
  listHeader: {
    borderBottomColor: 'silver',
    borderBottomWidth: 0.2,
    fontSize: 30,
    fontFamily: 'ari-bold',
    color: 'white',
    marginVertical: 10,
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
  },
});
