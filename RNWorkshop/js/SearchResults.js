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
      pageNum:0,
      dataSource: ds.cloneWithRows([]),
      items:[],
      isLoading:false,
    };
  }

  componentWillMount() {
    this._fetchData()
  }
  
  _fetchData = () => {
    this.setState({
      isLoading: true,
    })
      
    fetch(this._queryUrlForPage(this.state.pageNum))
      .then((response) => response.json())
      .then((responseData) => {
      var tempData = this.state.items.concat(responseData.items);

        this.setState({
          pageNum: this.state.pageNum + 1,
          items: tempData,
          dataSource: this.state.dataSource.cloneWithRows(tempData),
          isLoading: false,
        })
      })
      .catch((error) => {
        console.error(error);    //catch must be the last one
        this.setState({
          isLoading: false,
        });
      })
    .done();   
  }
  
  _queryUrlForPage(page: number): string {
    return ('https://api.github.com/search/users?q=h&order=asc&per_page=20&page=' + page);
  }
  
  _selectCell(user: Object) {
    this.props.navigator.push({
      title: 'Detail',
      component: DetailPage,
      passProps: {user:user},
    });
  }
  
  _renderFooter = () => {
    return this.state.isLoading ?
      <View style={{height: 44, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
        <ActivityIndicatorIOS
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animating={true}
          size={'large'}
          color={'black'}
        />
        <Text
          style={{
            color: 'black',
            fontSize:  20,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
            marginLeft: 10,
          }}>
          Loading...
        </Text>
      </View> : null
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
    return (
       <ListView
        enableEmptySections={true} //MUST
        dataSource={this.state.dataSource}
        onEndReached={this._fetchData}  //.bind(this)
        onEndReachedThreshold={30}
        renderFooter={this._renderFooter}
        renderRow={this.renderRow.bind(this)}/>
    )
  }
}

export default SearchResults
