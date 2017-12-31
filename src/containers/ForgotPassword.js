import React from 'react';
import { Font } from 'expo';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

export default class ForgotPassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false
		}
	}

	 static navigationOptions = {
         drawerLabel: () => null
    }

    async componentDidMount() {
	    await Font.loadAsync({
	      'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
	    });

	    this.setState({ fontLoaded: true });
	}

	render() {

		const { fontLoaded } = this.state;
		console.log(this.props, fontLoaded);
		return (
			fontLoaded ? <View style={styles.container}>				
				<Text>Forgot Password</Text>
			</View> : null
			)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor : '#151515',
		flex: 1,
		marginTop: 20
	}
});