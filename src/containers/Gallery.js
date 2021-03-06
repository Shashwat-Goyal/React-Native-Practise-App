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
import { products, imageURL } from '../constants';

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
		const { fontLoaded } = this.state;

		return (
			fontLoaded ? <ScrollView>
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
						name={product.name}
					/>
				})}
			</ScrollView> : <View style={{marginTop: 200}}><Spinner color="green"></Spinner></View>
			)
	}
}