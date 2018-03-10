import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksApp from './App';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
//var Route = ReactRouter.Route;
//var Switch = ReactRouter.Switch;
var Link = require('react-router-dom').Link;

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSearchPage: true,
            search: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event){
        //console.log(event.target.value);
        let query = event.target.value;
        BooksAPI.search(query).then((array) => {
          this.setState({
            search: array
          })
        });
    }
    handleChange(event, book){
        //console.log("handling change: "+ event.target.value);
        //console.log("book checker: "+book.id);
        BooksAPI.update(book, event.target.value).then((array) =>{
          //console.log("response: "+JSON.stringify(array.shelf));
          //this.handleGetAll();  
        });
      }
    

      render(){
        let books = this.state.search
          return(
              <div>
              {!this.state.showSearchPage ? (
                  <BooksApp/>
                ) : (
              <div className="search-books">
              <div className="search-books-bar">
              <Router>
                  <div >
                      <Link to={'./'} className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
                  </div>
              </Router>  
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title  or author" onChange={this.handleSearch}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
                {books!== undefined && 
                  <div className="search-books-results">
                  <ol className="books-grid">
                  {
                    books.map( (book, index) => {
                      let src = book.imageLinks.thumbnail
                      return(
                        <li key={index}>
                        <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${src})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={(e) => this.handleChange(e, book)}>
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
  
                      )
                    })
                  }
                  </ol>
                  </div>
                
                } 
                
              </div>
            </div>
          )
      }
      </div>
  )
  }
}

export default Search