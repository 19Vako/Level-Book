import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { gStyle } from '../styles/styles'
export default function Library() {
  return (
    <ScrollView style={gStyle.container}>
      <Text>TopBooks</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})