/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import Colors from '../constants/Colors';

export default class BottomNavigationView extends React.Component {
  render() {
    return (
      <BottomNavigation active={this.props.active}
        style={{ container: styles.container }}>
        <BottomNavigation.Action
          key="Home"
          icon="home"
          label="Home"
          onPress={() => this.props.onPress('Home')}
        />
        <BottomNavigation.Action
          key="Order"
          icon="people"
          label="Order"
          onPress={() => this.props.onPress('Order')}
        />
        <BottomNavigation.Action
          key="History"
          icon="bookmark-border"
          label="History"
          onPress={() => this.props.onPress('History')}
        />
        <BottomNavigation.Action
          key="Profile"
          icon="settings"
          label="Profile"
          onPress={() => this.props.onPress('Profile')}
        />
      </BottomNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorAccent,
    borderColor: 'white',
  },
})