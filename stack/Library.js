import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { gStyle } from '../styles/styles';
import UserContext from '../UserContext/Context';
import axios from 'axios';
import Modal from 'react-native-modal'; // Убедитесь, что этот импорт есть

//Vector icons
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const modalWidth = 200; // Примерная ширина модального окна
const modalHeight = 150; // Примерная высота модального окна



export default function Library({ navigation }) {
  
  const { user, setUser, setFavorite } = useContext(UserContext);
  const [library, setLibrary] = useState(user ? user.library : []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  
  
  
  useEffect(() => {
    if (user) {
      setLibrary(user.library);
  }}, [user]);

  
  const addToReadingList = (book) => {
    if (user) {
      axios.post("http://192.168.1.3:5001/AddToReading", { userId: user._id, book })
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

  const addToFavorite = async (book) => {
    try {
      await axios.post("http://192.168.1.3:5001/AddToFavorite", { userId: user._id, book });
      setFavorite(prev => ({
        ...prev,
        [book.namebook]: true
      }));
      const updateFavorite = { ...user, favorite: [...user.favorite, book] };
      setUser(updateFavorite)
    } 
    catch (error) {
      console.error(error);
    }
    setModalVisible(false);
  };

  const handleModalOpen = (book, event) => {
    const x = event.nativeEvent.pageX;
    const y = event.nativeEvent.pageY;

    let adjustedX = x;
    let adjustedY = y;

    // Корректировка позиции, чтобы модальное окно оставалось в пределах экрана
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

  const DeleteBook = (book) => {
    axios.post("http://192.168.1.3:5001/DeleteFromLibrary", {userId: user._id, book: book})
    .then(res => {
      const updatedlibrary = [...user.library.filter(b => b.namebook !== book.namebook)];
      setUser({ ...user, library: updatedlibrary });
      console.log(res.data)
      setModalVisible(false);
    })
    
  };

 

  return (
    <ScrollView style={gStyle.container}>
      {user ? (
        library.length > 0 ? (
          <View style={styles.box}>
            {library.map((book, index) => (
              <TouchableOpacity onPress={() => addToReadingList(book)} style={styles.container} key={index}>
                <Image style={styles.img} source={{ uri: book.photo }} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{book.namebook}</Text>
                  <Text style={styles.author}>{book.author}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={(event) => handleModalOpen(book, event)}>
                  <AntDesign name="ellipsis1" size={25} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.boxNotLog}>
            <Image style={styles.cat} source={require("../assets/pngwing.com (1).png")} />
            <Text style={styles.textNotLog}>Your library is empty...</Text>
          </View>
        )
      ) : (
        <View style={styles.boxNotLog}>
          <Image style={styles.cat} source={require("../assets/pngwing.com.png")} />
          <Text style={styles.textNotLog}>You are not signed in...</Text>
        </View>
      )}

      {selectedBook && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={[styles.modal, { top: modalPosition.y, left: modalPosition.x }]}
          animationIn="fadeIn"
          animationOut="fadeOut"
          useNativeDriver
        >
          <View style={styles.modalView}>

            <TouchableOpacity style={styles.buttonModal} onPress={() => addToFavorite(selectedBook)}>
              <Text style={styles.textStyle}>Add to favorite</Text>
              <AntDesign name="heart" size={20} color="white" />
            </TouchableOpacity>
           
            <TouchableOpacity style={[styles.buttonModal, { borderBottomWidth: 0, marginBottom: 0 }]} onPress={() => DeleteBook(selectedBook)}>
              <Text style={[styles.textStyle, { color: 'red' }]}>Delete...</Text>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>

          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({


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



  bookDetailsTitle: {
    color: 'white',
    fontFamily: 'ari-bold',
    fontSize: 18,
    marginBottom: 10,
  },
  bookDetailsAuthor: {
    color: 'gray',
    fontFamily: 'ari-bold',
    fontSize: 14,
    marginBottom: 20,
  },
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
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    width: 230,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: 'ari-bold',
    color: 'white',
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
