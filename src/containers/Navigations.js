import React from 'react';
import LoginScreen from './LoginScreen';
import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import Gallery from './Gallery';
import ImageCard from '../components/ImageCard';
import ForgotPassword from './ForgotPassword';

const MyApp = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Gallery: {
    screen: Gallery,
  },
  Login : {
    screen : LoginScreen
  },
  Images: {
  	screen: ImageCard
  },
  ForgotPassword : {
  	screen: ForgotPassword,
  	headerMode: 'none',
    header: null,
    visible: false
  }
});

export default MyApp;