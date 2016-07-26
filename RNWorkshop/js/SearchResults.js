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
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: true,
      dataSource: dataSource.cloneWithRows(['row 1', 'row 2']),
    };
  }

  componentWillMount() {
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => {}}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
          <View
            style={{
            flex: 1,
          }}>
           <View
              style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: "white",
           }}>
           <Image
             style={{
               width: 80,  
               height:  80,
               margin: 10,
             }}
             resizeMode={"contain"}
             source={{uri:'https://unsplash.it/600/400/?random'}}
             />
           <View
             style={{
               flex: 1,
               justifyContent: 'center', 
             }}>
             <Text
               style={{
                 flex: 1,
                 color: 'black',  
                 fontSize: 16,  
                 fontWeight: 'normal',  
                 fontFamily: 'Helvetica Neue', 
                 marginTop: 40,
               }}>
               My Text
             </Text>
           </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start', 
            height: 1,
            backgroundColor: "rgba(74,144,226,1)", 
          }}>
        </View>

        </View>
      </TouchableHighlight>

    )
  }

  render() {
    return (
     <View style={{flex: 1}}>
       <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
     </View>
    )
  }
}

export default SearchResults
