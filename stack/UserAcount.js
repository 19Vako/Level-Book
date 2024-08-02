import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UserContext from '../UserContext/Context';
import { gStyle } from '../styles/styles';

export default function UserAccount({ navigation }) {
  const { user, setUser, favorite, setFavorite} = useContext(UserContext);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {

   
    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`http://192.168.1.2:5001/getUser/${user._id}`);
          if (response.data.success) {
            const fetchedUser = response.data.user;
            if (fetchedUser.userPhoto) {
              console.log("Fetched user photo URL:", fetchedUser.userPhoto);
              setUserImage(`data:image/jpeg;base64,${fetchedUser.userPhoto}`);
            } else {
              console.log("No image found for user.");
              setUserImage(null);
            }
          } else {
            console.error("Error fetching user data:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchUserData();
  }, [user]);

  const numberOfBooks = user?.library?.length || 0;
  const numberOfFavorites = user?.favorite?.length || 0;

  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,  // Уменьшите качество еще больше
        base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageBase64 = result.assets[0].base64;

        try {
            const response = await axios.post("http://192.168.1.2:5001/AddUserPhoto", {
                userId: user._id,
                photo: selectedImageBase64,
            });

            if (response.data.success) {
                setUserImage(`data:image/jpeg;base64,${selectedImageBase64}`);
                setUser(response.data.user);
            } else {
                console.error("Error in response data:", response.data);
            }
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    }
};


  

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.userBox}>
        <TouchableOpacity onPress={pickImage}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.image} />
          ) : (
            <Ionicons name="person-circle" size={150} style={styles.imagePlaceholder} color="white" />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{user.name}</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('UserFavorite')}>
            <AntDesign name="heart" size={24} color="white" />
            <View style={styles.icons}>
              <Text style={styles.title}>Favorite</Text>
              <Text style={styles.titleNumberFavorite}>{numberOfFavorites}</Text>
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('UserBooks')}>
            <Octicons name="book" size={24} color="white" />
            <View style={styles.icons}>
              <Text style={styles.title}>Books</Text>
              <Text style={styles.titleNumber}>{numberOfBooks}</Text>
              <AntDesign name="right" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.out}>
          <Text style={styles.titleOut}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userBox: {
    alignItems: 'center',
    padding: 30,
  },
  box: {
    marginTop: 40,
    backgroundColor: '#3d3c3c',
    width: '100%',
    borderRadius: 10,
  },
  list: {
    marginHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'ari-med',
    fontSize: 15,
    marginHorizontal: 15,
  },
  titleNumber: {
    color: 'white',
    fontFamily: 'ari-bold',
    marginLeft: 170,
  },
  titleNumberFavorite: {
    color: 'white',
    fontFamily: 'ari-bold',
    marginLeft: 160,
  },
  icons: {
    width: '100%',
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
  },
  out: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100%',
    marginBottom: 10,
  },
  titleOut: {
    color: 'red',
    fontFamily: 'ari-med',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
