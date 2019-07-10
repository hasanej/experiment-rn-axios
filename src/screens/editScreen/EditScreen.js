import React, { Component } from 'react';
import { Container, Left, Body, Right, Thumbnail, ListItem, Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import axios from "axios";

import Headers from "./Headers";
import styles from "./styles";

const baseUrl = "http://192.168.1.123/katalog/api/Buku/";

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
            style={styles.thumbnail}
            source={require('../../assets/img/ic_books.png')}
          />
          <Body style={styles.body} >
            <Text style={styles.bookTitle} >{this.props.navigation.state.params.title}</Text>
            <Text style={styles.bookAuthor} note >{this.props.navigation.state.params.author}</Text>
            <Text style={styles.bookDescription} note >{this.props.navigation.state.params.description}</Text>
          </Body>

          <Text style={styles.caption} >
            Fill the form to edit
          </Text>

          <Form style={styles.form} >
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
