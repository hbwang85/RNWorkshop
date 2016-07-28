'use strict';
import React, { Component, PropTypes,} from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'

export default class DetailPage extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    user: {
      id: 'defaultID',
      score: 5,
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center',}}>
        <Image 
          style={{
            width: 300,
            height: 200,
            marginTop: 80,
          }}
          resizeMode={"contain"}
          source={{uri:this.props.user.avatar_url}}
        />
        <Text
          style={{
            marginTop: 20,
            color: 'black',
            fontSize: 20,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          ID: {this.props.user.id}
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: 'black',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Score: {this.props.user.score}
        </Text>
      </View>
    )
  }
}
