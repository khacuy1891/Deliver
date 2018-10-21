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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var config = {
  apiKey: "AIzaSyBn3QNw0j5aVViWDmqzWDahtNhVFiIAJJg",
  authDomain: "delivery-5105.firebaseapp.com",
  databaseURL: "https://delivery-5105.firebaseio.com",
  projectId: "delivery-5105",
  storageBucket: "delivery-5105.appspot.com",
  messagingSenderId: "1084972945461"
};

export default class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();

    //this.showLoading = this.showLoading.bind(this);
    //this.hideLoading = this.hideLoading.bind(this);

    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }

    //this._checkLogin();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>ForgotPasswordScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
