import React, { Component } from 'react';
import { Alert,Platform, StyleSheet, View, StatusBar } from 'react-native';
import { Content, Fab, Button, Icon, Spinner, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import axios from "axios";

import ListItems from "./component/ListItems";

const baseUrl = "http://10.254.53.152:5000/app";

export default class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      page: 1,
      perpage: 5,
      sort: 1,
      loading: false
    }
  }

  //Get all book
  makeRemoteRequest = () => {
    const {page, perpage, sort} = this.state
    this.setState({loading:false})

    setTimeout(() => {
      axios.get(baseUrl + "?page=" + page + "&perpage=" + perpage + "&sort" + sort)
      .then(res => {
        const newData = this.state.data.concat(res.data);
        this.setState({
          loading: false,
          data: newData
        })
      })
      .catch(err => {
        throw err;
      });
    }, 1500)
  }

  componentDidMount(){
    this.makeRemoteRequest()
  }

  //Add book
  handlePostClick = (title, author, description) => {
    axios.post(baseUrl, {
      title, author, description
    })
    .then((response) => {
      const newData = this.state.data.concat(response.data);
      this.setState({
        data: newData
      })
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  //Delete book
  handleDelete = (id, index) => {
    axios.delete(baseUrl + "/" + id)
    .then(res => {
      const newData = this.state.data.concat();
      newData.splice(index, 1);

      this.setState({
        data: newData
      })
    })
    .catch(err => {
      throw err;
    });
  }

  //Edit book
  handleEdit = (title, author, description, id) => {
    axios.put(baseUrl + "/" + id, {
      title, author, description
    })
    .then((response) => {
      this.setState({
        data: response.data,
      })
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.makeRemoteRequest()
    })
  }

  renderFooter = () => {
    if(this.state.loading === false) return null;

    return (
        <View>
          <Spinner color='#1E88E5' />
          <Text style={{color: "#AAA", fontSize: 12, textAlign: 'center', bottom: 10}} >
            Load more data
          </Text>
        </View>
    )
  }

  renderList = (item,index) => {
    return(
      <ListItem
            style={{marginRight: 20}}
            avatar
            key={index}
            onPress={() => this.props.navigation.navigate("Edit", {
                      id: item._id,
                      handleEdit: this.handleEdit
                    })}
            onLongPress={() => Alert.alert(
              'Confirmation',
              'Delete this book?',
              [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => this.handleDelete(item._id, index)},
              ],
              { cancelable: false }
            )}>
            <Left>
              <Thumbnail style={{backgroundColor:"#1E88E5"}} source={require('../assets/img/ic_books.png')} />
            </Left>
            <Body>
              <Text>{item.title}</Text>
              <Text note>{item.author}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
    )
  }

  render() {
    const {title, author, description} = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1E88E5"
          barStyle="light-content"
        />

        <View style={{flex: 1}}>
            <ListItems
              {...this.props}
              data={this.state.data}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleLoadMore={this.handleLoadMore}
              renderFooter={this.renderFooter}
              renderList = {this.renderList}
            />
        </View>

        <Fab
            style={{backgroundColor: '#1E88E5'}}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate("Add", {
                      handlePostClick:this.handlePostClick
                    })}>
            <Icon type="FontAwesome" name="plus" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
