import React, { Component } from 'react';
import { Container, Left, Body, Right, Thumbnail, ListItem, Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import axios from "axios";

import Headers from "./Headers.js";

const baseUrl = "http://10.254.53.152/katalog/api/Buku/";

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
    this.setState({
      title: this.props.navigation.state.params.title,
      author: this.props.navigation.state.params.author,
      description: this.props.navigation.state.params.description
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
          <Thumbnail
            style={{backgroundColor: "#1E88E5", marginTop: 10, marginBottom: 10, alignSelf: "center"}}
            source={require('../assets/img/ic_books.png')}
          />
          <Body style={{marginStart: 15, marginEnd: 15}} >
            <Text style={{alignSelf: "center"}} >{this.props.navigation.state.params.title}</Text>
            <Text style={{alignSelf: "center"}} note >{this.props.navigation.state.params.author}</Text>
            <Text style={{alignSelf: "flex-start", marginTop: 10}} note >{this.props.navigation.state.params.description}</Text>
          </Body>

          <Text style={{alignSelf: "center", marginTop: 20, marginBottom: 20, color: "#AAA"}} >
            Fill the form to edit
          </Text>

          <Form style={{marginRight: 20, marginLeft: 5}} >
            <Item stackedLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={this.handleTitle} />
            </Item>
            <Item stackedLabel>
              <Label>Author</Label>
              <Input value={this.state.author} onChangeText={this.handleAuthor} />
            </Item>
            <Item stackedLabel>
              <Label>Description</Label>
              <Input value={this.state.description} onChangeText={this.handleDescription} />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
