  import React, { Component } from "react";
  import { Image, TouchableOpacity, TabBarIOS, ListView, ScrollView, Dimensions, TouchableHighlight, Separator, StatusBar, Picker } from "react-native";
  import Swipeout from 'react-native-swipeout';
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
    Input,
    Item,
    List,
    ListItem,
    

  } from "native-base";
  import styles from "./styles";
  import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
  import TabNavigator from 'react-native-tab-navigator';
  import firebase from 'firebase';
  import firebaseApp from '../../components/db.js'
  import {NavigationActions} from 'react-navigation';
  import SmartPicker from 'react-native-smart-picker'
  import Modal from 'react-native-animated-modal';
  import SimplePicker from 'react-native-simple-picker';
  const width = Dimensions.get('window').width
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const options = ['#2fe049', '#3fd2ff', '#ff1462', '#ff6e21', '#6a20ff'];

// Labels is optional
  const labels = ['Grocery', 'Cleaning', 'Meeting', 'Money', 'Fun']
  export default class Shopping extends React.Component {
    static navigationOptions = {
      activeTintColor:'#ff1683',
      tabBarLabel: 'To-Do',
      tabBarIcon: (<Image style={styles.icon} source={require('../../../assets/icons8-to_do.png')}/>)
      
    };
    constructor(props) {
      super(props);
      var myFirebaseRef = firebase.database().ref('Houses');
      this.itemsRef = myFirebaseRef.child('Tasks')
      this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
        data: {},
        isModalVisible: false,
        newitem: null,
        id: null,
        houseName: null,
        tasks: {},
        loading:true,
        selected1: "key1"
      };
      this.items = [];
      this.currentHouse = null
      
    }
     _showModal = () => this.setState({ isModalVisible: true });
   
    _hideModal = () => {
      this.setState({ isModalVisible: false })
      if(this.state.newitem != null){
        const homeid = this.state.id
        const homename = this.state.houseName
        const modifyTasks = []
         var userID = firebase.auth().currentUser.displayName;
         //console.log(userID)
        firebase.database().ref('Houses/Tasks/'  ).push({
              title: this.state.newitem,
              user: userID,
              house: this.state.id,
              houseid: firebase.auth().currentUser.photoURL, 
              userid: firebase.auth().currentUser.uid,
              icon: this.state.selected1  
            })

      }
    }



  componentDidMount(){
    StatusBar.setHidden(false)
    var currentHouse= ''
    console.log(firebase.auth().currentUser.belongsto)
    
    var userID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('Houses');
    ref.once('value').then((snapshot)=>{
    var obj = snapshot.val()
    Object.keys(obj).map((id)=>
      Object.keys(obj[id]).map((names)=>
        Object.values(obj[id][names]).map((users)=>{
          if(users==userID){
             var stuff = obj[id][names]
             house = names
             //currentHouse = names
             
             
          this.setState({
              data: stuff,
              id: id,
              houseName: names,
              tasks: obj[id][names]['tasks'],
            })
          this.currentHouse = names
            this.setState({
          loading: false
        });     
          }
         }
       )
    )
  ) 

  var taskref = firebase.database().ref('Houses/Tasks')
 taskref.once('value').then((snapshot)=>{
  const rows=[]
  Object.values(snapshot.val()).map((stuff)=>{
    console.log(stuff)
    
    // if(this.state.houseName==stuff.houseid){
    //   this.items.push(stuff)
    // }
    
    
  })
  console.log(rows)
  // this.setState({
  //       dataSource:this.state.dataSource.cloneWithRows(this.items)
  //     })
 })
 
     })

    this.itemsRef.on('child_added', (dataSnapshot) => {
      console.log(dataSnapshot.val())
      var id = dataSnapshot.val().houseid
      var currentUser = firebase.auth().currentUser.photoURL
      console.log(currentUser)
      console.log(this.currentHouse)
      console.log(id)
       if(currentUser==id){
        this.items.push({id: dataSnapshot.key, data: dataSnapshot.val()});
     }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.items)
    });
    console.log(dataSnapshot)
  });
 
  // When a todo is removed
  this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.items)
      });
  });
  }




    _renderRow(rowData){
      let self = this
   let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'white',
        onPress: () => { 
          console.log(rowData)
         firebase.database().ref('Houses/Tasks').child(rowData.id).remove()
  

        }
      }]


      return(
       <Swipeout right={swipeBtns}
          autoClose = {true}
          backgroundColor= {rowData.data.icon}
          >
          <TouchableHighlight>
            <View style={{width:width, ...styles.card}}>
            
                <Text style={styles.cardtxt} >          
               {rowData.data.user}: {rowData.data.title} </Text>

                
            </View>  
             
           
          </TouchableHighlight>
        </Swipeout>
         
        )
    }




     render(){
      const rowHasChanged = (r1, r2) => {
        console.log('yes')
          return(

        <Content>
        <StatusBar/>
        <Header style={styles.header}>
        <Left>
          <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="menu" style={{color: 'white'}}/>
              </Button>
        </Left>
          <Body>
            <Title style={styles.head}>HarmonyUs</Title>
          </Body>
          <Right style={styles.right}>
            <Button style={styles.button} onPress={this._showModal}>
              <Image style={styles.new} source={require('../../../assets/icons8-create_new.png')}/>
            </Button>
          </Right>
        </Header>
        <Body>
       
           <ListView
           enableEmptySections={true} 
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}>
          </ListView> 
        </Body>








        <Modal isVisible={this.state.isModalVisible} 
        //onModalHide={this.createEvent()}
        animationIn='bounceIn'
        animaionOut='BounceOut'
        animationInTiming= {500}
        animationOutTiming={500}
        >
            <View style={styles.modal}>
              <Header style={styles.header}>
              <Left></Left>
              <Body><Title style={styles.head}>News</Title></Body>
              <Right>
                <Button style={styles.button}
                onPress={this._hideModal}>
                  <Image style={styles.new} 
                  
                  source={require('../../../assets/icons8-close_window.png')}/>
                </Button>
              </Right>
              </Header>
              <Body>

              <Text
                  style={{ color: '#006381', marginTop: 20 }}
                  onPress={() => {
                  this.refs.picker2.show();
                    }}
                  >
                Click here to select your option with labels
                  </Text>
                  <SimplePicker
          ref={'picker2'}
          options={options}
          labels={labels}
          itemStyle={{
            fontSize: 25,
            color: 'red',
            textAlign: 'left',
            fontWeight: 'bold',
          }}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option,
            });
          }}
        />
                <Form>
                  <Item underline style={styles.item}>
                    <Input 
                    placeholder="New To Do"
                    onChangeText={newitem => this.setState({ newitem })}/>
                  </Item>
                  <Text
                  style={{ color: '#006381', marginTop: 20 }}
                  onPress={() => {
                  this.refs.picker2.show();
                    }}
                  >
               Select Icon
                  </Text>
                  <SimplePicker
          ref={'picker2'}
          options={options}
          labels={labels}
          itemStyle={{
            fontSize: 25,
            color: 'red',
            textAlign: 'left',
            fontWeight: 'bold',
          }}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option,
            });
          }}
        />
                  <Button
                  style={styles.buttonFrm}
                  onPress={this._hideModal}>
                    <Text>Done</Text>
                  </Button>
                </Form>
              </Body>
            </View>
          </Modal>
        </Content>
        )

      }
      if(this.state.loading == true){
        const height = Dimensions.get('window')
      return(
        <AnimatedLinearGradient  customColors={presetColors.instagram}>
         
         
        </AnimatedLinearGradient>
        )
    }
      let swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'white',
        onPress: () => { Toast.show({
          text: 'Dead',
          type: 'danger',
          duration: 2500
        }) }
      }]
      const width = Dimensions.get('window').width

    

      return(
        <Content>
        <Header style={styles.header}>
        <Left>
          <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="menu" style={{color: 'white'}}/>
              </Button>
        </Left>
          <Body>
            <Title style={styles.head}>HarmonyUs</Title>
          </Body>
          <Right style={styles.right}>
            <Button style={styles.button} onPress={this._showModal}>
              <Image style={styles.new} source={require('../../../assets/icons8-create_new.png')}/>
            </Button>
          </Right>
        </Header>
        <Body>
       
           <ListView
           enableEmptySections={true} 
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}>
          </ListView> 
        </Body>








        <Modal isVisible={this.state.isModalVisible} 
        //onModalHide={this.createEvent()}
        animationIn='bounceIn'
        animaionOut='BounceOut'
        animationInTiming= {500}
        animationOutTiming={500}
        >
            <View style={styles.modal}>
              <Header style={styles.header}>
              <Left></Left>
              <Body><Title style={styles.head}>New</Title></Body>
              <Right>
                <Button style={styles.button}
                onPress={this._hideModal}>
                  <Image style={styles.new} 
                  
                  source={require('../../../assets/icons8-close_window.png')}/>
                </Button>
              </Right>
              </Header>
              <Body>
                <Form>
                  <Item underline style={styles.item}>
                    <Input 
                    placeholder="New To Do"
                    onChangeText={newitem => this.setState({ newitem })}/>
                  </Item>
                  <Text
                  style={{ color: '#006381', marginTop: 20 }}
                  onPress={() => {
                  this.refs.picker2.show();
                    }}
                  >
                Select Category
                  </Text>
                  <SimplePicker
                    ref={'picker2'}
                    options={options}
                    labels={labels}
                    itemStyle={{
                       fontSize: 25,
                      color: 'red',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}
                  onSubmit={(option) => {
                    this.setState({
                      selected1: option,
                       });
                     }}
                   />
                  <Button
                  style={styles.buttonFrm}
                  onPress={this._hideModal}>
                    <Text>Done</Text>
                  </Button>
                </Form>
              </Body>
            </View>
          </Modal>
        </Content>
        )
    
  }  
  }