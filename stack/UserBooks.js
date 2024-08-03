import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { gStyle } from '../styles/styles';
import UserContext from '../UserContext/Context';
import axios from 'axios';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


//Vector icons


export default function UserBooks({navigation}) {
    const { user, setUser } = useContext(UserContext)
    const [library, setLibrary] = useState(user ? user.library : [])

    useEffect(() => {
        if (user) {
          setLibrary(user.library);
      }},  [user]);


    const addToReadingList = (book) => {
        if (user) {
          axios.post("http://192.168.1.4:5001/AddToReading", { userId: user._id, book })
            .then(res => {
              const updatedReadingNow = [book, ...user.readingNow.filter(b => b.namebook !== book.namebook)];
              setUser({ ...user, readingNow: updatedReadingNow });
            })
            .catch(err => {
              console.error('Error adding to reading list:', err);
              if (err.response) {
                console.error('Server responded with status code:', err.response.status);
                console.error('Response data:', err.response.data);
              } else if (err.request) {
                console.error('No response received:', err.request);
              } else {
                console.error('Error setting up request:', err.message);
              }
            });
        }
        navigation.navigate('ReadBook', { book });
    };
    


    return (
        <ScrollView style={gStyle.container}>
            {library.map((book, index) => (
              <TouchableOpacity onPress={() => addToReadingList(book)} style={styles.container} key={index}>
                <Image style={styles.img} source={{ uri: book.photo }} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{book.namebook}</Text>
                  <Text style={styles.author}>{book.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 30,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 50,
    height: 80,
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    width: 230,
    justifyContent: 'center',
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
  button: {
    justifyContent: 'center',
  },
})