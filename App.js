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

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <RootStack/>;
  }
}