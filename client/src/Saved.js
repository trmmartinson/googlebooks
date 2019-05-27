import React from "react";
import Axios from "axios";
import Book from "./Book";


class Saved extends React.Component {
  state = {
    search: "",
    results: []
  };

  get_books = (query) => {
    Axios.get("/books")
   //.then(res => this.setState({ results:  Object.values(res.data.items) }))
   .then(res => this.setState({ results:  Object.values(res.data) }))
   //.then(res => console.log(res.data))
   .catch(err => console.log("ERRROR" + err));
 };

 view = (num) => {
  let url = this.state.results[num].link;
  window.open(url, '_blank');
  //window.open(url, '_blank');
}

delete = (num) => {
  let record_id  = this.state.results[num]._id;
    Axios.delete("/books/" + record_id)
   .then(res => this.setState({ results:  Object.values(res.data) }))
   .catch(err => console.log("ERRROR" + err));
    this.get_books();    
 }


 handleClick = (the_button) => {
  let num =  the_button.match(/\d+/g);
  console.log("york num=" +   num + the_button )
  if (the_button.startsWith("view"))
      this.view(num);
  else if (the_button.startsWith("Delete"))
      this.delete(num);
  //    this.save(num);
}
  componentDidMount() {
      this.get_books();    

  } 

  render() {
    console.log("state in results0" + JSON.stringify(this.state.results[0]));
    console.log("state in results0" + JSON.stringify(this.state.results[0]));
  /*  this.state.results.map((book,idx) =>  {
       console.log("JSON.stringify(book))");
       console.log(JSON.stringify(book));
    }); */

                //image =   {book.image}
    return (
      <div>
        <div className='jumbotron'>
          <h1>Google book search </h1>
          <h5>Search for books previously saved</h5>
        </div>


        {this.state.results.map((book,idx) => (
          <Book id = {idx}  
                title =  {book.title}
                authors =  {book.authors}
                description =  {book.description}
                thumbnail = {book.image}
                button_1="View"
                button_2="Delete"  
                clicker={this.handleClick}
          />
        ))}





      </div>
    );
  }
}



export default Saved;
