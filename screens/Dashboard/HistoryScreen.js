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
    var URL = "https://de.ringameal.com/api/getfinishorders?"
            + "token=" + FirebaseCts.KEY_TOKEN
            + "&deliverId=hQg8ovFUIsdOkxtAAiuJHaiTMpk2" //+ this.state.userId
            + "&fromDate=" + Moment(this.state.dateFrom).format("MM/DD/YYYY")
            + "&toDate=" + Moment(this.state.dateTo).format("MM/DD/YYYY");

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
    return (
      <View style={styles.container}>
        <View style={{ flexDirection:'row', alignItems:'center', padding:10 }}>
          <Button text={Moment(this.state.dateFrom).format("MMM DD YYYY")} raised accent
            upperCase={false}
            style={{container: {marginTop: 0}}}
            onPress={this._showDateTimePickerFrom}/>
          <Text style={{ marginStart: 10, marginEnd: 10}}>-</Text>
          <Button text={Moment(this.state.dateTo).format("MMM DD YYYY")} raised accent
            upperCase={false}
            style={{container: {marginTop: 0}}}
            onPress={this._showDateTimePickerTo}/>
        </View>
        <View style={{ flexDirection:'row', justifyContent:'center' }}>
          <Text style={{ fontSize: 30, color: Colors.colorAccent }}>$</Text>
          <Text style={{ fontSize: 30, color: Colors.colorAccent, fontWeight:'bold' }}>{this.state.feeAllTrips.toFixed(2)}</Text>          
        </View>
        <Text style={{ fontSize: 20 }}>Earnings</Text>

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
   alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
});