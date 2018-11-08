/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, View} from 'react-native';
import MapView from 'react-native-maps';

import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  state = {
    watchId: 0,
    lat: 16.064732,
    lng: 108.223937,
    error: 'error',
    region: {
      latitude: 16.064732,
      longitude: 108.223937,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  }

  componentDidMount() {
    var _watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
        });
        console.log('watchPosition');
      },
    
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 },
    );

    this.setState({watchId: _watchId});
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchId);
    navigator.geolocation.stopObserving();
  }
   
  render() {
    return (
      <View style={{ flex: 1}}>
        <MapView
          style={{flex: 1}}
          showsUserLocation={true}
          zoomControlEnabled={true}
          region={this.state.region}
          // onRegionChange={(region)=>this.setState({ region: region })}
          >
          {!!this.state.lat && !!this.state.lng &&
            <MapView.Marker
              coordinate={{"latitude": this.state.lat, "longitude": this.state.lng}}
              title="Your Location"
            />
          }
          <MapView.Polyline
            //coordinates={this.props.data.coordinates}
            coordinates={this.props.myCoordinates}
            strokeColor="#00CC00"
            strokeWidth={5}
          />
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myValue: state.value,
    myCoordinates: state.reducerDashboard.coordinates,
  };
}

export default connect(mapStateToProps) (HomeScreen);