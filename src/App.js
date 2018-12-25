import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfContainer from './components/bookShelfContainer';
import SearchBooksComponent from './components/searchBooksComponent';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Popup from './components/confirmBookAdded'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookSearch: [],
    showSearchPage: false,
    showPopup: false,
    updatedBook: {}
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((bookResult) => {
        const bookSearch = this.findShelvedBooks(bookResult);

        this.setState(() => ({
          bookSearch
        }))
      });
  }

  findShelvedBooks = (bookResult) => {
    for (let i = 0; i < bookResult.length; i++) {
      const shelvedBook = this.state.books.filter((book) => book.id === bookResult[i].id);
      if (shelvedBook.length) {
        bookResult[i].shelf = shelvedBook[0].shelf;
      }
    }
    return bookResult;
  }

  componentDidMount() {
    this.getAllBooks();
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.getAllBooks();
        this.togglePopup(book);
      });
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }));
      });
  }

  clearBookListState = () => {
    const bookSearch = [];
    this.setState(() => ({
      bookSearch
    }))
  }

  togglePopup = (updatedBook) => {
    this.setState({
      updatedBook,
      showPopup: !this.state.showPopup
    });
  }

  closePopup = () => {
    this.setState({
      showPopup: false
    });
  }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooksComponent
            searchBooks={this.state.bookSearch}
            onSearchBooks={this.searchBooks}
            updateBook={this.updateBook}
            clearBookListState={this.clearBookListState}
          >
          </SearchBooksComponent>
        )} />
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelfContainer
              books={this.state.books}
              updateBook={(book, shelf) => {
                this.updateBook(book, shelf);
                history.push('/')
              }}></BookShelfContainer>
              <Link
                className="open-search"
                to='/search'
                onClick={this.clearBookListState}>
                Add a book
            </Link>
          </div>
        )} />
        { this.state.showPopup ?
          <Popup
            textObject={this.state.updatedBook}
            showPopup={this.state.showPopup}
            closePopup={this.closePopup}
          /> : null
        }
      </div>
    )
  }
}

export default BooksApp
