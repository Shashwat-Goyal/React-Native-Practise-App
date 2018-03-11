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

export default class ForgotPassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
			email: '',
			err: ''
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

	onChangeEmail = (value) => {
		this.setState({
			email: value,
			err : ''
		})
	}

	sendResetPasswordLink = () => {
		const { email } = this.state;
		if(!email || !email.trim()) {
			err = 'Email is required';
		}
		if(email) {
	      let emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	      let res = emailReg.test(email);
	      if(!res){
	      	err = 'Provide a valid email';
	      }
	    }
	    this.setState({err});
	    if(!err) {
	    	this.props.dispatch(actions.sendResetPasswordLink(email));
	    }
	}

	goToSignUp = () => {
		this.props.navigation.navigate('Register');
	} 

	render() {

		const { fontLoaded, email, err } = this.state;
		const screenHeight = Dimensions.get('window').height;
		console.log(email, "email")
		return (
			fontLoaded ? <ScrollView style={styles.container}>
				<Grid>	
					<Row size={1}>
						<Col>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Image style={{marginLeft: 0, overlayColor: '#FFFFFF'}} source={require('../../images/icons8-back.png')} /></TouchableOpacity>
						</Col>
					</Row>
					<Row size={6}>
						<Col style={{alignItems: 'center', marginLeft: 20, marginRight: 20}}>
							<Icon name="lock" style={{fontSize: 60, color: '#ffffff'}}/>	
							<Text style={{color: '#e3e4e5', fontSize:20, marginTop: 15, fontFamily: 'Roboto'}}>Forgot Password</Text>
							<Text style={{color: '#545a64', marginTop: 20, alignItems:'center', justifyContent: 'center'}}>
								We just need your registered email address to send you password reset link
							</Text>	
							<Item style={{marginTop: 30}} error={err ? true : false}>
								<Image style={{width: 30, height: 30}} source={require('../../images/profile-icon-png-898.png')} />
					            <Input 
					            	placeholder='E-mail address'
					            	style={{color: '#545a64'}}
					            	keyboardType="email-address"
					        		returnKeyType="next"
					        		onChangeText={(text) => this.onChangeEmail(text)}
					            	value={email}
					            />
					        </Item>
					        <Button 
					        	block 
					        	success 
					        	style={{height: 60, marginTop: 20, backgroundColor: '#3ada41'}}
					        	onPress={() => this.sendResetPasswordLink()}
					        >
					            <Text style={{color: '#ffffff'}}>RESET PASSWORD</Text>
					        </Button>
						</Col>
					</Row>
					<Row size={1}></Row>
					<Row size={2}>
						<Col style={{alignItems: 'center', marginTop: 40}}>
							<Text style={{fontSize: 15, color: '#545a64'}}>DON'T HAVE AN ACCOUNT?</Text>
							<TouchableOpacity onPress={() => this.goToSignUp()}><Text style={{color: '#FFFFFF', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 15, paddingBottom: 20}}>REGISTER</Text></TouchableOpacity>
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