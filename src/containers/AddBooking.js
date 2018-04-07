import React from 'react';
import { Container, Content, Text,
    Form,
    Item,
    Label,
    Input,
    ListItem,
    Body,
    CheckBox,
    Separator } from 'native-base';
import { BackHandler } from 'react-native';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';

export default class AddBooking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep:1,
            bookingDetails: {
                setNo:'',
                setName:'',
                price:0,
                bookingDate:'',
                returnDate:'',
                items: [
                    {label: 'Long Necklace',checked: false},
                    {label: 'Short Necklace',checked: false},
                    {label: 'Earrings',checked: false},
                    {label: 'Maang Tikka',checked: false},
                    {label: 'Maatha Patti',checked: false},
                    {label: 'Armlet',checked: false},
                    {label: 'Haath Phool',checked: false},
                    {label: 'Belt',checked: false},
                    {label: 'Nath',checked: false}
                ]
            },
            userInfo: {
                name: '',
                address: '',
                mobileNo: '',
                alternateNo:''
            }
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        if(this.state.activeStep == 2){
            console.log(this.state.activeStep, "entering")
            this.setState({
                activeStep: 1
            });
            return true;
        }
        else {
            return false;
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onStepChange = (activeStep) => {
        this.setState({
            activeStep
        });
    }

    onChangeDetails = (key, value) => {
        this.setState({
            bookingDetails: {
                ...this.state.bookingDetails,
                [key]: value
            }
        })
    }

    onChangeUserInfo = (key, value) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [key]: value
            }
        })
    }

    setItemChange = (index, value) => {
        let { bookingDetails } = this.state;
        const { checked } = bookingDetails.items[index];
        bookingDetails.items[index].checked = !checked;
        this.setState({
            bookingDetails
        });
    }

    onConfirmBooking = () => {
        //dispatch action to save booking
    }

    render() {
        console.log(this.props.navigation.state);
        const { activeStep, bookingDetails, userInfo } = this.state;
        return (
           <Container>
               {activeStep == 1 ? <Step1 setItemChange={this.setItemChange} bookingDetails={bookingDetails} onStepChange={this.onStepChange} onChange={this.onChangeDetails} /> : null}
               {activeStep == 2 ? <Step2 onStepChange={this.onStepChange} setChange={this.onChangeUserInfo} confirmBooking={this.onConfirmBooking} userInfo={userInfo} /> : null}
           </Container> 
        )
    }
}