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
import { connect } from "react-redux";

import { setEmail } from "../../App";
import FirebaseCts from '../../constants/FirebaseCts';
import Images from '../../constants/Images';

class LoginScreen extends React.Component {

  state = {
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

  isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) == 0;
  }

  checkValid() {
    if(this.props.myEmail.trim() === '') {
      this.setState({error: {email_require: 'Email is required'}})
      this.emailRef.current.focus();
      return false;
    }
    
    if(this.isEmailValid(this.props.myEmail.trim())) {
      this.setState({error: {email_require: 'Email is incorrect'}})
      this.emailRef.current.focus();
      return false;
    }

    this.setState({error: {email_require: null}})

    if(this.state.password.trim() === '') {
      this.setState({error: {password_require: 'Password is required'}})
      this.pwRef.current.focus();
      return false;
    }

    this.setState({error: {password_require: null}})

    return true;
  }

  async onLogin() {
    if(!this.checkValid()) {
      return;
    }

    //this.showLoading();
    await Firebase.auth().signInWithEmailAndPassword(this.props.myEmail, this.state.password)
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

  onForgotPassword() {
    //this.props.setEmail(this.props.myEmail);
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor: '#F5FCFF'}}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100}}
            source={Images.ic_launcher}
          />        
          <Text>Fast, easy, best price</Text>
          <View style={styles.form}>
            <TextField
              label='Email'
              ref={this.emailRef}
              error={this.state.error.email_require}
              returnKeyType='next'
              value={this.props.myEmail}
              onSubmitEditing={() => this.pwRef.current.focus()}
              onChangeText={ (text) => this.props.setEmail(text) }
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

          <Text style={{marginTop: 20, marginBottom: 20}}
            onPress={()=> this.onForgotPassword()}>Don't remember password?
          </Text>  
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: "80%",
  },
});

function mapStateToProps(state) {
  return {
    myEmail: state.email,
  };
}

const mapDispatchToProps = dispatch => ({
  setEmail: (email) => dispatch(setEmail(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (LoginScreen);