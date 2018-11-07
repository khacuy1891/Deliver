/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { createStackNavigator } from 'react-navigation';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import LoginScreen from './screens/Login/LoginScreen';
import ForgotPasswordScreen from './screens/Login/ForgotPasswordScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';

const defaultState = {
  value: 0,
  email: 'uybkt2@gmail.com',
  coordinates: [],
};

export const checkInArea = coordinates => ({
  type: 'CHECK_AREA',
  data: {
    coordinates: coordinates,
  }
})

export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  email: email,
})

const reducer = (state = defaultState, action) => {
    if(action.type === 'UP')
      return {
        value: state.value + 1,
        email: state.email,
        coordinates: state.coordinates
      };
    
    if(action.type === 'DOWN')
      return {
        value: state.value - 1,
        email: state.email,
        coordinates: state.coordinates
      };

    if(action.type === 'CHECK_AREA')
      return {
        value: state.value,
        email: state.email,
        coordinates: action.data.coordinates,
      };
    
    if(action.type === 'SET_EMAIL')
      return {
        value: state.value,
        email: action.email,
        coordinates: state.coordinates,
      };

    return state;
};

const store = createStore(reducer);

const myState = store.getState();
console.log(myState);
console.log('TRUOC KHI DISPATCH: ' + myState.value);
store.dispatch({ type: 'UP'});
console.log('SAU KHI DISPATCH: ' + myState.value);

const RootStack = createStackNavigator (
  {
    Login: {
      screen: LoginScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
    Dashboard: {
      screen: DashboardScreen,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    initialRouteName: 'Login',
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    )
    
  }
}