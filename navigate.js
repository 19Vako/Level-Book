import React from 'react';
import { Button, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

//Component
import Header from './components/Header';


//Styles
import { gStyle } from './styles/styles';


//Stack
import Main from './stack/Main';
import Library from './stack/Library';
import ReadingNow from './stack/ReadingNow';
import Search from './stack/Search';
import SignUp from './stack/SignUp';
import LogIn from './stack/LogIn';
import UserAcount from './stack/UserAcount';


//icons
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import TopForBeginers from './stack/TopForBeginers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainScreen" 
          component={BottomTabs} 
          options={{
            title: 'Main',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            
            title: 'Sign up',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#1d1e1f',
            },
          }}
        />
        <Stack.Screen 
          name="LogIn"
          component={LogIn}
          options={{
            title: 'Log in',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#1d1e1f',
            },
          }}
        />
        <Stack.Screen 
          name="TopBooks"
          component={TopForBeginers}
          options={{
            title: 'Top for beginers',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#1d1e1f',
            },
          }}
        />
        <Stack.Screen
  name="UserAcount"
  component={UserAcount}
  options={({ navigation }) => ({
    title: 'Acount',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1d1e1f',
    },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('MainScreen')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <FontAwesome5 name="chevron-left" size={27} color="white" style={{marginLeft: 5}} />
        <Text style={{ color: 'white', marginLeft: 5, fontSize: 18 }}>Home</Text>
      </TouchableOpacity>
    ),
  })}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Main') {
            return <Entypo name="home" size={size} color={color} />;
          } else if (route.name === 'Library') {
            return <MaterialCommunityIcons name="bookshelf" size={size} color={color} />;
          } else if (route.name === 'Reading now') {
            return <FontAwesome6 name="book-open" size={size} color={color} />
          } else if (route.name === 'Search') { 
            return <Entypo name="magnifying-glass" size={size} color={color} />
          }
        },
        tabBarStyle: {
          height: 90,
          paddingTop: 20,
          backgroundColor: '#1d1e1f',
        }, 
        tabBarActiveTintColor: 'white', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      })}
    >
      <Tab.Screen 
      name="Main" 
      component={Main} 
      options={gStyle.tabContainer}
      />
      <Tab.Screen 
      name="Reading now"
      component={ReadingNow}
      options={gStyle.tabContainer}
      />
      <Tab.Screen 
      name="Library" 
      component={Library} 
      options={gStyle.tabContainer}
      />
      <Tab.Screen
      name='Search'
      component={Search}
      options={gStyle.tabContainer}
      />
    </Tab.Navigator>
  );
}
