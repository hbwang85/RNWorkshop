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

var DetailPage = require('./DetailPage').default;

class SearchResults extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    fetch('https://api.github.com/search/users?q=h&order=asc')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items)
        })
      })
      .catch((error) => {
        console.error(error);    //catch must be the last one
      })
    .done();
      
  }
  
  _selectCell(user: Object) {
    this.props.navigator.push({
      title: 'Detail',
      component: DetailPage,
      passProps: {user:user},
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this._selectCell(rowData)}
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
               height: 80,
               margin: 10,
             }}
             resizeMode={"contain"}
             source={{uri:rowData.avatar_url}}
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
               {rowData.login}
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
    var content = this.state.dataSource.getRowCount() === 0 ? <ActivityIndicatorIOS
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animating={true}
      size={'large'}
      color={'black'}
    /> :
    <ListView
        enableEmptySections={true} //MUST
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>    
    
    return (
     <View style={{flex: 1}}>
       {content}
     </View>
    )
  }
}

export default SearchResults
