import React, { Component } from "react";
import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView, StatusBar  } from "react-native";
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
  DeckSwiper
} from "native-base";
import styles from "./styles";
import TabNavigator from 'react-native-tab-navigator';
import Login from '../Login';
import Signup from '../Signup'
import {StackNavigator, NavigationActions} from 'react-navigation';
export default class Splash extends React.Component {
   componentDidMount() {
       StatusBar.setHidden(true);
    }
  
  render(){
    const {navigate} = this.props.navigation;
    return(
      <Image 
        source = {require('../../../assets/Login.png')}
        style={styles.background}
        >
        <Image source = {require('../../../assets/FinalLogo.png')}
        style={styles.logo}/>
        <Button full style={styles.login}  
        onPress={()=>navigate('Login')}>
          <Text style={styles.buttonTxt}>Login</Text>
        </Button>
        <Button full style={styles.signup}
        onPress={()=>navigate('Signup')}>
          <Text style={styles.buttonTxt}>Sign Up</Text>
        </Button>


      </Image>

        
      




      )
  }
}