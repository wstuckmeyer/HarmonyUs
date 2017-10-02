import React, { Component } from "react";
import { Image } from "react-native";
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
} from "native-base";
import {TabNavigator, StackNavigator} from 'react-navigation';
import Expenses from './expenses';
import Shopping from './shopping';
import Tasks from './tasks';

import styles from "./styles";

var MainScreenNavigator = TabNavigator({
  Tab1: {screen:Tasks},
  Tab2: {screen:Expenses}
})

MainScreenNavigator.navigationOptions = {
  title: 'Main Tabs',
  animationsEnabled: true,
  activeTintColor:'#ff1683'
}

export default MainScreenNavigator;