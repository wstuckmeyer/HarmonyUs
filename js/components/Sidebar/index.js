import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Text,
  View,
  Button,
  Content,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Badge,
  Toast
} from "native-base";
import {NavigationActions, StackNavigator} from 'react-navigation';

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import styles from "./styles";
import firebase from 'firebase';
import firebaseApp from '../../components/db.js';
import Splash from '../../screens/Splash';
const datas = [
 
  {
    name: "Logout",
    route: "Splash",
    icon: "../../../assets/icons8-login_rounded_right.png"
  }
];
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Splash'}),
  ]
})


export default class Sidebar extends Component {


logout(){
  firebase.auth().signOut().then(() => {
            this.props.navigator.push({
                component: Splash
            });
        });
    }
  



  pushPage(route) {
    const rootNavigation = this.props.screenProps.rootNavigation;
    rootNavigation.navigate(route);
    this.props.navigation.navigate("DrawerClose");
  }
  render() {
    const rootNavigation = this.props.screenProps.rootNavigation;
   // var user = firebase.auth().currentUser
    return (
     
      <Container>
       
        <Content bounces={false} style={styles.background}>
          <Image
            source={require("./../../../assets/FinalLogo.png")}
            style={styles.image}
          />
        
        {datas.map((data, i) =>
            <ListItem
              button
              key={i}
              noBorder
              onPress={() => (data.route === 'Login') ? rootNavigation.dispatch(resetAction) : this.pushPage(data.route)}
              style={styles.list}
            >
              <Left>
                <Image 
                style={{width: 35, height: 35}}
                source={require('../../../assets/icons8-login_rounded_right.png')}/>
                <Text style={styles.text}>
                  {data.name}
                </Text>
              </Left>
            </ListItem>
          )}
        </Content>

      </Container>
      
    );
  }
}
