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

import FirebaseCts from '../../constants/FirebaseCts';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';

import { connect } from "react-redux";
import { setEmail } from "../../App";

class ForgotPasswordScreen extends React.Component {

  state = {
    error: {
      email_require: null,
    },
    isLoading: false,
  };
  
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pwRef = React.createRef();

    if (!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseCts.config);
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

    return true;
  }

  sendEmail() {
  }

  showLoading() {
    this.setState({isLoading: true})
  }

  hideLoading() {
    this.setState({isLoading: false})
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor: '#F5FCFF'}}>
        <View style={styles.container}>
          <Image
            style={{width: 100, height: 100}}
            source={Images.ic_launcher}
          />        
          <Text style={{fontSize: 25, color: Colors.colorAccent}}>Forgot password</Text>
          <Text style={{marginTop: 50, fontSize: 15, flexWrap: 'wrap'}}>Password reset link will be sent to your email</Text>
          <View style={styles.form}>
            <TextField
              label='Email'
              ref={this.emailRef}
              error={this.state.error.email_require}
              returnKeyType='done'
              value={this.props.myEmail}
              onSubmitEditing={() => this.sendEmail()}
              onChangeText={ (text) => this.props.setEmail(text) }
            />

            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Button text="Send" raised accent
                style={{container: {width: 100, height: 45}}}
                onPress={this.sendEmail.bind(this)}/>
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: "80%",
    marginTop: 10,
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
) (ForgotPasswordScreen);