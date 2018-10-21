/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import Firebase from 'firebase';

import FirebaseCts from '../constants/FirebaseCts';

export default class LoginScreen extends React.Component {

  state = {
    email: 'uybkt2@gmail.com',
    password: '123456',
    phone: '091111',
    error: {
      email_require: null,
      password_require: null,
    },
    isLoading: false,
  };
  
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();

    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
    this.onLogin = this.onLogin.bind(this);

    if (!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseCts.config);
    }

    this._checkLogin();
  }

  _checkLogin() {
    var user = Firebase.auth().currentUser;
    if(user != null) {
      this.props.navigation.navigate('Dashboard');
      return;
    }
  }

  checkValid() {
    if(this.state.email.trim() === '') {
      this.setState({error: {email_require: 'Email is required'}})
      this.emailRef.current.focus();
      return false;
    }
    else {
      this.setState({error: {email_require: ''}})
    }

    if(this.state.password.trim() === '') {
      this.setState({error: {password_require: 'Password is required'}})
      this.pwRef.current.focus();
      return false;
    }
    else {
      this.setState({error: {password_require: ''}})
    }

    return true;
  }

  async onLogin() {
    if(!this.checkValid()) {
      return;
    }

    //this.showLoading();
    await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        console.log('Login success');
        this.props.navigation.navigate('Dashboard');
        //this.hideLoading();
      })
      .catch(function(error){
        //this.hideLoading();
        Alert.alert(
          'Login fail',
          '...',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false}
        )
      });
  }

  showLoading() {
    this.setState({isLoading: true})
  }

  hideLoading() {
    this.setState({isLoading: false})
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100, marginTop: 50}}
            source={require('../assets/images/ic_launcher.png')}
          />        
          <Text>Fast, easy, best price</Text>
          <View style={styles.form}>
            <TextField
              label='Email'
              ref={this.emailRef}
              error={this.state.error.email_require}
              returnKeyType='next'
              value={this.state.email}
              onSubmitEditing={() => this.pwRef.current.focus()}
              onChangeText={ (text) => this.setState({ email: text }) }
            />
            <TextField
              label='Password'
              ref={this.pwRef}
              error={this.state.error.password_require}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={ (text) => this.setState({ password: text }) }
            />

            <Button text="Login" raised accent
              style={{container: {marginTop: 30}}}
              onPress={this.onLogin}/>
          </View>

          <Text style={{marginTop: 10, marginBottom: 20}}>Don't remember password?</Text>  
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  form: {
    width: "80%",
  },
});
