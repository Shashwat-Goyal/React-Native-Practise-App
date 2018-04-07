import React from 'react';
import { Font, ScreenOrientation } from 'expo';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { 
	Container, 
	Title, 
	Header, 
	Content, 
	Card, 
	CardItem, 
	Thumbnail, 
	Button, 
	Icon, 
	Left, 
	Body, 
	Right,
	Item,
	Input
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Register extends React.Component {

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
		ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
	    this.setState({ fontLoaded: true });
	}

	componentWillUnmount() {
		ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
	}
	
	goToLogin = () => {
		this.props.navigation.navigate('Login');
	}

	render() {

		const { fontLoaded } = this.state;
		const screenHeight = Dimensions.get('window').height;
		return (
			fontLoaded ? <ScrollView style={styles.container}>
				<Grid>	
					<Row size={1}>
						<Col>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Image style={{marginLeft: 0, overlayColor: '#FFFFFF'}} source={require('../../images/icons8-back.png')} /></TouchableOpacity>
						</Col>
					</Row>
					<Row size={1}>
						<Col>
							<Text>Logo Here</Text>
						</Col>
					</Row>
					<Row size={6}>
						<Col style={{alignItems: 'center', marginLeft: 20, marginRight: 20}}>	
							<Text style={{color: '#e3e4e5', fontSize:20, marginTop: 15, fontFamily: 'Roboto'}}>Create Account</Text>
							<Text style={{color: '#545a64', marginTop: 20, alignItems:'center', justifyContent: 'center'}}>
								Register your email on our APP 
							</Text>	
							<Item style={{marginTop: 15}}>
								<Icon name="person" style={{fontSize: 30, color: '#545a64'}} />
					            <Input 
					            	placeholder='Your Name'
					            	style={{color: '#545a64'}}
					            	keyboardType="email-address"
					        		returnKeyType="next"
					            />
					        </Item>
							<Item style={{marginTop: 15}}>
								<Icon name="chatboxes" style={{fontSize: 30, color: '#545a64'}} />
					            <Input 
					            	placeholder='E-mail address'
					            	style={{color: '#545a64'}}
					            	keyboardType="email-address"
					        		returnKeyType="next"
					            />
					        </Item>
							<Item style={{marginTop: 15}}>
								<Icon name="lock" style={{fontSize: 30, color: '#545a64'}} />
					            <Input 
									placeholder='Password'
									secureTextEntry={true}
					            	style={{color: '#545a64'}}
					            />
					        </Item>
							<Item style={{marginTop: 15}}>
								<Icon name="phone-portrait" style={{fontSize: 30, color: '#545a64'}} />
					            <Input 
									placeholder='Phone number'
									style={{color: '#545a64'}}
									keyboardType="numeric"
					        		returnKeyType="next"
					            />
					        </Item>
					        <Button block success style={{height: 60, marginTop: 20, backgroundColor: '#3ada41'}}>
					            <Text style={{color: '#ffffff'}}>CREATE ACCOUNT</Text>
					        </Button>
						</Col>
						
					</Row>
					<Row size={2}>
						<Col style={{alignItems: 'center', marginTop: 40}}>
							<TouchableOpacity onPress={() => this.goToLogin()}><Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold', paddingBottom: 10}}>ALREADY HAVE AN ACCOUNT?</Text></TouchableOpacity>
						</Col>
					</Row>
				</Grid>
				
			</ScrollView> : null
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#2a2f39'
	}
});