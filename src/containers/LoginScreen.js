import React from 'react';
import { Font } from 'expo';
import { 
	Image, 
	Linking, 
	View, 
	Text, 
	StyleSheet, 
	TextInput, 
	TouchableOpacity, 
	ScrollView, 
	Button, 
	AsyncStorage
} from 'react-native';
import LoadingImage from '../components/LoadingImage';
import actions from '../redux/actions';
import { connect } from 'react-redux';

@connect((state) => state)
export default class LoginScreen extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			user: {
				email: '',
				password: ''
			},
			fontLoaded: false
		};
	}

	async componentDidMount() {
	    await Font.loadAsync({
	      'oxygen': require('./../../assets/Oxygen/Oxygen-Bold.ttf'),
	    });

	    this.setState({ fontLoaded: true });
	    Linking.addEventListener('url', this._handleURL);
	}

	_handleURL(event) {
		console.log(event.url)
	}

	onChangeText(name, value) {
		console.log(name, value)
		this.setState({
			user:{
				...this.state.user,
				[name] : value
			}
		});
	}

	goToForgotPassword() {
		this.props.navigation.navigate('ForgotPassword');		
	}

	openGoogleAuth() {
		console.log('entering')
		Linking.openURL("https://www.google.com");
	}

	render() {
		this.props.dispatch(actions.fetchData());
		const { email, password } = this.state.user;
		console.log(AsyncStorage, email, password, "AsyncStorage");
		return (
			<ScrollView style={newStyles.container}>
				<View>
					<View style={newStyles.headerMargin}>
						{this.state.fontLoaded ? <Text style={newStyles.heading}>COMPANY NAME</Text> : null}
						<TextInput
							name="email"
					        style={newStyles.input}
					        onChangeText={(text) => this.onChangeText('email' , text)}
					        value={email}
					        placeholder="Enter Email address OR username"
					        placeholderTextColor={"gray"}
					        keyboardType="email-address"
					        returnKeyType="next"
					        underlineColorAndroid="transparent"
					      />
					    <TextInput
							name="password"
					        style={newStyles.input}
					        onChangeText={(text) => this.onChangeText('password', text)}
					        value={password}
					        placeholder="Your Password"
					        secureTextEntry={true}
					        placeholderTextColor={"gray"}
					        returnKeyType="go"
					        underlineColorAndroid="transparent"
					      />
					    <Text style={{textAlign: 'center', color: 'gray', marginTop: 5}} onPress={() => this.goToForgotPassword()}>
					    	Forgot Password?
					    </Text>
					    <View style={{flex: 1, justifyContent:'center'}}> 
						    <TouchableOpacity style={styles.buttonContainer}>
							    <Text
							    	style={{textAlign: 'center', 
							    		color: 'black', 
							    		fontSize: 20, 
							    		backgroundColor: '#fff', 
							    		padding:15, 
							    		height: 60, 
							    		minWidth: 200,
							    		borderRadius: 25,
							    	}}
							    >
							    Log In
							    </Text>
							</TouchableOpacity>
						</View>
						<Text style={{textAlign: 'center', color: 'gray'}}>
							___________        Or Log In using          ___________
 						</Text>
						<View style={{flex:1, flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style={{alignSelf: 'center'}}>
								<Image 
									source={require('../../images/ZW4QC.png')}
								/>
							</TouchableOpacity>
						</View>
						<TouchableOpacity style={{alignSelf: 'center', paddingBottom: 20}} onPress={() => this.openGoogleAuth()}>
							<Image 
								source={require('../../images/google_login_large.png')}
								style={{marginTop: 10, alignSelf: 'center', width: 210, height: 45}}
							/>
						</TouchableOpacity>
					</View>
				{/*<LoadingImage source={require('../../images/dp_se6.jpg')} />
				<View style={styles.formContainer}>
					<TextInput
						name="email"
				        style={styles.input}
				        onChangeText={(text) => this.onChangeText('email' , text)}
				        value={email}
				        placeholder="UserName or Email"
				        placeholderTextColor={"gray"}
				      />
				    <TextInput
						name="password"
				        style={styles.input}
				        onChangeText={(text) => this.onChangeText('password', text)}
				        value={password}
				        placeholder="Password"
				        secureTextEntry={true}
				        placeholderTextColor={"gray"}
				      />
				    <TouchableOpacity style={styles.buttonContainer}>
				    	<Text style={styles.buttonText}>
				    		Login
				    	</Text>
				    	<Button
					        onPress={() => this.props.navigation.goBack()}
					        title="Go back home"
					    />
				    </TouchableOpacity>
				</View>*/}
			</View>
			</ScrollView>
			)
	}
}

const styles = StyleSheet.create({
	hidden: {
		width: 0,
		height: 0
	},
	formContainer : {
		padding: 20,
	},
	input : {
		height: 40,
		marginBottom : 20,
		color: "red",
		paddingHorizontal: 10,
		borderColor: '#932322',
		borderWidth: 1,
	},
	buttonContainer : {
		alignItems: 'center',
		padding: 20,
		justifyContent: 'center',
		alignSelf: "center"
	},
	buttonText: {
		textAlign: 'center',
		color: "#fff"
	}
});

const newStyles = StyleSheet.create({
	heading : {
		color: '#fff',
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 5,
		borderBottomWidth : 2,
		borderBottomColor : '#3f3f3f',
		fontFamily: 'oxygen'
	},
	headerMargin : {
		marginTop : 60
	},
	container: {
		backgroundColor : '#151515',
		flex: 1
	},
	input : {
		height: 60,
		borderRadius: 30,
		backgroundColor: 'black',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
		textAlign:'center',
		color: '#fff'
	},
	loginButton : {
		height: 60,
		borderRadius: 30,
		backgroundColor: '#FFF',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
		textAlign:'center',
		color: 'gray',
		width: 150
	}
});