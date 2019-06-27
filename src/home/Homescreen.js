import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { Content, Fab, Button, Icon, Spinner, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import axios from "axios";

import ListItems from "./component/ListItems";

const baseUrl = "http://10.254.53.152/katalog/api/Buku/";

//Realm
var Realm = require('realm');
let realm;
var realmDataObject;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    realm = new Realm({
      schema: [{name: 'Book_Catalogue',
      properties: {
        id_buku: {type: 'int', default: 0},
        title: 'string',
        author: 'string',
        description: 'string'
      }}]
    });

    this.state = {
      data: [],
      realmData: [],
      loading: false
    }
  }

  //Get all book
  makeRemoteRequest = () => {
    this.setState({loading: false});

    setTimeout(() => {
      axios.get(baseUrl + "list_buku")
      .then(res => {
        this.setState({
          loading: false,
          data: res.data.Buku
        });

        //These data used to prevent duplicate data on Realm
        realmDataObject = realm.objects('Book_Catalogue');
        var totalDataServer = res.data.length;
        var totalDataRealm = realmDataObject.length;

        //Prevent duplicate data on Realm
        if (totalDataServer > totalDataRealm) {
          //Save each value to Realm
          for (let index = 0; index < this.state.data.length; index++) {
            realm.write(() => {
              var ID = realm.objects('Book_Catalogue').length + 1;

              realm.create('Book_Catalogue', {
                id_buku: ID,
                title: this.state.data[index].judul_buku,
                author: this.state.data[index].pengarang,
                description: this.state.data[index].sinopsis_buku
              });
            });
          }
        }
      })
      .catch(err => {
        // throw err;

        realmDataObject = realm.objects('Book_Catalogue');
        var realmDataArray = Object.keys(realmDataObject).map(i => realmDataObject[i]);

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

  saveToRealm = (item, index) => {
    realm.write(() => {
      var ID = realm.objects('Book_Catalogue').length + 1;

      realm.create('Book_Catalogue', {
        id_buku: ID,
        title: item.title,
        author: item.author,
        description: item.description
      });
    });
  }

  componentDidMount(){
    this.makeRemoteRequest()
  }

  //Add book
  handlePostClick = (title, author, description) => {
    var formData = new FormData();
    formData.append('judul_buku', title);
    formData.append('pengarang', author);
    formData.append('sinopsis_buku', description);

    axios({
      method: 'post',
      url: baseUrl + 'tambah_buku',
      data: formData,
    })
    // axios.post(baseUrl + 'tambah_buku', { judul_buku: title, pengarang: author, sinopsis_buku: author })
    .then(res => {
      this.setState({
        data: res.data.Buku
      })
      this.props.navigation.popToTop();
      // this.props.navigation.navigate("Home");
    })
    .catch((error) => {
      throw error
    });
  }

  //Delete book
  handleDelete = (id, index) => {
    axios.delete(baseUrl + 'delete_buku', { data: { id_buku: id } })
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
    // var formData = new FormData();
    // formData.append('id_buku', id);
    // formData.append('judul_buku', title);
    // formData.append('pengarang', author);
    // formData.append('sinopsis_buku', description);

    // axios({
    //   method: 'put',
    //   url: baseUrl + 'update_buku',
    //   data: formData,
    // })
    axios.put(baseUrl + "update_buku", { data: {
      id_buku: id, judul_buku: title, pengarang: author, sinopsis_buku: description
    }})
    .then(res => {
      this.setState({
        data: res.data.Buku,
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

  renderList = (item, index) => {
    return(
      <ListItem
        style={{marginRight: 20}}
        avatar
        key={index}
        onPress={() => this.props.navigation.navigate("Edit", {
                  id: item.id_buku,
                  title: item.judul_buku,
                  author: item.pengarang,
                  description: item.sinopsis_buku,
                  handleEdit: this.handleEdit
                })}
        onLongPress={() => Alert.alert(
          'Confirmation',
          'Delete this book?',
          [
            {text: 'Cancel', onPress: () => null},
            {text: 'OK', onPress: () => this.handleDelete(item.id_buku, index)},
          ],
          { cancelable: false }
        )}
      >
        <Left>
          <Thumbnail style={{backgroundColor: "#1E88E5"}} source={require('../assets/img/ic_books.png')} />
        </Left>
        <Body>
          <Text>{item.judul_buku}</Text>
          <Text note>{item.pengarang}</Text>
          <Text note>{item.sinopsis_buku}</Text>
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
            onPress={() => this.props.navigation.navigate("Add", {handlePostClick: this.handlePostClick} )}
        >
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
