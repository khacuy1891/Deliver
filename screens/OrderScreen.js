/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList } from 'react-native';
import { Card } from 'react-native-material-ui';
import Colors from '../constants/Colors';
import FirebaseCts from '../constants/FirebaseCts';
import OrderCts from '../constants/OrderCts';
import Firebase from 'firebase';

const image = require('../assets/images/ic_near.png');

export default class OrderScreen extends React.Component {
  state = {
    userId: '',
    orders: [],
  };

  constructor() {
    super();

    this.state.userId = Firebase.auth().currentUser.uid;
  }

  componentDidMount() {
    this.getListOrderOnFirebase();
  }

  getListOrderOnFirebase() {
    Firebase.database()
      .ref(FirebaseCts.TABLE_ORDERS)
      .orderByChild(FirebaseCts.ORDER_ACCEPTTIME)
      .on('value', (snapshot)=> {
        this.fetchListOrder(snapshot);
      });
  }


  fetchListOrder(snapshot) {
    var listOrder = [];
    var listOrderNew = [];
    snapshot.forEach(snapshotChild => {
      var order = snapshotChild.val();
      try {
        if (order.assignforuserid === 'MvDPjU8p6oZ95svXU6XGOsE46f83') {
          order.orderId = snapshotChild.key;
          var statusOrder = order.orderstatus.toUpperCase();
          console.log("Order: " + order.orderId);
          if(statusOrder === OrderCts.STATUS_ACCEPT || statusOrder === OrderCts.STATUS_ONWAY
            || statusOrder === OrderCts.STATUS_ONFRONT || statusOrder === OrderCts.STATUS_PICKUP
            || statusOrder === OrderCts.STATUS_ARRIVING || statusOrder === OrderCts.STATUS_CAME) {
            listOrder.push(order);
          }
          else if(statusOrder === OrderCts.STATUS_NEW){
            listOrderNew.push(order);
          }
        }
      } catch (error) {
        
      }
    });
    
    listOrder = listOrder.concat(listOrderNew);
    this.setState({ orders: listOrder });
  }

  highlightRow(sectionID, rowID) {
    console.log("sectionID: " + sectionID + ", rowID: " + rowID);
  }

  renderRow(orderItem, rowID) {
    if(rowID == 0) {
      return (
        <Card>
          <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID + " " + orderItem.restaurantname); }}>
            <View style={{margin: 10}}>
              <View style={styles.row}>
                <Text style={{color: Colors.colorAccent}}>{orderItem.orderId}</Text>
                <Text style={{fontSize: 14, color: Colors.colorAccent}}>{orderItem.orderstatus}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderItem.restaurantname}</Text>
                <Image style={{width: 20, height: 20, tintColor: Colors.colorAccent}} source={image}/>
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
          <TouchableHighlight onPress={()=> { console.log("onPress rowID: " + rowID + " " + orderItem.restaurantname); }}>
            <View style={{margin: 10}}>
              <View style={styles.row}>
                <Text>{orderItem.orderId}</Text>
                <Text style={{fontSize: 14}}>{orderItem.orderstatus}</Text>
              </View>
              <View style={styles.row}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderItem.restaurantname}</Text>
                <Image style={{width: 20, height: 20, tintColor: Colors.colorGrey}} source={image}/>
              </View>
              <Text>{orderItem.restaurantaddress}</Text>
            </View>
          </TouchableHighlight>
        </Card>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.orders}
          renderItem={({item, index}) => this.renderRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
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