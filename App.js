/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

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

const defaultState = {
  value: 0,
  coordinates: [],
};

export const checkInArea = coordinates => ({
  type: 'CHECK_AREA',
  data: {
    coordinates: coordinates,
  }
})

const reducer = (state = defaultState, action) => {
    if(action.type === 'UP') return { value: state.value + 1, coordinates: state.coordinates };
    if(action.type === 'DOWN') return { value: state.value - 1, coordinates: state.coordinates };
    if(action.type === 'CHECK_AREA') return { value: state.value - 1, coordinates: action.data.coordinates };

    return state;
};

const store = createStore(reducer);

const myState = store.getState();
console.log(myState);

console.log('TRUOC KHI DISPATCH: ' + store.getState().value);
store.dispatch({ type: 'UP'});
console.log('SAU KHI DISPATCH: ' + store.getState().value);

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