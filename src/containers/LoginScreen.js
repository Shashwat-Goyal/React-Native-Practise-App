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
	AsyncStorage,
	ToastAndroid,
	ActivityIndicator,
	Alert
} from 'react-native';
import LoadingImage from '../components/LoadingImage';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import { isLoggedIn } from '../utils';

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

	static navigationOptions = isLoggedIn() ? {
		drawerLabel: () => null
   	} : {}

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

	openGoogleAuth = async () => {
		/* console.log('entering')
		Linking.openURL("https://www.google.com"); */
		try {
			const result = await Expo.Google.logInAsync({
			  androidClientId: '531138605132-8ptlkdftjb51kqo9ktnnndgnr6upm2qv.apps.googleusercontent.com',
			  //iosClientId: '151704944008-f825n5vtrt5c08p2784f3jrposi7fom4.apps.googleusercontent.com',
			  scopes: ['profile', 'email'],
			});
			console.log(result, "result")
			if (result.type === 'success') {
			  return result.accessToken;
			} else {
			  return {cancelled: true};
			}
		  } catch(e) {
			return {error: true};
		  }
	}

	login() {
		const { user } = this.state;
		const { email, password } = user;
		if(!email || !email.trim()){
			this.showNotification('Please enter your Email');
			return ; 
		}
		if(email) {
			let emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			let res = emailReg.test(email);
			if(!res){
				this.showNotification('Please Provide a valid email');
				return ;
			}
		}
		if(!password || !password.trim()){
			this.showNotification('Please enter your Password');
			return ; 
		}
		this.props.dispatch(actions.login(user));
	}

	showNotification(message='') {
		ToastAndroid.show(
			message,
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM
		  );
	}

	goToSignUp = () => {
		this.props.navigation.navigate('Register');
	}

	focusNextField = (id) => {
		console.log(id, "id")
		this[`${id}Field`].focus();
	}

	openFacebookAuth = async () => {
		console.log("token")
		const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('164414460873792', {
			permissions: ['public_profile'],
		});
		
		if (type === 'success') {
		  // Get the user's name using Facebook's Graph API
		  const response = await fetch(
			`https://graph.facebook.com/me?access_token=${token}`);
		  Alert.alert(
			'Logged in!',
			`Hi ${(await response.json()).name}!`,
		  );
		}
	}

	render() {
		const { email, password } = this.state.user;
		const { loading=false } = this.props.auth || {};
		console.log(this.props, loading, "props")
		return (
			<ScrollView style={newStyles.container}>
				<View>
					<View style={newStyles.headerMargin}>
						{this.state.fontLoaded ? <Text style={newStyles.heading}>SHINGAR JEWELS</Text> : null}
						<TextInput
							name="email"
					        style={newStyles.input}
					        onChangeText={(text) => this.onChangeText('email' , text)}
					        value={email}
					        placeholder="Enter Email address OR username"
					        placeholderTextColor={"gray"}
					        keyboardType="email-address"
							returnKeyType="next"
							blurOnSubmit={ true }
							underlineColorAndroid="transparent"
							onSubmitEditing={() => this.focusNextField('password')}
							ref={(c) => this.emailField = c}
					      />
					    <TextInput
							name="password"
					        style={newStyles.input}
					        onChangeText={(text) => this.onChangeText('password', text)}
					        value={password}
					        placeholder="Your Password"
							secureTextEntry={true}
							blurOnSubmit={ true }
					        placeholderTextColor={"gray"}
					        returnKeyType="go"
							underlineColorAndroid="transparent"
							onSubmitEditing={() => {
								this.login();
							}}
							ref={(c) => this.passwordField = c}
					      />
					    <Text style={{textAlign: 'center', color: 'gray', marginTop: 10}} onPress={() => this.goToForgotPassword()}>
					    	Forgot Password?
					    </Text>
					    <View style={{flex: 1, justifyContent:'center'}}> 
						    <TouchableOpacity style={styles.buttonContainer} onPress={!loading ? () => this.login() : () => {}}>
							    {!loading ? <Text
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
							    </Text> : <ActivityIndicator size="small" color="#FFF" />}
							</TouchableOpacity>
						</View>
						<Text style={{textAlign: 'center', color: 'gray', marginBottom: 10}} onPress={() => this.goToSignUp()}>
							Don't have an account?
 						</Text>
						<Text style={{textAlign: 'center', color: 'gray'}}>
							___________          Or Log In using          ___________
 						</Text>
						<View style={{flex:1, flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.openFacebookAuth()}>
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
		marginTop : 35
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