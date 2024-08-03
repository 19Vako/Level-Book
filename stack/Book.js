import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import { gStyle } from '../styles/styles'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import UserContext from '../UserContext/Context';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function Book({ route, navigation }) {
  const { book } = route.params;
  const { user, setUser, favorite, setFavorite } = useContext(UserContext);
  const [ libraryBook, setLibraryBook ] = useState(false);


  useEffect(() => {
    
    // Загрузите список избранных книг при монтировании компонента
    if (user) {
      axios.post("http://192.168.1.4:5001/GetFavoriteBooks", { userId: user._id })
        .then(res => {
          const favoriteBooks = res.data.favoriteBooks;
          const favoriteMap = {};
          favoriteBooks.forEach(book => {
            favoriteMap[book.namebook] = true;
          });
          setFavorite(favoriteMap);
        })
        .catch(err => {
          console.error(err);
        });


      axios.post("http://192.168.1.4:5001/FindBookFromLibrary", { userId: user._id, book: book }) 
      .then(res => {
       setLibraryBook(true)
      })
    }
    


  }, [user]);
  
  
  
  const AddToLibrary = () => {
  
    if(!libraryBook){
      if(user){
        axios.post("http://192.168.1.4:5001/LibraryAdd", {userId: user._id, book: book} )
        .then(res => {
          const updateLibrary = { ...user, library: [...user.library, book] };
          setUser(updateLibrary);
          console.log(res.data)
        })
        .catch(err => {
          console.error(err)
        });
      }
    }
  };
  const CheckLibrary = () => {
    if(libraryBook){
      return (
        <>
          <AntDesign name="checkcircle" size={24} color="white" />
          <Text style={styles.addLibrary}>ADDED TO LIBRARY</Text>
        </>
      )
    }
    else {
      return (
        <>
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.addLibrary}>ADD TO LIBRARY </Text>
        </>
      )
    }
  };
  const addToFavorite = async () => {
    try {
      const response = await axios.post("http://192.168.1.4:5001/FindInFavorite", { userId: user._id, book });
      const existBook = response.data.exists;
  
      if (existBook) {
        await axios.post("http://192.168.1.4:5001/RemoveFromFavorite", { userId: user._id, book });
      } else {
        await axios.post("http://192.168.1.4:5001/AddToFavorite", { userId: user._id, book })
        .then(res => {
          const updateFavorite = { ...user, favorite: [...user.favorite, book] };
          setUser(updateFavorite)
        })
      }
  
      setFavorite((prevFavorite) => ({
        ...prevFavorite,
        [book.namebook]: !existBook,  // Обновляем состояние для текущей книги
      }));
    } catch (error) {
      console.error(error);
      setFavorite((prevFavorite) => ({
        ...prevFavorite,
        [book.namebook]: prevFavorite[book.namebook],
      }));
    }
  };
  const getFavoriteIcon = (bookName) => {
    return favorite[bookName] ? 'heart' : 'hearto';
  }
  const addToReadingList = () => {
    if (user) {
      axios.post("http://192.168.1.4:5001/AddToReading", { userId: user._id, book })
        .then(res => {
          const updatedReadingNow = [book, ...user.readingNow.filter(b => b.namebook !== book.namebook)];
          setUser({ ...user, readingNow: updatedReadingNow });
        })
        .catch(err => {
          console.error(err);
        });
    }
    navigation.navigate('ReadBook', { book });
  };
  
  
  
  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.imgContainer}>
      <Image source={{ uri: book.photo }} style={styles.img} />
      <Text style={styles.namebook}>{book.namebook}</Text>
      <Text style={styles.author}>{book.author}</Text>
      </View>

      <View style={styles.elContainer}>

          <TouchableOpacity style={styles.addToFavorite} onPress={() => addToFavorite()}>
            <AntDesign name={getFavoriteIcon(book.namebook)} size={30} color="white" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.readNow} onPress={addToReadingList}>
            <Text style={styles.readNowTitle}>READ NOW</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.addContainer} onPress={AddToLibrary}>
            <CheckLibrary/>
          </TouchableOpacity>

      </View> 
      
      <View style={styles.Description}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{book.text}</Text>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
 imgContainer:{
  marginTop: 50,
  marginBottom: 15,
  alignItems: 'center'
 },
 img: {
  height: 450,
  width: 300
 },
 author: {
  color: 'white',
  fontFamily: 'ari-med'
 },
 namebook: {
  color: 'white',
  fontFamily: 'ari-bold',
  fontSize: 25,
  marginVertical: 10
 },
 like: {
  marginVertical: 15
 },
 elContainer:{
  marginHorizontal: 30,
  borderBottomWidth: 1,
  borderColor: 'gray',
  paddingBottom: 25
 },
 readNow:{
   borderWidth: 1,
   borderRadius: 20,
   padding: 14,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#3d3c3c',
   marginVertical: 5,
 },
 readNowTitle: {
   color: 'white',
   fontFamily: 'ari-bold',
 },
 box: {
  marginVertical: 15,
  flexDirection: 'row',
  justifyContent: 'space-between'
 },
 addContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'silver',
  borderRadius: 20,
  padding: 10,
  marginVertical: 5
 },


 addToFavorite: {
   marginLeft: 290,
   marginBottom: 10
 },


 addLibrary:{
  color: 'white',
  fontFamily: 'ari-bold',
  marginLeft: 5
 },


 audioContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 20,
  padding: 14,
  backgroundColor: '#3d3c3c',
  marginTop: 5,
  marginBottom: 20
 },
 Description: {
  marginTop: 30,
  marginBottom: 50,
  marginHorizontal: 30,
  borderBottomWidth: 1,
  borderColor: 'gray',
  paddingBottom: 25

 },
 DescriptionTitle: {
  color: "white",
  fontFamily: 'ari-bold',
  fontSize: 20,
  marginBottom: 10
 },
 DescriptionText: {
  color: 'white',
  fontFamily: 'ari-med'
 }

})