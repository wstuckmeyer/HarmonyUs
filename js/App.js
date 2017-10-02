import React from "react";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";

import SideBar from "./components/Sidebar";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Drawer from "./Drawer";
import List from "./screens/List";
import Card from "./screens/Card";
import Signup from "./screens/Signup";
import Splash from "./screens/Splash";
import Houses from './screens/Houses'
Drawer.navigationOptions = ({ navigation }) => ({
  header: null
});
const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    List: { screen: List },
    Card: { screen: Card },
    Signup: {screen: Signup},
    Splash: {screen: Splash},
    Houses: {screen: Houses},
    Drawer: { screen: ({navigation}) => <Drawer screenProps={{rootNavigation: navigation}} /> }
  },
  {
    index: 0,
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
