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
import { DatePickerAndroid, TextInput, Modal, Alert } from 'react-native';
import moment from 'moment';
import { showErrorAlert } from '../utils';

export default class Step1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    validate = (bookingDetails) => {
        const { setNo='', setName='', price='', bookingDate='', returnDate='', items=[] } = bookingDetails;
        if(!setNo || !setNo.trim()) {
            showErrorAlert('Please Enter Set Number');
            return false;
        }
        if(!setName || !setName.trim()) {
            showErrorAlert('Please Enter Set Name');
            return false;
        }
        if(!price || !price.trim()) {
            showErrorAlert('Please Enter Booking Price');
            return false;
        }
        if(!bookingDate) {
            showErrorAlert('Please Enter Date of Booking');
            return false;
        }
        if(!returnDate) {
            showErrorAlert('Please Enter Date of Return');
            return false;
        }
        if(items.length) {
            const filteredItems = items.filter(item => item.checked);
            if(!filteredItems.length) {
                showErrorAlert('Please Select at least one set item to proceed');
                return false;
            }
        }
        return true;
    }

    changeStep(){
        const valid = this.validate(this.props.bookingDetails);
        if(valid)
            this.props.onStepChange(2);
    }

    openAndroidDatePicker = async (key) => {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date(),
            minDate: key == 'bookingDate' ? new Date() : new Date(this.props.bookingDetails.bookingDate),
            mode: 'default'
          });

          if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this.props.onChange(key, moment(`${month+1}/${day}/${year}`).unix() * 1000);
                if(key == 'bookingDate') {
                    this.returnDate._root.focus();
                }
            }
            this[`${key}`]._root.blur();
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }

    focusNextField = (id) => {
		this[`${id}`]._root.focus();
	}

    render() {
        //console.log(this.props.navigation.state);
        const { bookingDetails={} } = this.props;
        const { setNo='', setName='', price='', bookingDate='', returnDate='', items=[] } = bookingDetails;
        console.log(bookingDate, "bookingDate")
        return (
           <Container>
               <Header>
                    <Left>
                        <Button transparent>
                        <Icon name='arrow-back' onPress={() => this.props.navigation.navigate('Home')}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Booking Details</Title>
                    </Body>
                    <Right></Right>
                </Header>
               <Content>
                    <Form>
                        <Item>
                            <Label>Set Number</Label>
                            <Input 
                                value={`${setNo}`} 
                                onChangeText={(text) => this.props.onChange('setNo', text)} 
                                keyboardType='numeric'
                                blurOnSubmit={true}
                                onSubmitEditing={() => this.focusNextField('setName')}
                                returnKeyType="next"
                            />
                        </Item>
                        <Item>
                            <Label>Set Name</Label>
                            <Input 
                                ref={(c) => this.setName = c}
                                value={setName} 
                                onChangeText={(text) => this.props.onChange('setName', text)} 
                                blurOnSubmit={true}
                                onSubmitEditing={() => this.focusNextField('price')}
                                returnKeyType="next"
                            />
                        </Item>
                        <Item>
                            <Label>Booking Price</Label>
                            <Input 
                                ref={(c) => this.price = c}
                                value={`${price ? price : ''}`} 
                                onChangeText={(text) => this.props.onChange('price', text)} 
                                keyboardType='numeric'
                                blurOnSubmit={true}
                                onSubmitEditing={() => this.focusNextField('bookingDate')}
                                returnKeyType="next"
                            />
                        </Item>
                        <Item>
                            <Label>Date of Booking</Label>
                            <Input 
                                ref={(c) => this.bookingDate = c} 
                                value={bookingDate ? moment(bookingDate).format('DD/MM/YYYY') : ''} 
                                onFocus={() => this.openAndroidDatePicker('bookingDate')}
                                returnKeyType="next"
                            />
                        <Icon active name='calendar' onPress={() => this.openAndroidDatePicker('bookingDate')} />
                        </Item>
                        <Item last>
                            <Label>Date of Return</Label>
                            <Input 
                                ref={(c) => this.returnDate = c} 
                                value={returnDate ? moment(returnDate).format('DD/MM/YYYY'): ''} 
                                onFocus={() => this.openAndroidDatePicker('returnDate')}
                                returnKeyType="next"
                                disabled={!bookingDate}
                            />
                            {bookingDate ? <Icon active name='calendar' onPress={() => this.openAndroidDatePicker('returnDate')}/> : <Icon name='information-circle' />}
                        </Item>
                        <Separator bordered>
                            <Text>Set Items</Text>
                        </Separator>
                        {
                            items && items.length && items.map((setItem, index) => {
                                return <ListItem key={index}>
                                    <Body>
                                        <Label>{setItem.label}</Label>
                                    </Body>
                                    <CheckBox checked={setItem.checked} onPress={(value) => this.props.setItemChange(index, value)} />
                                </ListItem>
                            })
                        }
                    </Form>
                    <Button block onPress={() => this.changeStep()}><Text>Next</Text></Button>
                </Content>
           </Container> 
        )
    }
}