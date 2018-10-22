/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Colors from '../constants/Colors';

export default class ItemOrder extends React.Component {
  render() {
    const {rowData} = this.props.row_Data;
    const {rowID} = this.props.row_Id;
    if(this.props.rowID == 0) {
      return (
        <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID); }}>
          <View style={{margin: 10}}>
            <View style={styles.row}>
              <Text style={styles.orderId}>{rowData.orderId}</Text>
              <Text style={styles.order_status}>{rowData.status}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.order_name}>{rowData.restaurantName}</Text>
              <Image style={styles.image_near} source={rowData.image}/>
            </View>
            <Text>{rowData.restaurantAddress}</Text>
          </View>
        </TouchableHighlight>
      );
    }
    else {
      return (
        <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID); }}>
          <View style={{margin: 10}}>
            <View style={styles.row}>
              <Text>{rowData.orderId}</Text>
              <Text style={{fontSize: 14, color: Colors.colorAccent}}>{rowData.status}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.order_name}>{rowData.restaurantName}</Text>
              <Image style={styles.image_near} source={rowData.image}/>
            </View>
            <Text>{rowData.restaurantAddress}</Text>
          </View>
        </TouchableHighlight>
      );
    }    
  }
}

ItemOrder.prototype = {
  row_Data: React.prototype.string,
  row_Id: React.prototype.int,
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  orderId: {
    color: Colors.colorAccent,
  },
  order_status: {
    fontSize: 14,
    color: Colors.colorAccent,
  },
  order_name: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
  image_near: {
    width: 20,
    height: 20,
    tintColor: Colors.colorAccent,
  },
})