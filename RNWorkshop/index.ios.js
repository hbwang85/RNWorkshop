/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

class Helloworld extends Component {
  render() {
    return(<Text style={styles.text}>Hello World</Text>)
  }
}

class Project extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'List',
          component: Helloworld,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    backgroundColor: 'red',
    fontSize: 40,
    margin: 80,
  }
});

AppRegistry.registerComponent('Project', () => Project);
