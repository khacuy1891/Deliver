/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, Text, View, Switch} from 'react-native';

import { TabRouter } from 'react-navigation';
import { Toolbar } from 'react-native-material-ui';
import { connect } from "react-redux";
import Snackbar from 'react-native-snackbar';
import Firebase from 'firebase';
import axios from 'axios';

import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';

import BottomNavigationView from '../../components/BottomNavigationView';
import Colors from '../../constants/Colors';
import FirebaseCts from '../../constants/FirebaseCts';
import { checkInArea } from "./action/action";
import LoadingView from '../../components/LoadingView';
import { showLoading, hideLoading } from '../../action';

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
  render() {
    const Component = DashboardStack.getComponentForRouteName(this.props.tabName);
    return <Component/>;
  }
}

class DashboardScreen extends React.Component {
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

    this.state.userId = Firebase.auth().currentUser.uid;
    console.log("userId " + this.state.userId);
    DeliverRef = Firebase.database().ref("delivers").child(this.state.userId);
    WorkStatusRef = DeliverRef.child('workstatus');
  }

  componentDidMount() {
    this.onGetConnectStatus();
    this.onGetWorkStatus();
  }

  async onGetConnectStatus(){
    await Firebase.database().ref(".info/connected").on('value', (snapshot)=> {
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
    await WorkStatusRef.on('value', (snapshot)=> {
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

  async checkDeliverInArea(location) {
    console.log("checkDeliverInArea: " + this.state.userId);
    let body = {
      token: FirebaseCts.KEY_TOKEN,
      deliverId: this.state.userId,
      lat: location.latitude,
      lng: location.longitude,
    };

    this.props.showLoading();
    try {
      let response = await axios.post('/api/checklocationinareafordeliver', body);
      let responseJson = response.data;
      if(responseJson.result != null) {
        var isInArea = responseJson.result.result;
        this.setState({
          isLoading: false,
          isOnline: isInArea,
        });

        Snackbar.show({
          title: isInArea? "You're online" : "Your location is out of service areas",
          duration: Snackbar.LENGTH_LONG,
        });
        this.saveWorkStatus(isInArea);

        // set Coordinates to Redux
        if(responseJson.result.AreaShape != null) {
          this.props.changeCoordinates(responseJson.result.AreaShape);
        }
      }

      this.props.hideLoading();
    }
    catch(error) {
      console.error(error);
      this.props.hideLoading();
    }
  }

  saveWorkStatus(value){
    console.log("saveWorkStatus: " + value);
    DeliverRef.child('workstatus').set(value);
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <StatusBar backgroundColor={Colors.colorPrimary} hidden={false}/>
				<Toolbar
          //leftElement="arrow-back"
          //onLeftElementPress={() => this.props.navigation.navigate('ForgotPassword')}
          style={{backgroundColor: Colors.colorAccent}}
          centerElement={this.state.activeTab.toUpperCase()}
          rightElement={
            <View style={{ flexDirection: 'row', alignItems:'center'}}>
              <Text style={{color:'white'}}>{this.state.isOnline ? "Online" : "Offline"}</Text>
              <Switch               
                  trackColor={Colors.colorPrimary}
                  thumbColor={Colors.colorPrimary} 
                  value={this.state.isOnline}
                  onValueChange={(value) => {
                    this.setState({isOnline: value});
                    this.saveWorkStatus(value);
                  }}
              />
            </View>
          }
          style={{
            container: { backgroundColor: Colors.colorAccent },
          }}
				/>

        <TabContentNavigator tabName={this.state.activeTab} />
        <BottomNavigationView
          active={this.state.activeTab}
          onPress={(keyTab) => this.setState({ activeTab: keyTab })}>
        </BottomNavigationView>
        <LoadingView text='Check Deliver in area...'/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoading()),
  hideLoading: () => dispatch(hideLoading()),
  changeCoordinates: (coordinates) => dispatch(checkInArea(coordinates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (DashboardScreen);
