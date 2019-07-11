import React, { Component } from 'react';
import { Container, Left, Body, Right, Thumbnail, ListItem, Content, Form, Item, Input, Button, Text, Label } from 'native-base';
import axios from "axios";

import Headers from "./Headers";
import styles from "./styles";

const baseUrl = "http://192.168.1.123/book-catalogue/api/book/";

export default class EditScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      title: "",
      author: "",
      synopsis: ""
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.navigation.state.params.title,
      author: this.props.navigation.state.params.author,
      synopsis: this.props.navigation.state.params.synopsis
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

  handleSynopsis = (val) => {
    this.setState({
      synopsis: val
    })
  }

  handleEdit = (id) => {
    const {title, author, synopsis} = this.state;
    this.props.navigation.state.params.handleEdit(title, author, synopsis, id)
    this.setState({
      title: "",
      author: "",
      synopsis: ""
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
            <Text style={styles.bookSynopsis} note >{this.props.navigation.state.params.synopsis}</Text>
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
              <Label>Synopsis</Label>
              <Input value={this.state.synopsis} onChangeText={this.handleSynopsis} />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
