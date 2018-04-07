import React from 'react';
import { Container, Content, Text,
    Form,
    Item,
    Label,
    Input,
    ListItem,
    Body,
    CheckBox,
    Separator,
    Header,
    Left, 
    Right,
    Button,
    Icon,
    Title
} from 'native-base';
import { showErrorAlert } from '../utils';

export default class Step2 extends React.Component {

    validate = (userInfo) => {
        const { name, address, mobileNo, alternateNo } = userInfo;
        if(!name || !name.trim()) {
            showErrorAlert('Please Enter Ccustomer Name');
            return false;
        }
        if(!mobileNo || !mobileNo.trim()){
            showErrorAlert('Please Enter Customer Mobile Number');
            return false;
        }
        if(!address || !address.trim()){
            showErrorAlert('Please Enter Customer Address');
            return false;
        }
        return true;
    }

    confirmBooking = () => {
        const { valid } = this.validate(this.props.userInfo);
        if(valid) {
            this.props.confirmBooking();
        }
    }

    render() {
        //console.log(this.props.navigation.state);
        const { userInfo } = this.props;
        return (
           <Container>
               <Header>
                    <Left>
                        <Button transparent>
                        <Icon name='arrow-back' onPress={() => this.props.onStepChange(1)}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{fontSize: 17}}>Customer Details</Title>
                    </Body>
                    <Right></Right>
                </Header>
               <Content>
                    <Form>
                        <Item inlineLabel>
                            <Label>Name</Label>
                            <Input 
                                onChangeText={(value) => this.props.setChange('name', value)} 
                                value={userInfo.name}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Mobile Number</Label>
                            <Input 
                                onChangeText={(value) => this.props.setChange('mobileNo', value)} 
                                value={userInfo.mobileNo} 
                                keyboardType='phone-pad'
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label>Alternate Number</Label>
                            <Input 
                                onChangeText={(value) => this.props.setChange('alternateNo', value)} 
                                value={userInfo.alternateNo} 
                                keyboardType='phone-pad'
                            />
                        </Item>
                        <Item inlineLabel last>
                            <Label>Address</Label>
                            <Input 
                                onChangeText={(value) => this.props.setChange('address', value)} 
                                value={userInfo.address} 
                                autoGrow
                            />
                        </Item>
                    </Form>
                    <Button block onPress={() => this.confirmBooking()}><Text>Confirm Booking</Text></Button>
                </Content>
           </Container> 
        )
    }
}