/* import React from 'react';
import { Button, CameraRoll, View, Image } from 'react-native';
import RNCameraRoll from 'react-native-cameraroll';
import { ImagePicker } from 'expo';

export default class UploadSet extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          //allowsEditing: true,
          //aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      }

    render() {
        return (
            <View  style={{marginTop: 24}}>
                <Button onPress={this._pickImage} title="Upload Image"></Button>
                {this.state.image && <Image source={{uri:this.state.image}} style={{ width: 200, height: 200 }} />}
            </View>
            
        )
    }
}

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
    skipBackup: true,
    path: 'images'
    }
}; */

import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Image, Dimensions } from 'react-native';
import ImageBrowser from '../components/ImageBrowser';
import {
    Header,
    Left,
    Button as NativeButton,
    Icon,
    Body,
    Title,
    Right,
    Container,
    Input, 
    Label,
    Form,
    Item,
    Content,
    Separator,
    ListItem,
    CheckBox
} from 'native-base';
import {
    Grid,
    Row,
    Col
} from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    }
  }
  imageBrowserCallback = (callback) => {
      console.log(callback, "callback")
    callback.then((photos) => {
      console.log(photos, "photos");
      photos && photos.length && photos.map((photo, index) => {
        Image.getSize(photo.file, (w, h) => {
            console.log(h, w, "height and width")
            //width = w;
            photos[index].height = h;
            this.setState({
                photos
            })
        }, (error) => {
            console.log("ScaledImage:componentWillMount:Image.getSize failed with error: ", error)
        })
      })
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    const { width } = Dimensions.get('window');
      let height = 250;
      //let width = null;
    return(
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}><Text>1522hc</Text><Image
        style={{height: height, width}}
        source={{uri: item.file}}
        key={i}
        resizeMode="contain"
      /></View>
    )
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return(<ImageBrowser max={5} callback={this.imageBrowserCallback}/>);
    }
    return (
     
       <Container>
        <Header>
          <Left>
            <NativeButton transparent>
              <Icon name='arrow-back' onPress={() => this.props.navigation.navigate('Home')}/>
            </NativeButton>
          </Left>
          <Body>
            <Title>Add Set Info</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Form>
            <Item inlineLabel>
              <Label>Set Name</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>Set Number</Label>
              <Input />
            </Item>
            <Item inlineLabel>
              <Label>Quantity</Label>
              <Input keyboardType='numeric'/>
            </Item>
            <Item inlineLabel last>
              <Label>Price</Label>
              <Input />
            </Item>
            {/* <Separator bordered>
                <Text>Set Items</Text>
            </Separator>
            <ListItem>
                <Body>
                <Label>Long Necklace</Label>
                </Body>
                <CheckBox checked={true} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Short Necklace</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Earrings</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Maang Tikka</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Maatha Patti</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Armlet</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Haath Phool</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Belt</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem>
            <ListItem>
                <Body>
                <Label>Nath</Label>
                </Body>
                <CheckBox checked={false} />
            </ListItem> */}
          </Form>
          <Button
            title="Upload Images"
            onPress={() => this.setState({imageBrowserOpen: true})}
            />
            {/* <Text>This is an example of a</Text>
            <Text>multi image selector using expo</Text> */}
            {/* <ScrollView>
                {this.state.photos.map((item,i) => i%2 ? <Row size={2} key={i}>{this.renderImage(item,i)}</Row> : this.renderImage(item,i))}
            </ScrollView> */}
            <Swiper style={{flex:1, width: 400}} showButtons={true}>
                {this.state.photos.map((item,i) => this.renderImage(item,i))}
            </Swiper>
            <Row size={2}>
                <Col size={1}>
                    <NativeButton block
                    ><Text>Save Info</Text></NativeButton>
                </Col>
                <Col size={1}>
                    <NativeButton block
                    ><Text>Save and Add Booking</Text></NativeButton>
                </Col>
            </Row>
        </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});