/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Button} from 'react-native';

export default class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{color: 'red', fontSize: 20}}>History Screen</Text>
        <Text style={{marginTop: 20, fontSize: 20, marginTop: 20}}
          onPress={() => this.props.navigation.navigate('Profile')}>
          Go to Profile
        </Text>
        {/* <Button
          title="Go to Order"
          onPress={() => this.props.navigation.navigate('Order')}
        /> */}
      </View>
    );
  }
}