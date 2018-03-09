import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksApp from './App';

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Link = require('react-router-dom').Link;

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSearchPage: true
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event){
        console.log(event.target.value);
        let query = event.target.value;
        BooksAPI.search(query).then((array) => {
            array.map( (book) => {
                console.log(book.title);
                
            });
        });
    }
    

    render(){
        return(
            <div>
            {!this.state.showSearchPage ? (
                <BooksApp/>
              ) : (
            <div className="search-books">
            <div className="search-books-bar">
            <Router>
                <div >
                    <Link to = {'./'} className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
                </div>
            </Router>  
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title  or author" onChange = {this.handleSearch}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
    </div>
)
}
}

export default Search