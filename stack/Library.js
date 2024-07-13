import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { gStyle } from '../styles/styles';
import UserContext from '../UserContext/Context';

export default function Library({ navigation }) {
  const { user } = useContext(UserContext);
  const [library, setLibrary] = useState(user ? user.library : []);
  
  useEffect(() => {
    if (user) {
      setLibrary(user.library);
    }
  }, [user]);
  

  return (
    <ScrollView style={gStyle.container}>
      {user ? (
        <View style={styles.box}>

          {library.map((book, index) => (
            <TouchableOpacity
              style={styles.container}
              key={index}
              onPress={() => navigation.navigate('ReadBook',  {book} )}
            >
              <Image style={styles.img} source={{ uri: book.photo }} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{book.namebook}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.boxNotLog}>
          <Image style={styles.cat} source={require("../assets/pngwing.com (1).png")} />
          <Text style={styles.textNotLog}>You are not signed in...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 50,
    
  },
  container: {
    marginHorizontal: 30,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  cat: {
    width: 150,
    height: 100
  },
  textNotLog: {
    fontSize: 25,
    fontFamily: 'ari-bold',
    color: 'white',
    justifyContent: 'center',
  },
  boxNotLog: {
    alignItems: 'center',
    marginTop: 220,
  },
  author: {
    color: 'gray',
    fontFamily: 'ari-med',
  },
  img: {
    width: 50,
    height: 80,
  },
});
