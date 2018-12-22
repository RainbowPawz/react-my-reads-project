import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfContainer from './components/bookShelfContainer';
import SearchBooksComponent from './components/searchBooksComponent';

class BooksApp extends React.Component {
  state = {
    books: [],
    bookSearch: [],
    showSearchPage: false
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((bookSearch) => {
        this.setState(() => ({
          bookSearch
        }))
        console.log(this.state.bookSearch);
      });
  }

  componentDidMount() {
    this.getAllBooks();
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book) => {
        this.getAllBooks();
      });
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
        console.log(this.state.books);
      })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooksComponent
            searchBooks={this.state.bookSearch}
            onSearchBooks={this.searchBooks}
            updateBook={this.updateBook}
            >
          </SearchBooksComponent>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookShelfContainer
                books={this.state.books}
                updateBook={this.updateBook}></BookShelfContainer>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
