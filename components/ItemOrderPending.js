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

const ic_near = require('../assets/images/ic_near.png');

export default class ItemOrderPending extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.rowID);
  };

  render() {
    const orderItem = this.props.rowData;
    const rowID = this.props.rowID;
    console.log("ItemOrderPending: " + rowID);
    if(rowID == 0) {
      return (
        <Card>
          <TouchableHighlight onPress={this._onPress}>
            <View style={{margin: 10}}>
              <View style={styles.row}>
                <Text style={{color: Colors.colorAccent}}>{orderItem.orderId}</Text>
                <Text style={{fontSize: 14, color: Colors.colorAccent}}>{orderItem.orderstatus}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderItem.restaurantname}</Text>
                <Image style={{width: 20, height: 20, tintColor: Colors.colorAccent}} source={ic_near}/>
              </View>
              <Text>{orderItem.restaurantaddress}</Text>
            </View>
          </TouchableHighlight>
        </Card>
      );
    }
    else {
      return (
        <Card>
          <TouchableHighlight onPress={this._onPress}>
            <View style={{margin: 10}}>
              <View style={styles.row}>
                <Text>{orderItem.orderId}</Text>
                <Text style={{fontSize: 14}}>{orderItem.orderstatus}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderItem.restaurantname}</Text>
                <Image style={{width: 20, height: 20, tintColor: Colors.colorGrey}} source={ic_near}/>
              </View>
              <Text>{orderItem.restaurantaddress}</Text>
            </View>
          </TouchableHighlight>
        </Card>
      );
    }
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