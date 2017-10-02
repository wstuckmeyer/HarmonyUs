import React, { Component } from "react";
import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView, Animated, KeyboardAvoidingView } from "react-native";
import {
  Container,
  Text,
  View,
  Button,
  Toast,
  Content,
  Header,
  Title,
  Left,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
  H3,
  Footer,
  DeckSwiper,
  Form,
  Item, 
  Label,
  Input,
} from "native-base";
import styles from "./styles";
import Realm from 'realm';
import TabNavigator from 'react-native-tab-navigator';
import firebase from 'firebase'
import {NavigationActions, StackNavigator} from 'react-navigation';
import firebaseApp from '../../components/db.js'
export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      email: undefined,
      password: undefined,
      display: undefined
    }
  }
 saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
    
}
 async signup() {


    
    try { 
      const ref = firebase.database().ref()
      console.log(this.state)
      const disp = this.state.display
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(){
          var user = firebase.auth().currentUser
          console.log(user)
          user.updateProfile({
            displayName: disp
          })
      }).then(this.props.navigation.navigate('Houses'))

        console.log("Account created");
        console.log(this.state.email)
        
      }
    catch (error){
      console.log(error)
      Toast.show({
        text: error.toString(),
        type: 'danger',
        duration: 2500
      })
    }  

    
}


  
  render(){
    return(
      <Image source = {require('../../../assets/Signup.png')}
      style={styles.background}>
      <Button style={styles.back}
      onPress={()=>this.props.navigation.goBack()}
       style={styles.back}>
        <Icon style={styles.icon} name="arrow-back"/>
      </Button>
      <KeyboardAvoidingView behavior='padding' style={styles.view}>
      <H3 style={styles.head}>Sign Up</H3>
         
          <Form >
           
            <Item underline>
              <Input
              style={styles.formtxt}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                placeholderTextColor='white'
              />
            </Item>
            <Item underline>
              <Input
                style={styles.formtxt}
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                placeholderTextColor='white'
              />
            </Item>
            <Item underline>
              <Input 
                style={styles.formtxt}
                onChangeText={display => this.setState({ display })}
                placeholder="Name"
                placeholderTextColor='white'
                />

            </Item>
           <Button style={styles.button} 
           onPress={() => this.signup()}>
                <Text style={styles.txt}>Create Account</Text>
            </Button> 
           
          </Form>
          </KeyboardAvoidingView>
        
      </Image>
      )
  }
}