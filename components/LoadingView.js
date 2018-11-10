/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Modal, View, ActivityIndicator} from 'react-native';
import { Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

class LoadingView extends React.Component {
  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.isLoading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000064'}}>
          <Card style={{container:{borderRadius: 5}}}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={this.props.isLoading} />
          </View>
          </Card>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  activityIndicatorWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  }
})

function mapStateToProps(state) {
  return {
    isLoading: state.reducerApp.isLoading,
  };
}

export default connect(
  mapStateToProps,
) (LoadingView);