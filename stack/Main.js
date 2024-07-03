
import React, { useState } from 'react';
import { StatusBar, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import LevelList from '../components/LevelList';
import ForBegginers from '../components/ForBegginers';
import A1List from '../components/A1List';
import A2List from '../components/A2List';
import B1List from '../components/B1List';
import B2List from '../components/B2List';
import C1List from '../components/C1List';
import C2List from '../components/C2List';
import { gStyle } from '../styles/styles';


export default function Main({ navigation }) {

  const loadScene = () => {
    navigation.navigate('TopBooks')
  }
  
  return (
    <ScrollView style={gStyle.container}>
      <Header navigation={navigation}/>
      <LevelList navigation={navigation}/>
      <A1List navigation={navigation}/>
      <A2List navigation={navigation}/>
      <TouchableOpacity onPress={loadScene}>
        <ForBegginers />
      </TouchableOpacity>
      <B1List navigation={navigation}/>
      <B2List navigation={navigation}/>
      <C1List navigation={navigation}/>
      <C2List navigation={navigation}/>
      <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create({});
