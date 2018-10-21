/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, Text, View, Button, Switch, Alert} from 'react-native';

import { createStackNavigator, createBottomTabNavigator, TabRouter } from 'react-navigation';
import { Toolbar, BottomNavigation } from 'react-native-material-ui';

// import BottomNavigation, {
//   FullTab
// } from 'react-native-material-bottom-navigation'

//import Icon from '@expo/vector-icons/MaterialCommunityIcons'

//import AppNavigator from '../navigation/AppNavigator'

import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';
import Snackbar from 'react-native-snackbar';

import Firebase from 'firebase';
import COLOR from '../constants/Colors';
import FirebaseCts from '../constants/FirebaseCts';

const DashboardStack = TabRouter (
  {
		Home: HomeScreen,
		Order: OrderScreen,
		History: HistoryScreen,
		Profile: ProfileScreen,
  },
  {
    //initialRouteName: 'HomeScreen',
    navigationOptions: {
      header: null,
    },
  }
);

class TabContentNavigator extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: props.value.activeTab,
    };
  }

  //this method will not get called first time
  componentWillReceiveProps(newProps){
    this.setState({
      active: newProps.value.activeTab,
    }); 
  }

  render() {
    const Component = DashboardStack.getComponentForRouteName(this.state.active);
    return <Component/>;
  }
}

export default class DashboardScreen extends React.Component {
  state = {
    activeTab: 'Home',
    isOnline: false,
    userId: '_userId',
    isInArea: false,
    isLoading: false,
    DeliverRef: null,
    WorkStatusRef: null,
    location: {
      lat: 0,
      lng: 0,
    },
  };

  constructor(props) {
    super(props);

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.saveWorkStatus = this.saveWorkStatus.bind(this);

    this.state.userId = Firebase.auth().currentUser.uid;
    DeliverRef = Firebase.database().ref("delivers").child(this.state.userId);
    WorkStatusRef = DeliverRef.child('workstatus');
  }

  componentDidMount() {
    this.onGetConnectStatus();
    this.onGetWorkStatus();
  }

  async onGetConnectStatus(){
    Firebase.database().ref(".info/connected").on('value', (snapshot)=> {
      var connected = snapshot.val();
      if (connected) {
        var connectStatusRef = DeliverRef.child("connectstatus");
        connectStatusRef.set(true);
        // when I disconnect, update the last time I was seen online
        connectStatusRef.onDisconnect().set(false);
      }
    });
  }

  async onGetWorkStatus(){
    WorkStatusRef.on('value', (snapshot)=> {
      var workstatus = snapshot.val();
      console.log("WorkStatus: " + workstatus);      
      if(workstatus) {
        this.getCurrentLocation();
      }
      else {
        this.setState({isOnline: false});
      }
    });
  }

  getCurrentLocation() {
    this.watchID = navigator.geolocation.getCurrentPosition((position) => {
      console.log("getCurrentLocation: " + position.coords.latitude + ", " + position.coords.longitude);
      this.checkDeliverInArea(position.coords);
    });
  }

  checkDeliverInArea(location) {
    console.log("checkDeliverInArea: " + this.state.userId);
    try {
      fetch('https://d.ringameal.com/api/checklocationinareafordeliver1', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: FirebaseCts.KEY_TOKEN,
          deliverId: this.state.userId,
          lat: location.latitude,
          lng: location.longitude,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var isInArea = responseJson.result;
        this.setState({
          isLoading: false,
          isOnline: isInArea,
        });

        var title = isInArea? "You're online" : "Your location is out of service areas";
        Snackbar.show({
          title: title,
          duration: Snackbar.LENGTH_LONG,
        });

        this.saveWorkStatus(isInArea);
      })
    }
    catch(error) {
      console.error(error);
      Snackbar.show({
        title: "response: " + error,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  saveWorkStatus(value){
    console.log("saveWorkStatus: " + value);
    DeliverRef.child('workstatus').set(value);
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <StatusBar backgroundColor={COLOR.colorPrimary} hidden={false}/>
				<Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => this.props.navigation.navigate('ForgotPassword')}
          style={{backgroundColor: COLOR.colorAccent}}
          centerElement={this.state.activeTab.toUpperCase()}
          rightElement={
            <View style={{ flexDirection: 'row', alignItems:'center'}}>
              <Text style={{color:'white'}}>{this.state.isOnline ? "Online" : "Offline"}</Text>
              <Switch               
                  trackColor={COLOR.colorPrimary}
                  thumbColor={COLOR.colorPrimary} 
                  value={this.state.isOnline}
                  onValueChange={(value) => {
                    this.setState({isOnline: value});
                    this.saveWorkStatus(value);
                  }}
              />
            </View>
          }
          style={{
            container: { backgroundColor: COLOR.colorAccent },
          }}
				/>

        <TabContentNavigator value={this.state} key={this.state} />

        <BottomNavigation active={this.state.activeTab} hidden={false}
          style={{
            container: { backgroundColor: COLOR.colorAccent, borderColor: 'white' },
          }} >
					<BottomNavigation.Action
						key="Home"
						icon="home"
						label="Home"
						onPress={() => this.setState({ activeTab: 'Home' })}
					/>
					<BottomNavigation.Action
						key="Order"
						icon="people"
						label="Order"
						onPress={() => this.setState({ activeTab: 'Order' })}
					/>
					<BottomNavigation.Action
						key="History"
						icon="bookmark-border"
						label="History"
						onPress={() => this.setState({ activeTab: 'History' })}
					/>
					<BottomNavigation.Action
						key="Profile"
						icon="settings"
						label="Profile"
						onPress={() => this.setState({ activeTab: 'Profile' })}
					/>
				</BottomNavigation>
      </View>
    );
  }
}
