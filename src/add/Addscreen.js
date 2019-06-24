import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Thumbnail } from 'native-base';

import Headers from "./Headers.js";

export default class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      description: ""
    }
  }

  handleTitle = (val) => {
    this.setState({
      title: val
    });
  }

  handleAuthor = (val) => {
    this.setState({
      author: val
    });
  }

  handleDescription = (val) => {
    this.setState({
      description: val
    });
  }

  handlePostClick = () => {
    const {title, author, description} = this.state;
    this.props.navigation.state.params.handlePostClick(title, author, description);
    this.setState({
      title: "",
      author: "",
      description: ""
    });
  }

  render() {
    return (
      <Container>
        <Headers navigation={this.props.navigation} handlePostClick={this.handlePostClick} />
        <Content>
          <Thumbnail
            style={{
              marginTop: 20,
              marginBottom: 10,
              alignSelf: "center",
              backgroundColor: "#1E88E5"
            }}
            source={require('../assets/img/ic_books.png')} />
          <Form style={{
            marginRight:20,
            marginLeft:5}} >
            <Item floatingLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={this.handleTitle} required />
            </Item>
            <Item floatingLabel>
              <Label>Author</Label>
              <Input value={this.state.author} onChangeText={this.handleAuthor} required />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input value={this.state.description} onChangeText={this.handleDescription} required />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
