import React, { Component } from 'react';
import { Container, Header, Title, Content, Left, Body, Right, Icon, Segment, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Font } from 'expo';

export default class CurrencyList extends Component {
  
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

  render() {
    const { active, fontLoaded } = this.state;
    const buttonStyle = {
      width: 30
    }
    return (
      fontLoaded ? <Container>
         <Header hasTabs backgroundColor="#1e2831" >
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Markets</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Grid>
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
          </Grid>
        </Content>
      </Container> : null
    );
  }
}