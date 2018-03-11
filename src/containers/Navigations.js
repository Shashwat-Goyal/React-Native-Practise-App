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
    screen: CurrencyList,
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
  }
});

export default MyApp;