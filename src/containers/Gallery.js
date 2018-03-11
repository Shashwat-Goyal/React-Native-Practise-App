import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ImageCard from '../components/ImageCard';
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
 Spinner 
} from 'native-base';
import { Font } from 'expo';

export default class Gallery extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false
		}
	}

	async componentDidMount() {
	    await Font.loadAsync({
	      'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
	    });

	    this.setState({ fontLoaded: true });
	}

	render() {

		const imageURL = 'https://www.manekratna.com/images/';
		const { fontLoaded } = this.state;

		const products = [
			{title: 'Sets', subtitle: 'Polki', image: 'cz-jewellery	', productDetail: 'Product Detail Here'},
			{title: 'Sets', subtitle: 'Kundan', image: 'bangles', productDetail: 'Product Detail Here'},
			{title: 'Sets', subtitle: 'Bridal', image: 'temple-jewellery', productDetail: 'Product Detail Here'},
			{title: 'Earrings', subtitle: 'Polki', image: 'thewa-jewellery', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'polki-jewellery', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'maang-tika', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'kundan-jewellery', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'finger-rings', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'earrings', productDetail: 'Product Detail Here'},
			{title: 'Product Title', subtitle: 'Product SubTitle', image: 'antique-jewellery', productDetail: 'Product Detail Here'}
		]

		return (
			fontLoaded ? <ScrollView style={{marginTop: 25}}>
				<Header 
					searchBar 
					iosBarStyle="dark-content"
					androidStatusBarColor="#fff"
				>
					 <Left>
			            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
			              <Icon name='arrow-back' />
			            </Button>
			          </Left>
					<Body>
		            	<Title>Categories</Title>
		          	</Body>
		        </Header>
				{products && products.map((product, index) => {
					return <ImageCard key={index}
						image={{uri: `${imageURL}${product.image}.jpg`}}
						title={product.title}
						subtitle={product.subtitle}
						productDetail={product.productDetail}
					/>
				})}
			</ScrollView> : <View style={{marginTop: 200}}><Spinner color="green"></Spinner></View>
			)
	}
}