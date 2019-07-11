import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { Content, Fab, Button, Icon, Spinner, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import axios from "axios";

import ListItems from "./component/ListItems";
import styles from "./styles";

const baseUrl = "http://192.168.1.123/book-catalogue/api/book/";

//Realm
var Realm = require('realm');
let realm;
var realmDataObject;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    realm = new Realm({
      schema: [{
        name: 'Book_Catalogue',
        primaryKey: 'id',
        properties: {
          id: 'string',
          title: 'string',
          author: 'string',
          synopsis: 'string'
        }
      }]
    });

    this.state = {
      data: [],
      realmData: [],
      loading: false
    }
  }

  componentDidMount(){
    this.makeRemoteRequest()
  }

  //Get all book
  makeRemoteRequest = () => {
    this.setState({loading: false});

    setTimeout(() => {
      axios.get(baseUrl + "get_book")
      .then(response => {
        this.setState({
          loading: false,
          data: response.data.book
        });

        //These data used to prevent duplicate data on Realm
        realmDataObject = realm.objects('Book_Catalogue');
        var totalDataServer = response.data.length;
        var totalDataRealm = realmDataObject.length;

        //Save each value to Realm
        // for (let index = 0; index < this.state.data.length; index++) {

        realm.write(() => {
          for (let index = 0; index < this.state.data.length; index++) {
            realm.create('Book_Catalogue', {
              id: this.state.data[index].id,
              title: this.state.data[index].title,
              author: this.state.data[index].author,
              synopsis: this.state.data[index].synopsis
            });
          }
        });

        // }
      })
      .catch(err => {
        throw err;

        realmDataObject = realm.objects('Book_Catalogue');
        var realmDataArray = Object.keys(realmDataObject).map(i => realmDataObject[i]);

        // Alert.alert(
        //   'Connection Failure',
        //   JSON.stringify(realmDataArray),
        //   [
        //     {text: 'OK', onPress: () => null},
        //   ],
        //   { cancelable: false }
        // )

        this.setState({
          loading: false,
          data: realmDataArray,
        });

        Alert.alert(
          'Connection Failure',
          'Failed getting data from server.',
          [
            {text: 'OK', onPress: () => null},
          ],
          { cancelable: false }
        )
      })
      .finally(function () {

      });
    }, 1500)
  }

  // saveToRealm = (item, index) => {
  //   realm.write(() => {
  //     var ID = realm.objects('Book_Catalogue').length + 1;

  //     realm.create('Book_Catalogue', {
  //       id: ID,
  //       title: item.title,
  //       author: item.author,
  //       synopsis: item.synopsis
  //     });
  //   });
  // }

  //Add book
  handlePostClick = (title, author, synopsis) => {
    var formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('synopsis', synopsis);

    axios({
      method: 'post',
      url: baseUrl + 'add_book',
      data: formData
    })
    .then(response => {
      this.makeRemoteRequest();
      this.props.navigation.popToTop();
    })
    .catch((error) => {
      throw error
    });
  }

  //Delete book
  handleDelete = (id, index) => {
    var formData = new FormData();
    formData.append('id', id);

    axios({
      method: 'post',
      url: baseUrl + 'delete_book',
      data: formData
    })
    .then(response => {
      this.makeRemoteRequest();
    })
    .catch((error) => {
      throw error
    });
  }

  //Edit book
  handleEdit = (title, author, synopsis, id) => {
    var formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('synopsis', synopsis);

    axios({
      method: 'post',
      url: baseUrl + 'update_book',
      data: formData
    })
    .then(response => {
      this.makeRemoteRequest();
      this.props.navigation.popToTop()
    })
    .catch((error) => {
      throw error
    });
  }

  handleLoadMore = () => {
    // this.setState({
    //   page: this.state.page + 1
    // }, () => {
    //   this.makeRemoteRequest()
    // })
  }

  renderFooter = () => {
    if(this.state.loading === false) return null;

    return (
      <View>
        <Spinner color='#1E88E5' />
        <Text style={styles.text} >
          Load more data
        </Text>
      </View>
    )
  }

  renderList = (item, index) => {
    return(
      <ListItem
        style={styles.listItem}
        avatar
        key={index}
        onPress={() => this.props.navigation.navigate("Edit", {
                  id: item.id,
                  title: item.title,
                  author: item.author,
                  synopsis: item.synopsis,
                  handleEdit: this.handleEdit
                })}
        onLongPress={() => Alert.alert(
          'Confirmation',
          'Delete this book?',
          [
            {text: 'Cancel', onPress: () => null},
            {text: 'OK', onPress: () => this.handleDelete(item.id, index)},
          ],
          { cancelable: false }
        )}
      >
        <Left>
          <Thumbnail style={styles.thumbnail} source={require('../../assets/img/ic_books.png')} />
        </Left>
        <Body>
          <Text>{item.title}</Text>
          <Text note>{item.author}</Text>
          <Text note>{item.synopsis}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    const {title, author, synopsis} = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1E88E5"
          barStyle="light-content"
        />

        <View style={styles.view}>
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
            style={styles.fab}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate("Add", {handlePostClick: this.handlePostClick} )}
        >
          <Icon type="FontAwesome" name="plus" />
        </Fab>
      </View>
    );
  }
}
