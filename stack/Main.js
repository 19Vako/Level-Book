
import React from 'react';
import { StatusBar, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import LevelList from '../components/LevelList';
import ForBegginers from '../components/ForBegginers';
import A1List from '../components/A1List';
import A2List from '../components/A2List';
import { gStyle } from '../styles/styles';

export default function Main({ navigation }) {

  const loadScene = () => {
    navigation.navigate('TopBooks')
  }
  return (
    <ScrollView style={gStyle.container}>
      <Header navigation={navigation}/>
      <LevelList />
      <TouchableOpacity onPress={loadScene}>
        <ForBegginers />
      </TouchableOpacity>
      <A1List />
      <A2List />
      <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create({});
