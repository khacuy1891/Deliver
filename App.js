/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { createStackNavigator } from 'react-navigation';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import LoginScreen from './screens/Login/LoginScreen';
import ForgotPasswordScreen from './screens/Login/ForgotPasswordScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';

import {reducerLogin} from './screens/Login/action/action';
import {reducerDashboard} from './screens/Dashboard/action/action';
import {reducerApp} from './action';

//axios.defaults.baseURL = 'https://httpbin.org';
axios.defaults.baseURL = 'https://d.ringameal.com/';
axios.defaults.timeout = 10000;
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const reducer = combineReducers({reducerApp, reducerDashboard, reducerLogin});
const store = createStore(reducer);

// const myState = store.getState();
// console.log(myState);
// console.log('TRUOC KHI DISPATCH: ' + myState.value);
// store.dispatch({ type: 'UP'});
// console.log('SAU KHI DISPATCH: ' + myState.value);

const RootStack = createStackNavigator (
  {
    Login: {
      screen: LoginScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    Dashboard: {
      screen: DashboardScreen,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'Login',
  }
);



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    )
    
  }
}