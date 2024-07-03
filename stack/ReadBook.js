import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useEffect, useState } from 'react';
import React from 'react'
import { gStyle } from '../styles/styles';
export default function ReadBook({route}) {
    const { book }  = route.params;

    const [text, setText] = useState('');
    useEffect(() => {
      fetch(book.Booklink)
        .then(response => response.text())
        .then(data => {
            const cleanedText = data.replace(/\n\s*\n/g, '\n').trim();
            setText(cleanedText);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.container}>
         <Text style={styles.Book}>{text}</Text>
      </View>
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
     padding: 14
    },
    Book: {
        color: 'white',
        fontFamily: 'ari-med',
        lineHeight: 24,
        marginBottom: 0,
        padding: 10,
    }
})