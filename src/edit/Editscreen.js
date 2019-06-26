import React, { Component } from 'react';
import { Container, List, Left,Body,Right, Thumbnail,ListItem,Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import { FlatList } from "react-native";
import axios from "axios"

import Headers from "./Headers.js"

const baseUrl = "http://10.254.53.152/app";

export default class EditScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      title: "",
      author: "",
      description: ""
    }
  }

  componentDidMount() {
    axios.get(baseUrl + "/edit/" + this.props.navigation.state.params.id)
    .then(res => {
      const newData = this.state.data.concat(res.data);
      this.setState({
        data: newData,
        title: res.data.title,
        author: res.data.author,
        description: res.data.description
      })
    })
    .catch(err => {
      throw err;
    });
  }

  handleTitle = (val) => {
    this.setState({
      title: val
    })
  }

  handleAuthor = (val) => {
    this.setState({
      author: val
    })
  }

  handleDescription = (val) => {
    this.setState({
      description: val
    })
  }

  handleEdit = (id) => {
    const {title, author, description} = this.state;
    this.props.navigation.state.params.handleEdit(title, author, description, id)
    this.setState({
      title: "",
      author: "",
      description: ""
    })
  }

  render() {
    const {id} = this.props.navigation.state.params
    return (
      <Container>
        <Headers navigation={this.props.navigation} handleEdit={this.handleEdit} id={id} />
        <Content>
          <List style={{marginTop: 10}} >
          <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => (
                <ListItem style={{marginRight: 20}} avatar >
                  <Left>
                    <Thumbnail
                      style={{backgroundColor:"#1E88E5"}}
                      source={require('../assets/img/ic_books.png')} />
                  </Left>
                  <Body>
                    <Text>{item.title}</Text>
                    <Text note>{item.author}</Text>
                    <Text note>{item.description}</Text>
                  </Body>
                </ListItem>
              )}
            />
          </List>

          <Text
            style={{
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
              color: "#AAA"}}
          >
                Fill the form to edit
          </Text>

          <Form style={{marginRight: 20, marginLeft: 5}} >
            <Item stackedLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={this.handleTitle}/>
            </Item>
            <Item stackedLabel>
              <Label>Author</Label>
              <Input value={this.state.author} onChangeText={this.handleAuthor}/>
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input value={this.state.description} onChangeText={this.handleDescription}/>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
