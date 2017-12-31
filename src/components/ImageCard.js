/*import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'native-base';

export default class ImageCard extends React.Component {
	render () {
		let {height, width} = Dimensions.get('window');
		return (
			<ScrollView>
			<View style={styles.cardContainer}>
            <View style={styles.card}>
              <View resizeMode="cover" style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Commented on</Text>
              </View>
              <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
                style={{
                  padding : 15,
                }}
                >
                <Text style={styles.cardContent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sagittis pellentesque lacus eleifend lacinia...
                </Text>
              </View>
              <View style={styles.cardAction}>
                <Text>My Action</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View resizeMode="cover" style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Commented on</Text>
              </View>
              <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
                style={{
                  padding : 15,
                }}
                >
                <Text style={styles.cardContent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris sagittis pellentesque lacus eleifend lacinia...
                </Text>
              </View>
              <View style={styles.cardAction}>
                <Text>My Action</Text>
              </View>
            </View>
          </View>
          </ScrollView>
			)
	}
}

const styles = StyleSheet.create({
	container : {
		borderWidth: 2,
		borderColor: 'gray',
		flex: 1,	
		height: ((Dimensions.get('window').height)/3),
		width: ((Dimensions.get('window').width)/2),
	},
	hidden: {
		width: 0,
		height: 0
	},
	imageStyles: {
		flex: 1,	
		height: ((Dimensions.get('window').height)/3),
		width: ((Dimensions.get('window').width)/2),
		margin: 5,
		paddingLeft: 10,
		borderWidth: 2,
		borderColor: 'red',
	},
	cardContainer:{
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },

  card:{
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  cardTitleContainer:{
    flex: 1,
    height: 100,
  },
  cardTitle:{
    position: 'absolute',
    top: 20,
    left: 26,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },

  cardContent:{
    padding:0,
    color: 'rgba(0, 0, 0, 0.54)',
  },

  cardAction:{
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    padding: 15,
  },
});

*/

import React, { Component } from 'react';
import { Font } from 'expo';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
export default class ImageCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
			loading: true
		}
	}


	async componentDidMount() {
	    await Font.loadAsync({
	      'oxygen': require('./../../assets/Oxygen/Oxygen-Bold.ttf'),
	    });

	    this.setState({ fontLoaded: true });
	}

	viewProduct() {
		console.log("VIEW PRODUCT SCREEN")
	}

  render() {

  	const { loading } = this.state;
  	const { title, subtitle, image } = this.props;
    return (
      this.state.fontLoaded ? <Container style={{height: 450}}>
        
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={image} />
                <Body>
                  <Text>{title}</Text>
                  <Text note>{subtitle}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody button onPress={() => this.viewProduct()}>
            	
              		<Image onLoad={() => this.setState({loading: false})} source={this.props.image} style={{height: loading ? 0 : 300, width: null, flex: 1}} />
					{loading ? <Text>Loading...</Text> : null}            
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container> : null
    );
  }
}