import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navigate from './navigate';


const loadFonts = () => Font.loadAsync({
  'ari-bold': require('./assets/font/Arimo-Bold.ttf'),
  'ari-med': require('./assets/font/Arimo-Medium.ttf')
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.loading}>
        <Text>Загрузка...</Text>
      </View>
    );
  } else {
    return ( 
      <Navigate />
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
