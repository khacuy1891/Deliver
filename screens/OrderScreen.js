/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import { Card } from 'react-native-material-ui';
import Colors from '../constants/Colors';

export default class OrderScreen extends React.Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var orders = [];
    for (var i = 0; i < 20; i++) {
      orders.push({
        orderId: "#7CD749",
        status: "ONWAY",
        restaurantName: "Diamond Sea restaurant",
        restaurantAddress: "15 Quang Trung, Hải Châu 1, Q. Hải Châu, Đà Nẵng",
        image: require('../assets/images/ic_near.png'),
      });
    }

    this.state = {
      dataSource: ds.cloneWithRows(orders),
    };

    this.highlightRow = this.highlightRow.bind(this);
  }

  highlightRow(sectionID, rowID) {
    console.log("sectionID: " + sectionID + ", rowID: " + rowID);
  }

  renderRow(rowData, sectionID, rowID) {
    if(rowID == 0) {
      return (
        <Card>
          <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID); }}>
            <View style={{margin: 10}}>
              <View style={styles.row}>
                <Text style={{color: Colors.colorAccent}}>{rowData.orderId}</Text>
                <Text style={{fontSize: 14, color: Colors.colorAccent}}>{rowData.status}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{fontSize: 16, color: Colors.black, fontWeight: 'bold'}}>{rowData.restaurantName}</Text>
                <Image style={{width: 20, height: 20, tintColor: Colors.colorAccent}} source={rowData.image}/>
              </View>
              <Text>{rowData.restaurantAddress}</Text>
            </View>
          </TouchableHighlight>
        </Card>
      );
    }
    else {
      return (
        <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID); }}>
          <View style={{margin: 10}}>
            <View style={styles.row}>
              <Text>{rowData.orderId}</Text>
              <Text style={{fontSize: 14}}>{rowData.status}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{fontSize: 16, color: Colors.black, fontWeight: 'bold'}}>{rowData.restaurantName}</Text>
              <Image style={{width: 20, height: 20, tintColor: Colors.colorGrey}} source={rowData.image}/>
            </View>
            <Text>{rowData.restaurantAddress}</Text>
          </View>
        </TouchableHighlight>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})