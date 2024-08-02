import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity, View, Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import UserContext from '../UserContext/Context';
import Header from '../components/Header';
import { gStyle } from '../styles/styles';
import axios from 'axios';

//icons
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ReadingNow({ navigation }) {
  const { user, setUser, favorite, setFavorite} = useContext(UserContext);
  const [readingNow, setReadingNow] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);



  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (user && user.readingNow) {
      setReadingNow([...user.readingNow]);
    }
    // Загрузите список избранных книг при монтировании компонента
    if (user) {
      axios.post("http://192.168.1.2:5001/GetFavoriteBooks", { userId: user._id })
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
    }
  }, [user]);

  const handleBookPress = (book) => {
    if (user) {
      axios.post("http://192.168.1.2:5001/AddToReading", { userId: user._id, book })
        .then(res => {
          const updatedReadingNow = [book, ...user.readingNow.filter(b => b.namebook !== book.namebook)];
          setUser({ ...user, readingNow: updatedReadingNow });
          setReadingNow(updatedReadingNow);
        })
        .catch(err => {
          console.error(err);
        });
      }
    navigation.navigate('ReadBook', { book });
  };

  const addToLibrary = (book) => {
    if(user) {
      axios.post("http://192.168.1.2:5001/LibraryAdd", { userId: user._id, book })
      .then(res => {
        const updateLibrary = { ...user, library: [...user.library, book]}
        setUser(updateLibrary)
        console.log(res.data)
      })
      setModalVisible(false)
    }
  }

  const addToFavorite = async (bookId, book) => {
    try {
      const response = await axios.post("http://192.168.1.2:5001/FindInFavorite", { userId: user._id, book });
      const existBook = response.data.exists;
  
      if (existBook) {
        await axios.post("http://192.168.1.2:5001/RemoveFromFavorite", { userId: user._id, book });
      } else {
        await axios.post("http://192.168.1.2:5001/AddToFavorite", { userId: user._id, book })
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

  const handleModalOpen = (book, event) => {
    const x = event.nativeEvent.pageX;
    const y = event.nativeEvent.pageY;

    const modalWidth = 200;
    const modalHeight = 150;

    let adjustedX = x;
    let adjustedY = y;

    if (x + modalWidth > screenWidth) {
      adjustedX = screenWidth - modalWidth - 20;
    }
    if (y + modalHeight > screenHeight) {
      adjustedY = screenHeight - modalHeight - 20;
    }

    setSelectedBook(book);
    setModalPosition({ x: adjustedX, y: adjustedY });
    setModalVisible(true);
  };

  const deleteBook = (book) => {
    axios.post("http://192.168.1.2:5001/DeleteReadingBook", {userId: user._id, book: book.namebook})
      .then(res => {
        const updatedReadingNow = [ ...user.readingNow.filter(b => b.namebook !== book.namebook)];
        setUser({ ...user, readingNow: updatedReadingNow });
        setReadingNow(updatedReadingNow);
        setModalVisible(false)
      })
      .catch(err => {
        console.error(err);
      });
  }





  return (
    <ScrollView style={gStyle.container}>
      <Header navigation={navigation} />

      {user ? (
        readingNow.length > 0 ? (
          <View style={styles.readingContainer}>
            <Text style={styles.text}>Current</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {readingNow.map((book, index) => (
                <View key={index} style={styles.bookContainer}>

                  <TouchableOpacity style={styles.book} onPress={() => handleBookPress(book)}>
                    <Image style={styles.img} source={{ uri: book.photo }} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{book.namebook}</Text>
                  </TouchableOpacity>

                  <View style={styles.buttonsContainer} >

                    <TouchableOpacity style={styles.button} onPress={() => addToFavorite(index, book)}>
                      <AntDesign name={getFavoriteIcon(book.namebook)} size={24} color="white" />
                    </TouchableOpacity>
                  

                    <TouchableOpacity style={styles.button} onPress={(event) => handleModalOpen(book, event)}>
                      <AntDesign name="ellipsis1" size={25} color="white" />
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.boxNotLog}>
            <Image style={styles.cat} source={require("../assets/pngwing.com (1).png")} />
            <Text style={styles.textNotLog}>You are not reading anything now...</Text>
          </View>
        )
      ) : (
        <View style={styles.boxNotLog}>
          <Image style={styles.cat} source={require("../assets/pngwing.com.png")} />
          <Text style={styles.textNotLog}>You are not signed in...</Text>
        </View>
      )}

      {selectedBook && (
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} style={[styles.modal, { top: modalPosition.y, left: modalPosition.x }]} animationIn="fadeIn" animationOut="fadeOut" useNativeDriver>
          <View style={styles.modalView}>

            <TouchableOpacity style={styles.buttonModal} onPress={() => addToLibrary(selectedBook)}>
               <Text style={styles.textStyle}>Add to library</Text>
              <MaterialIcons name="playlist-add" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonModal, {borderBottomWidth: 0,  marginBottom: 0}]} onPress={() => deleteBook(selectedBook)}>
              <Text style={[styles.textStyle, {color: 'red'}]}>Delete...</Text>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>

          </View>
        </Modal>
      )}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },



  //Modal
  modal: {
    position: 'absolute',
    margin: 0,
  },
  modalView: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingVertical: 10,
    width: 200
  },
  buttonModal: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingBottom: 5
  },
  textStyle: {
    color: 'white',
    fontFamily: 'ari-bold',
  },



  readingContainer: {
    marginHorizontal: 30,
    marginTop: 35,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  bookContainer: {
    position: 'relative',
    marginRight: 10,
  },
  book: {
    alignItems: 'center',
    width: 160,
    height: 300,
  },
  title: {
    color: 'white',
    fontFamily: 'ari-bold',
    fontSize: 15,
    marginVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'ari-bold',
    marginVertical: 15,
  },
  img: {
    width: 160,
    height: 250,
  },
  cat: {
    width: 150,
    height: 130,
  },
  textNotLog: {
    fontSize: 25,
    fontFamily: 'ari-bold',
    color: 'white',
    justifyContent: 'center',
  },
  boxNotLog: {
    alignItems: 'center',
    marginTop: 135,
  },
});
