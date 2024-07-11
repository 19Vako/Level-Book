import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { gStyle } from '../styles/styles';



export default function Level({ navigation, route }) {
  const { books } = route.params;

  const Book = ({ navigation }) => {
    return (
      <>
        {books.map(book => (
          <TouchableOpacity key={book.id} style={styles.content} onPress={() => navigation.navigate('Book', { book })}>
            <Image style={styles.img} source={{ uri: book.photo }} />
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.container}>
        <Book navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginVertical: 45

  },
  content: {
    marginHorizontal: 10,
    marginBottom: 50,
    aspectRatio: 2 / 3, // Співвідношення сторін зображення обкладинки книги
  },
  img: {
    width: 150,
    height: 230,
    borderRadius: 10,
  },
});
