/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-material-ui';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Firebase from 'firebase';
import Moment from 'moment';
import ItemOrderFinish from '../../components/ItemOrderFinish';
import FirebaseCts from '../../constants/FirebaseCts';
import Colors from '../../constants/Colors';

const FORMAT_DATE_TIME_DISPLAY = "MMM DD YYYY";
const FORMAT_DATE_TIME = "MM/DD/YYYY";

export default class HistoryScreen extends React.Component {
  state = {
    userId: '',
    orders: [],
    feeAllTrips: 0,
    isDateTimePickerFromVisible: false,
    isDateTimePickerToVisible: false,
    dateFrom: new Date(),
    dateTo: new Date(),
  };

  constructor(props) {
    super(props);

    this.state.dateFrom.setDate(this.state.dateFrom.getDate() - 30);
    this.state.userId = Firebase.auth().currentUser.uid;
  }

  componentDidMount() {
    this.getFinishOrders();
  }

  getFinishOrders() {
    var params = [];
    params.push("token=" + FirebaseCts.KEY_TOKEN);
    params.push("deliverId=hQg8ovFUIsdOkxtAAiuJHaiTMpk2");
    params.push("fromDate=" + Moment(this.state.dateFrom).format(FORMAT_DATE_TIME));
    params.push("toDate=" + Moment(this.state.dateTo).format(FORMAT_DATE_TIME));
    var URL = "https://de.ringameal.com/api/getfinishorders?" + params.join('&');

    console.log("getFinishOrders: " + URL);    
    try {
      fetch(URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result != null) {
          var feeAllTrips = 0.0;
          var listOrder = responseJson.result;
          listOrder.forEach(order => {
            order.FeeTotal = (order.FeeForDeliver + order.TipsForDeliver);
            feeAllTrips += order.FeeTotal;
          });
          console.log("feeAllTrips: " + feeAllTrips);
          this.setState({
            orders: listOrder,
            feeAllTrips: feeAllTrips,
          });
        }
      })
    }
    catch(error) {
      console.error(error);
      Snackbar.show({
        title: "response: " + error,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  _onPressItem = (index) => {
    console.log("onPress: " + index);
  };

  _renderItem = ({item, index}) => (
    <ItemOrderFinish
      rowID={index}
      rowData={item}
      onPressItem={this._onPressItem}
      //selected={!!this.state.selected.get(item.id)}
    />
  );

  _showDateTimePickerFrom = () => this.setState({ isDateTimePickerFromVisible: true });

  _hideDateTimePickerFrom = () => this.setState({ isDateTimePickerFromVisible: false });

  _handleDatePickedFrom = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({dateFrom: date});
    this._hideDateTimePickerFrom();

    this.getFinishOrders();
  };

  _showDateTimePickerTo = () => this.setState({ isDateTimePickerToVisible: true });

  _hideDateTimePickerTo = () => this.setState({ isDateTimePickerToVisible: false });

  _handleDatePickedTo = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({dateTo: date});
    this._hideDateTimePickerTo();

    this.getFinishOrders();
  };

  render() {
    const order = {
      DeliveryTime: "ASAP",
      customeraddress: "218 Bạch Đằng, Phước Ninh, Hải Châu, Đà Nẵng 550000, Việt Nam",
      RestaurantName: "Diamond Sea restaurant",
      FeeTotal: 12,
      RestaurantAddress: "15 Lê Duẩn, Hải Châu 1, Q. Hải Châu, Đà Nẵng 550000, Việt Nam",
      OrderCode: "DAXPAS",
    }
    return (
      <View style={styles.container}>
        <View style={{ justifyContent:'center', alignItems:'center' }}>
          <View style={[styles.row, { marginTop:10 }]}>
            <Button text={Moment(this.state.dateFrom).format(FORMAT_DATE_TIME_DISPLAY)} raised accent
              upperCase={false}
              style={{container: {marginTop: 0}}}
              onPress={this._showDateTimePickerFrom}/>
            <Text style={{ marginStart: 10, marginEnd: 10}}>-</Text>
            <Button text={Moment(this.state.dateTo).format(FORMAT_DATE_TIME_DISPLAY)} raised accent
              upperCase={false}
              style={{container: {marginTop: 0}}}
              onPress={this._showDateTimePickerTo}/>
          </View>
          <View style={{ flexDirection:'row' }}>
            <Text style={{ fontSize: 30, color: Colors.colorAccent }}>$</Text>
            <Text style={{ fontSize: 30, color: Colors.colorAccent, fontWeight:'bold' }}>{this.state.feeAllTrips.toFixed(2)}</Text>          
          </View>        
          <Text style={{ fontSize: 20 }}>Earnings</Text>
        </View>

        <ItemOrderFinish
          rowID={0}
          rowData={order}
          onPressItem={this._onPressItem}
          //selected={!!this.state.selected.get(item.id)}
        />

        <FlatList
          data={this.state.orders}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerFromVisible}
          onConfirm={this._handleDatePickedFrom}
          onCancel={this._hideDateTimePickerFrom}
          date={this.state.dateFrom}
          maximumDate={this.state.dateTo}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerToVisible}
          onConfirm={this._handleDatePickedTo}
          onCancel={this._hideDateTimePickerTo}
          date={this.state.dateTo}
          minimumDate={this.state.dateFrom}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});