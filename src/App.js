import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Link = require('react-router-dom').Link;

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchPage: false,
      bookNames: [],
      currentlyReadingBooks: [],
      wantToReadBooks :[],
      readBooks: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleGetAll = this.handleGetAll.bind(this);
  }
  
  componentDidMount(){    
    this.handleGetAll();       
  }
  handleChange(event, book){
    //console.log("handling change: "+ event.target.value);
    //console.log("book checker: "+book.id);
    BooksAPI.update(book, event.target.value).then((array) =>{
      //console.log("response: "+JSON.stringify(array.shelf));
      this.handleGetAll();  
    });
  }

  handleGetAll(){
    let temp_array = [];
    let shelf_type ="";
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];
    BooksAPI.getAll().then((array) => {
      //console.log("stringified response: "+JSON.stringify(array))
      array.map( (book) => {
        shelf_type = book.shelf
          temp_array.push(book.title)
          //console.log("Shelf type: "+ shelf_type)
          if(shelf_type === "currentlyReading"){
              currentlyReading.push({
                id: book.id,
			          img: book.imageLinks.thumbnail,
                type: book.shelf,
                title: book.title,
                author: book.authors
              })
          }
          else if(shelf_type === "wantToRead"){
              wantToRead.push({
                id: book.id,
                img: book.imageLinks.thumbnail,
                type: book.shelf,
                title: book.title,
                author: book.authors
              })
          }
          else if(shelf_type==="read"){
              read.push({
                id: book.id,
                img: book.imageLinks.thumbnail,
                type: book.shelf,
                title: book.title,
                author: book.authors
              })
          }
          
      });
      // console.log("Currently Reading: " + currentlyReading)
      // console.log("Want to Read: " + wantToRead)
      // console.log("Read: " + read)
      this.setState({
        bookNames: temp_array,
        currentlyReadingBooks: currentlyReading,
        wantToReadBooks: wantToRead,
        readBooks: read
      });
    })
  }
  

  render() {
    let currentlyReading = this.state.currentlyReadingBooks;
    let wantToRead = this.state.wantToReadBooks;
    let read = this.state.readBooks;
    //console.log("inside render: "+ book_array[0]);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentlyReading.map(function(book, index){
                        let src = book.img
                        //console.log(src+"........")
                              return (
                                <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e) => this.handleChange(e, book)} value="currentlyReading">
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            }, this)}
                     
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {wantToRead.map(function(book, index){
                        let src = book.img
                        //console.log(src+"........")
                              return (
                                <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e) => this.handleChange(e, book)} value="wantToRead">
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            }, this)}
                     
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.map(function(book, index){
                        let src = book.img
                        //console.log(src+"........")
                              return (
                                <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e) => this.handleChange(e, book)} value="read">
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                          <div></div>
                        </div>
                      </li>
                              );
                            }, this)}
                     
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Router>
            <div className="open-search">
              <Link to = {'./Search'} onClick={() => this.setState({ showSearchPage: true })}> Add a book </Link>
            </div>
            </Router>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp