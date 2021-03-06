/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text, Image} from 'react-native';
import { Card } from 'react-native-material-ui';

import Colors from '../constants/Colors';

export default class ItemOrderFinish extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.rowID);
  };

  render() {
    const orderItem = this.props.rowData;
    const rowID = this.props.rowID;
    console.log("ItemOrderFinish: " + rowID);
    return (
      <Card>
        <TouchableHighlight
          underlayColor='#e0e0e0'
          onPress={this._onPress}>
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding:10}}>
            <View style={{flex:1, justifyContent:'center'}}>
              <Text style={{fontSize: 14, color: Colors.colorAccent}}>{orderItem.DeliveryTime}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderItem.RestaurantName}</Text>
              <Text style={{marginTop: 5}}>{orderItem.RestaurantAddress}</Text>
              <Text style={{marginTop: 5}}>{"#" + orderItem.OrderCode}</Text>
            </View>
            <View style={{justifyContent:'center', marginStart:10}}>   
              <Text style={{fontSize: 16}}>{"$ " + orderItem.FeeTotal.toFixed(2)}</Text>
            </View>
          </View>
          
        </TouchableHighlight>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})