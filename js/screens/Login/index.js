import React, { Component } from "react";
import { Image, Animated, Keyboard, Platform } from "react-native";
import {
  Container,
  Text,
  View,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast,
  Content,
  Icon,
  H3
} from "native-base";

import styles from "./styles";
import firebase from 'firebase';
import firebaseApp from '../../components/db.js'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined
    };
    
  }
  
  async login() { 
    const ref = firebase.database().ref()
    try {
      await firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password);
            this.props.navigation.navigate('Drawer')
          } catch (error) {
            Toast.show({
              text:'Incorrect Username/password',
              type: 'danger',
              duration: 2500
            })
          }
          
      } 
  
  render() {
    const {navigate} = this.props.navigation;
    return (

      <Image
       source={require('../../../assets/Signup2.png')}
       style={styles.background}>
       <Button onPress={()=>this.props.navigation.goBack()}
       style={styles.back}>
        <Icon style={styles.icon} name="arrow-back"/>
      </Button>
        <H3 style={styles.h3}>Log In </H3>
        <Form>
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
           <Button full 
           style={styles.button} 
           onPress={() => this.login()}>
                <Text style={styles.txt}>Log In</Text>
            </Button> 
        </Form>
       </Image>
    );
  }
}
