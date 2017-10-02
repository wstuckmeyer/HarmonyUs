import React, { Component } from "react";
import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView } from "react-native";
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
import {NavigationActions} from 'react-navigation';
export default class Shopping extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Expenses',
    tabBarIcon: (<Image style={styles.icon} source={require('../../../assets/icons8-wallet.png')}/>)
  }
  render(){
    return(
      <Header style={styles.header}>
        <Body>
          <Title style={styles.head}>HarmonyUs</Title>
        </Body>
      </Header>
      )
  }
}
