import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const Book = ({navigation}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      axios.get("http://192.168.1.3:5001/GetB1")
        .then(res => {
          const data = res.data.map((book, index) => ({
            id: index,
            photo: book.photo,
            namebook: book.namebook,
            author: book.author,
            text: book.text,
            link: book.link,
            Booklink: book.Booklink
          }));
          setBooks(data);
        })
        .catch(err => console.log(err));
    };
    getBooks();
  }, []);

  return (
    <>
      {books.map(book => (
        <TouchableOpacity key={book.id} style={styles.content} onPress={() => navigation.navigate('Book', {book})}>
          <Image style={styles.img} source={{ uri: book.photo }} />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default function A1List({navigation}) {
  return (
    <TouchableOpacity>
    <LinearGradient colors={['#1c1c1c', '#0c0d0c']} style={styles.container}>
      <Text style={styles.title}>B1 Level</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
        <Book navigation={navigation}/>
      </ScrollView>
    </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  content: {
    marginHorizontal: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: 'ari-bold',
    margin: 20,
    color: 'white',
  },
  img: {
    width: 150,
    height: 250,
    borderRadius: 10,
  },
  gradientContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  innerGradient: {
    padding: 15,
    borderRadius: 10,
  },
  gradientText: {
    fontSize: 20,
    color: 'white',
  },
});
