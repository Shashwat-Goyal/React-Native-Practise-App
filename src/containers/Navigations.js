import React from 'react';
import LoginScreen from './LoginScreen';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import Home from './Home';
import Gallery from './Gallery';
import ImageCard from '../components/ImageCard';
import ForgotPassword from './ForgotPassword';
import ProductList from './ProductList';
import CurrencyList from './CurrencyList';
import Register from './Register';
import AddBooking from './AddBooking';
import UploadSet from './UploadSet';
import ListBookings from './ListBookings';
import { isLoggedIn } from '../utils';

const Categories = TabNavigator({
	Sets : {
		screen: ProductList
	},
	Earrings : {
		screen : ProductList
	}
})

const MyApp = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Gallery: {
    screen: Gallery,
    contentOptions: {
    	items: [ProductList]
    }
  },
  Login : {
    screen : LoginScreen
  },
  Images: {
  	screen: ImageCard
  },
  Register :{
    screen: Register
  },
  ForgotPassword : {
  	screen: ForgotPassword,
  	headerMode: 'none',
    header: null,
    visible: false
  },
  Upload: {
    screen: UploadSet
  },
  AddBooking : {
    screen: AddBooking,
    visible: false
  },
  ListBookings : {
    screen: ListBookings,
    visible: false
  }
});

export default MyApp;