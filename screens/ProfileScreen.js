/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Button} from 'react-native';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'red', fontSize: 20}}>Profile Screen</Text>
        <Text
          style={{marginTop: 20, fontSize: 20, marginTop: 20}}
          onPress={() => this.props.navigation.navigate('Home')}>
          Go to Home
        </Text>
        {/* <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title='Go back'
          onPress={() => this.props.navigation.goBack()}
        /> */}
      </View>
    );
  }
}