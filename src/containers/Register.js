import React from 'react';
import { Font } from 'expo';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
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

	    this.setState({ fontLoaded: true });
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
							<Item style={{marginTop: 30}}>
								<Icon name="chatboxes" style={{fontSize: 30, color: '#545a64'}} />
					            <Input 
					            	placeholder='E-mail address'
					            	style={{color: '#545a64'}}
					            	keyboardType="email-address"
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
							<Text style={{fontSize: 15, color: '#545a64'}}>DON'T HAVE AN ACCOUNT?</Text>
							<Text style={{color: '#FFFFFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 15, paddingBottom: 20}}>LOGIN</Text>
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
		marginTop: 24,
		backgroundColor: '#2a2f39'
	}
});