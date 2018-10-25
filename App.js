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
  coordinates: [
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.075562148094576, longitude: 108.21409616418077 },
  { latitude: 16.070283711260792, longitude: 108.20268068261339 },
  { latitude: 16.064097864824838, longitude: 108.19993410058214 },
  { latitude: 16.055189908112915, longitude: 108.20285234399034 },
  { latitude: 16.04207469097842, longitude: 108.200449084713 },
  { latitude: 16.026112554658386, longitude: 108.19813165612413 },
  { latitude: 16.0240089220252, longitude: 108.21092042870714 },
  { latitude: 16.03844517018427, longitude: 108.22576913781359 },
  { latitude: 16.051313172836196, longitude: 108.22302255578234 },
  { latitude: 16.054365077141366, longitude: 108.22400960869982 },
  { latitude: 16.064819556819913, longitude: 108.22497520394518 },
  { latitude: 16.068128996584033, longitude: 108.22573695130541 },
  { latitude: 16.071520857464222, longitude: 108.22568330712511 },
  { latitude: 16.08158269403198, longitude: 108.2240954393883 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
  { latitude: 16.08523204577349, longitude: 108.22263631768419 },
] };

const reducer = (state = defaultState, action) => {
    if(action.type === 'UP') return { value: state.value + 1, coordinates: state.coordinates };
    if(action.type === 'DOWN') return { value: state.value - 1, coordinates: state.coordinates };
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