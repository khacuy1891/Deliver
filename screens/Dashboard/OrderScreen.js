/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Firebase from 'firebase';
import FirebaseCts from '../../constants/FirebaseCts';
import OrderCts from '../../constants/OrderCts';
import ItemOrderPending from '../../components/ItemOrderPending';

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
    console.log("userId: " + this.state.userId);
    snapshot.forEach(snapshotChild => {
      var order = snapshotChild.val();
      try {
        console.log("userId: " + this.state.userId);
        if (order.assignforuserid === this.state.userId) {
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

  _onPressItem = (index) => {
    console.log("onPress: " + index);
  };

  _renderItem = ({item, index}) => (
    <ItemOrderPending
      rowID={index}
      rowData={item}
      onPressItem={this._onPressItem}
      //selected={!!this.state.selected.get(item.id)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.orders}
          renderItem={this._renderItem}
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