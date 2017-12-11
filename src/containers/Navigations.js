import React from 'react';
import LoginScreen from './LoginScreen';
import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import Gallery from './Gallery';

const MyApp = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Gallery: {
    screen: Gallery,
  },
  Login : {
    screen : LoginScreen
  }
});

export default MyApp;