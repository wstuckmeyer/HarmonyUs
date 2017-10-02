import React, { Component } from "react";
import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView, Animated, KeyboardAvoidingView, StatusBar } from "react-native";
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
import {NavigationActions, StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';
import firebaseApp from '../../components/db.js'

export default class Houses extends React.Component{

 constructor(props){
  super(props);
  this.state={
    query: null,
    btn: null,
    exists: null
  }
 }
 async find(){
 
  var ref = firebase.database().ref('Houses') ;
  var timestamp = new Date().getUTCMilliseconds();
  ref.once('value').then((snapshot)=>{
    console.log("SNAPSHOT OF THE HOUSES OBJ",snapshot.val())
   
    var obj = snapshot.val()
    console.log(obj.Help)
    Object.keys(obj).map((id)=>
       Object.keys(obj[id]).map((key)=>{
        if(this.state.query == key){
          this.setState({
            exists: true
          })
          
        }
       }
      ))
    if(this.state.exists == true){
      const house = this.state.query
           Object.keys(obj).map((id)=>
       Object.keys(obj[id]).map((key)=>{
         var userID = firebase.auth().currentUser.uid;
         if(key == this.state.query){
            var newuser = firebase.database().ref('Houses/' + id + '/' + key + '/').push(userID)
            firebase.auth().currentUser.updateProfile({
              photoURL: house
            })
         }
          
        }
       
      ))
          this.props.navigation.navigate('Drawer')
        }else if(this.state.exits == null){
          var userID = firebase.auth().currentUser.uid;
          var ref = firebase.database().ref('Houses') ;
          console.log(userID)
          var timestamp = new Date();
          var newHome = firebase.database().ref('Houses/').push(timestamp).then(firebase.database().ref('Houses/' + timestamp + '/' + this.state.query + '/').push(userID))
          firebase.auth().currentUser.updateProfile({
              photoURL: house
            })
            this.props.navigation.navigate('Drawer')
        }
  })
    
  
}

 add(){
  console.log("Yaaaaassss")
    
 }

  
  render(){
   
    return(
      <Image
      style={styles.background}
      source={require('../../../assets/houses.jpg')}>

        <H3 style={styles.h3}>Find Your Home</H3>
        
        <Form>
          <Item underline>
            <Input
              placeholder="Home Name"
              placeholderTextColor="white"
              onChangeText={query => this.setState({ query })}
             />
          </Item>
          <Button full 
           style={styles.button} 
           onPress={() => this.find()}>
                <Text style={styles.txt}>Go</Text>
            </Button>
        </Form>
      </Image>

    )
  }
}