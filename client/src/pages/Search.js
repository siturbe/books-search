import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


class Books extends Component {

  constructor(props){
    super(props);
  
  
    this.state = {
      books: [],
      title: "",
      author: "",
      description: "",
      image: "",
      link: ""
    };
  }

  componentDidMount() {
    // this.loadBooks();
  }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let searchItem = this.state.title;
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchItem)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            books: result.items
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  };

  handleSaveButton = (event, info) => {
    event.preventDefault();
    // console.log(event.target);
    // let title = event.target.getAttribute("title");
    // let author = event.target.getAttribute("author");
    // let description = event.target.getAttribute("description");
    // let image = event.target.getAttribute("image");
    // let link = event.target.getAttribute("link");
    // this.setState({
    //   title: [title],
    //   author: [author],
    //   description: [description],
    //   image: [image],
    //   link: [link]
    // })
      API.saveBook({...info})
        .then(alert("Book Saved"))
        .catch(err => console.log(err));
  }


  render() {
    const{error, books} = this.state;
    if(error){
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1>Google Books Search</h1>
              </Jumbotron>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Search Book
                </FormBtn>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="md-12 sm-12">
              <ul>
                {books.map( book => {
                  const {title, description} = book.volumeInfo;
                  const link = book.accessInfo.webReaderLink;
                  const author = book.volumeInfo.authors[0];
                  const image = book.volumeInfo.imageLinks.smallThumbnail;

                  return (
                  <li className="list-group-item" key={book.id} >
                    <form>
                      <img src={book.volumeInfo.imageLinks.smallThumbnail} alt='No Image'></img>
                      <p style={{fontWeight: "bold"}}>{book.volumeInfo.title} </p>
                      <p>By: {book.volumeInfo.authors[0]} </p>
                      <p>{book.volumeInfo.description}</p>
                      <a href={book.accessInfo.webReaderLink}>Web Reader</a>
                        <FormBtn 
                          title={book.volumeInfo.title}
                          author={book.volumeInfo.authors[0]}
                          description={book.volumeInfo.description}
                          image={book.volumeInfo.imageLinks.smallThumbnail}
                          link={book.accessInfo.webReaderLink}
                          onClick={event => this.handleSaveButton(event, {title, description, link, author, image})}
                        > Save Book </FormBtn>
                    </form>
                  </li>
                  )
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Books;
