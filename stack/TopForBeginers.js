import { StyleSheet, TouchableOpacity, ScrollView, Text, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { gStyle } from '../styles/styles';
import axios from 'axios';

export default function TopForBeginers({navigation}) {

  const Book = ({navigation}) => {
    const [Books, setBooks] = useState([]);
    const maxLength = 250;

    useEffect(() => {
      const getBooks = () => {
        axios.get("http://192.168.1.3:5001/GetA1")
          .then(res => {
            const booksData = res.data.slice(0, 5).map((book, index) => {
              let text = book.text;
              if (text.length > maxLength) {
                text = text.substring(0, maxLength) + '...';
              }
                return {
                id: index,
                photo: book.photo,
                namebook: book.namebook,
                author: book.author,
                text: book.text,
                link: book.link,
                Booklink: book.Booklink
              } 
            });
            setBooks(booksData);
          })
          .catch(err => console.log(err));
      };
      getBooks();
    }, []);

    return (
      <>
        {Books.map(book => (
          <TouchableOpacity key={book.id} style={styles.BookContainer} onPress={() => navigation.navigate('Book', {book})}>
            <View style={styles.box}>
              {book.photo ? <Image style={styles.photo} source={{ uri: book.photo }} /> : null}
              <Text style={styles.BookName}>{book.nameBook}</Text>
            </View>
            <View >
              <Text style={styles.author}>Author: {book.author}</Text>
              <Text style={styles.text}>{book.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <ScrollView style={gStyle.container}>
      <Book navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  BookContainer: {
    backgroundColor: "#3d3c3c",
    marginHorizontal: 30,
    marginVertical: 22,
    borderRadius: 10,
    padding: 15,
  },
  BookName: {
    color: "white",
    fontSize: 20,
    fontFamily: 'ari-bold',
    margin: 5,
  },
  photo: {
    marginBottom: 10,
    width: 130,
    height: 200,
    borderRadius: 10
  },
  box: {
    alignItems: 'center',
    marginRight: 10
  },
  author: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    fontFamily: 'ari-bold'
  },
  text: {
    color: 'white',
    fontFamily: 'ari-med'
  }
});