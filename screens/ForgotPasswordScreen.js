/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'react-native-material-ui';
import Firebase from 'firebase';

import FirebaseCts from '../constants/FirebaseCts';
import COLOR from '../constants/Colors';

export default class ForgotPasswordScreen extends React.Component {

  state = {
    email: 'uybkt2@gmail.com',
    error: {
      email_require: null,
    },
    isLoading: false,
  };
  
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();

    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    if (!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseCts.config);
    }
  }

  isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) == 0;
  }

  checkValid() {
    if(this.state.email.trim() === '') {
      this.setState({error: {email_require: 'Email is required'}})
      this.emailRef.current.focus();
      return false;
    }
    
    if(this.isEmailValid(this.state.email.trim())) {
      this.setState({error: {email_require: 'Email is incorrect'}})
      this.emailRef.current.focus();
      return false;
    }

    this.setState({error: {email_require: null}})

    return true;
  }

  async sendEmail() {
    if(!this.checkValid()) {
      return;
    }

    //this.showLoading();
    await Firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(()=>{
        Alert.alert(
          'Send email success',
          '...',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false}
        )
      })
      .catch(function(error){
        //this.hideLoading();
        console.log('Send email fail');
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
          <Text style={{fontSize: 25, color: COLOR.colorAccent}}>Forgot password</Text>
          <Text style={{marginTop: 50, fontSize: 15}}>Password reset link will be sent to your email</Text>
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

            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button text="Send" raised accent
                style={{container: {width: 100, height: 45}}}
                onPress={this.sendEmail}/>
            </View>
          </View>
          <View style={{marginTop: 40, marginBottom: 20, flexDirection: 'row'}}>
            <Text>Already have an account?</Text>
            <Text style={{color: 'red', marginStart: 10}}
              onPress={()=>this.props.navigation.navigate('Login')}>Sign in</Text>
          </View>
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
    marginTop: 10,
  },
});