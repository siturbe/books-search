import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>
                {this.state.book.title} by {this.state.book.author}
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h3>Synopsis</h3>
              <p>
                {this.state.book.description}
              </p>
              <a href={this.state.book.link}>Click to Here for Google Reader</a>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <img src={this.state.book.image}></img>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/books">← Back to My List</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
