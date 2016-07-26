'use strict';
import React, { Component, } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicatorIOS,
} from 'react-native'

class SearchResults extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {};
  }
  
  render() {
    return (
        <ActivityIndicatorIOS
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animating={true}
        size={"large"}
        color={'black'}
      />
    );
  }
}

export default SearchResults