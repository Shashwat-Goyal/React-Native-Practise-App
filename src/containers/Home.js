import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import {
	Grid,
	Row,
	Col
} from 'react-native-easy-grid';
import { Container, Header, Title, Content, Left, Body, Right, Icon, Segment, Text, Button } from 'native-base';
import { Font } from 'expo';
import Gallery from './Gallery';
import { products, imageURL } from '../constants';
import ImageCard from '../components/ImageCard';

export default class Home extends React.Component {
  
	constructor(props) {
	  super(props);
	  this.state = {
		fontLoaded: false,
		active: 'FAV'
	  }
	}
  
	async componentDidMount() {
		await Font.loadAsync({
		  'Roboto': require('native-base/Fonts/Roboto.ttf'),
		  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
  
		this.setState({ fontLoaded: true });
	}
  
	setActiveTab(key) {
	  this.setState({
		active: key
	  });
	}

	viewProduct = (id) => {
		console.log(id, "id")
		this.props.navigation.navigate('AddBooking', {id})
	}
  
	render() {
	  const { active, fontLoaded } = this.state;
	  const buttonStyle = {
		width: 30
	  }
	  return (
		fontLoaded ? <Container>
		   <Header hasTabs style={{backgroundColor: "#FFF"}} >
		   		<Left></Left>
				<Body style={{flex: 1, flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
					<Image style={{width: 50, height: 50}} source={require('../../images/logo.jpg')}></Image><Title style={{color: '#b9924d', textAlignVertical: 'center', fontSize: 15}}> SHINGAR JEWELS</Title>
				</Body>
				<Right>
					<Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
						<Icon name='menu' />
					</Button>
				</Right>
		  	</Header>
		  <Content>
			{/* <Grid>
			  <Row style={{height: 40, paddingLeft: 30, paddingRight: 10, backgroundColor:"#1e2831"}}>
				<Col><Text style={{color: '#FFFFFF'}}>BTC</Text></Col>
				<Col><Text style={{color: '#FFFFFF'}}>XMR</Text></Col>
				<Col><Text style={{color: '#FFFFFF'}}>DSH</Text></Col>
				<Col><Text style={{color: '#FFFFFF'}}>LTC</Text></Col>
				<Col><Text style={{color: '#FFFFFF'}}>BCH</Text></Col>
			  </Row>
			  <Row>
				<Col size={1}>
				  <Text>IOTA/BTC {'\n'} Vol: 4480</Text>
				</Col>
				<Col size={2} style={{alignItems: 'center'}}>
				  <Text>Vol: 4480</Text>
				</Col>
				<Col size={1}>
				  <Text>Vol: 4480</Text>
				</Col>
			  </Row>
			</Grid> */}
			<Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>NEW ARRIVALS</Text>
			{products && products.map((product, index) => {
				return <ImageCard key={index}
					image={{uri: `${imageURL}${product.image}.jpg`}}
					title={product.title}
					subtitle={product.subtitle}
					productDetail={product.productDetail}
					name={product.name}
					viewProduct={this.viewProduct}
				/>
			})}
		  </Content>
		</Container> : null
	  );
	}
  }