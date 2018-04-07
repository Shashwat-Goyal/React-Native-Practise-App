/*import React from 'react';
import { StyleSheet, Text, ScrollView, DrawerLayoutAndroid, View, KeyboardAvoidingView, TouchableHighlight, Image, Button } from 'react-native';
import LoginScreen from './src/containers/LoginScreen';
import { DrawerNavigator } from 'react-navigation';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/redux/reducers';

const store = createStore(reducer, applyMiddleware(thunk));

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Text>Home</Text>
    ),
  };

  render() {
    return (
    <View>
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} title="Open Drawer" />
    </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Text>Notifications</Text>
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const MyApp = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
  Login : {
    screen : LoginScreen
  }
});



export default class App extends React.Component {
  
  onPressLearnMore() {
    Vibration.vibrate(100)
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    ) 
  }

  navigationChange(prevState, currentState) {
    console.log(prevState, currentState);
  }

  render() {

    console.log(MyApp);

    let navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        </View>
  );

    return (
          <Provider store={store}>
            <View style={{flex: 1, alignItems: 'stretch'}}>
              <MyApp onNavigationStateChange={(prevState, currentState) => this.navigationChange(prevState, currentState)} /> 
              <KeyboardAvoidingView keyboardVerticalOffset={500}>
                <LoginScreen />
              </KeyboardAvoidingView>

            </View>
          </Provider>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 23,
  },
});
*/

import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/redux/reducers';
import LoginScreen from './src/containers/LoginScreen';
import { createStore, applyMiddleware} from 'redux';
import Navigations from './src/containers/Navigations';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};
const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends Component {

  navigationChange(prevState, currentState) {
    console.log(prevState, currentState);
  }
  
  render() {
    return (

        <Provider store={store}>
            <View style={{flex: 1}}>
              <StatusBar translucent hidden={false} backgroundColor="rgba(0, 0, 0, 0.20)" barStyle="dark-content" animated/>
              <View style={{flex: 1, marginTop: 24}}>
                <Navigations onNavigationStateChange={(prevState, currentState) => this.navigationChange(prevState, currentState)} />
              </View>
            </View>
        </Provider>
      )
  }
}