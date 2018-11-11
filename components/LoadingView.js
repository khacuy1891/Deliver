/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Modal, View, ActivityIndicator, Text} from 'react-native';
import { Card } from 'react-native-material-ui';
import { connect } from 'react-redux';

class LoadingView extends React.Component {
  state = {
    text: '',
  }

  constructor(props) {
    super(props);
    this.state.text = props.text;
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.isLoading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#00000064'}}>
          <Card style={{container:styles.container_loader}}>
            <View style={styles.activityIndicatorWrapper}/>
            <ActivityIndicator
                animating={this.props.isLoading} />
            <View style={styles.activityIndicatorWrapper}>
              <Text style={{marginTop: 5}}>{this.props.text}</Text>
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
  container_loader: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    borderRadius: 5,
   },
  activityIndicatorWrapper: {
    flex: 1,
    alignItems: 'center',
  }
})

function mapStateToProps(state) {
  return {
    isLoading: state.reducerApp.isLoading,
    text: state.reducerApp.text,
  };
}

export default connect(
  mapStateToProps,
) (LoadingView);