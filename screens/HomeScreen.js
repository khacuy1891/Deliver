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

export default class HomeScreen extends React.Component {
  state = {
    lat: 16.064732,
    lng: 108.223937,
    error: 'error',
    region: {
      latitude: 16.064732,
      longitude: 108.223937,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    coordinates: [
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.075562148094576, longitude: 108.21409616418077 },
      { latitude: 16.070283711260792, longitude: 108.20268068261339 },
      { latitude: 16.064097864824838, longitude: 108.19993410058214 },
      { latitude: 16.055189908112915, longitude: 108.20285234399034 },
      { latitude: 16.04207469097842, longitude: 108.200449084713 },
      { latitude: 16.026112554658386, longitude: 108.19813165612413 },
      { latitude: 16.0240089220252, longitude: 108.21092042870714 },
      { latitude: 16.03844517018427, longitude: 108.22576913781359 },
      { latitude: 16.051313172836196, longitude: 108.22302255578234 },
      { latitude: 16.054365077141366, longitude: 108.22400960869982 },
      { latitude: 16.064819556819913, longitude: 108.22497520394518 },
      { latitude: 16.068128996584033, longitude: 108.22573695130541 },
      { latitude: 16.071520857464222, longitude: 108.22568330712511 },
      { latitude: 16.08158269403198, longitude: 108.2240954393883 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 },
      { latitude: 16.08523204577349, longitude: 108.22263631768419 }
    ],
  }

  componentDidMount() {
    navigator.geolocation.watchPosition((position) =>
      {
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
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  componentWillUnmount() {
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
            coordinates={this.state.coordinates}
            strokeColor="#00CC00"
            strokeWidth={5}
          />
        </MapView>
      </View>
    );
  }
}