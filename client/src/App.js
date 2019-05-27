import React from 'react';
import Axios from 'axios';
import './App.css';
import Book from './Book.js';




class App extends React.Component {
  state = {
    search: "",
    results: []
  };

  get_books = (query) => {
     Axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query)
    .then(res => this.setState({ results:  Object.values(res.data.items) }))
    .catch(err => console.log(err));
  };



  onSubmit = (e) => {
    e.preventDefault();
    console.log("mystring:" + this.refs.book_query.value);
    this.get_books(this.refs.book_query.value);
  };

  view = (num) => {
      //alert(this.state.results[num].volumeInfo.previewLink    );
      let url = this.state.results[num].volumeInfo.previewLink;
      window.open(url, '_blank');
  }

  save = (num) => {
     let imageLink = "";
     if (this.state.results[num].volumeInfo.imageLinks)
     { 
         imageLink = this.state.results[num].volumeInfo.imageLinks.thumbnail;
     }
     Axios.post("/books",{

        title       :  this.state.results[num].volumeInfo.title,
        authors     :  this.state.results[num].volumeInfo.authors,
        description :   this.state.results[num].volumeInfo.description,
        link :   this.state.results[num].volumeInfo.previewLink,
        image : imageLink  
      })
    .then(/*res => this.setState({ results:  save_stuff.title } ) */)
    .catch(err => console.log(err));
      
  }
  handleClick = (the_button) => {
      let num =  the_button.match(/\d+/g);
      if (the_button.startsWith("View"))
          this.view(num);
      else if (the_button.startsWith("Save"))
          this.save(num);
  }
  render() {
    return (
      <div>
        <div className='jumbotron'>
          <h1>Google book search </h1>
          <h5>Search for books using google's book search api</h5>
        </div>
        <div className='black_box'>
          <h3>Google book search</h3>
          <h5>Book</h5>
          <form>
            <input placeholder="name" type="name" ref="book_query" />
            <button onClick={this.onSubmit}>Search</button>
          </form>
        </div>
        {this.state.results.map((book,idx) => (
          <Book id = {idx}  
                title =  {book.volumeInfo.title}
                authors =  {book.volumeInfo.authors}
                description =  {book.volumeInfo.description}
                thumbnail =  {typeof book.volumeInfo.imageLinks  != "undefined"  ? book.volumeInfo.imageLinks.thumbnail : "false" }
                previewLink = {book.volumeInfo.previewLink ? book.volumeInfo.previewLink : "n/a"}
                button_1="View"
                button_2="Save"  
                clicker={this.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default App;
