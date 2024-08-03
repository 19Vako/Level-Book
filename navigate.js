import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

// Provider
import { UserProvider } from './UserContext/Context';

// Styles
import { gStyle } from './styles/styles';

// Components
import Level from './Levels/Level';
import Main from './stack/Main';
import Library from './stack/Library';
import ReadingNow from './stack/ReadingNow';
import Search from './stack/Search';
import SignUp from './stack/SignUp';
import LogIn from './stack/LogIn';
import UserAcount from './stack/UserAcount';
import Book from './stack/Book';
import ReadBook from './stack/ReadBook';
import TopForBeginers from './stack/TopForBeginers';
import UserBooks from './stack/UserBooks';
import UserFavorite from './stack/UserFavorite';

// Icons
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigate() {
  return (
    <UserProvider> 
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
              headerBackTitle: 'Back',
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
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="TopBooks"
            component={TopForBeginers}
            options={{
              title: 'Top for beginners',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1d1e1f',
              },
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="UserAcount"
            component={UserAcount}
            options={({ navigation }) => ({
              title: 'Account',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1d1e1f',
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('MainScreen')}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <FontAwesome5 name="chevron-left" size={27} color="white" style={{ marginLeft: 5 }} />
                  <Text style={{ color: 'white', marginLeft: 5, fontSize: 18 }}>Back</Text>
                 
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='UserBooks'
            component={UserBooks}
            options={{
              title: 'Books',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1d1e1f',
              },
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='UserFavorite'
            component={UserFavorite}
            options={{
              title: 'Favorite',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#1d1e1f',
              },
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Book"
            component={Book}
            options={({ route }) => {
              const { book } = route.params;
              return {
                title: book.namebook,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1d1e1f',
                },
                headerBackTitle: 'Back',
              };
            }}
          />
          <Stack.Screen
            name='ReadBook'
            component={ReadBook}
            options={({ route }) => {
              const { book } = route.params;
              return {
                title: book.namebook,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1d1e1f',
                },
                headerBackTitle: 'Back',
              };
            }}
          />
          <Stack.Screen 
            name='Level'
            component={Level}
            options={({ route }) => {
              const { nameLevel } = route.params
              return {
                title: nameLevel,
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: '#1d1e1f',
                },
                headerBackTitle: 'Back',
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
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
            return <FontAwesome6 name="book-open" size={size} color={color} />;
          } else if (route.name === 'Search') { 
            return <Entypo name="magnifying-glass" size={size} color={color} />;
          }
        },
        tabBarStyle: {
          height: 86,
          paddingTop: 20,
          backgroundColor: '#1d1e1f',
          borderBlockColor: '#1d1e1f'
        }, 
       

        tabBarActiveTintColor: 'white', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        ...gStyle.tabContainer,
      })}
      
    >
      <Tab.Screen 
        name="Main" 
        component={Main} 
        options={{
          headerStyle: {
            backgroundColor: '#1d1e1f',
            borderBottomColor: '#1d1e1f', // задайте нужный цвет
            borderBottomWidth: 1, // задайте ширину границы
          },
        }}
      />
      <Tab.Screen 
        name="Reading now"
        component={ReadingNow}
        options={{
          headerStyle: {
            backgroundColor: '#1d1e1f',
            borderBottomColor: '#1d1e1f', // задайте нужный цвет
            borderBottomWidth: 1, // задайте ширину границы
          },
        }}
      />
      <Tab.Screen 
        name="Library" 
        component={Library} 
        options={{
          headerStyle: {
            backgroundColor: '#1d1e1f',
            borderBottomColor: '#1d1e1f', // задайте нужный цвет
            borderBottomWidth: 1, // задайте ширину границы
          },
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: '#1d1e1f',
            borderBottomColor: '#1d1e1f', // задайте нужный цвет
            borderBottomWidth: 1, // задайте ширину границы
          },
        }}
      />
    </Tab.Navigator>
  );
}
