import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfContainer from './components/bookShelfContainer';
import SearchBooksComponent from './components/searchBooksComponent';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import Popup from './components/confirmBookAdded';
import LoadingDialog from './components/loadingDialog';

class BooksApp extends React.Component {
  state = {
    books: [],
    bookSearch: [],
    showSearchPage: false,
    showPopup: false,
    updatedBook: {},
    showLoader: false
  }

  componentDidMount() {
    this.getAllBooks();
  }

  searchBooks = (query) => {
    this.setLoader(true);
    if (query === '' || !query) {
      this.clearBookListState();
      this.setLoader(false);
    } else {
      BooksAPI.search(query)
        .then((bookResult) => {
          const bookSearch = this.findShelvedBooks(bookResult);
          this.setState(() => ({
            bookSearch
          }));
          this.setLoader(false);
        });
    }
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

  updateBook = (book, shelf) => {
    this.setLoader(true);
    BooksAPI.update(book, shelf)
      .then(() => {
        this.getAllBooks(true);
        this.togglePopup(book);
      });
  }

  getAllBooks = (keepLoader) => {
    this.setLoader(true);
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }));
        if (!keepLoader) {
          this.setLoader(false);
        }
      });
  }

  clearBookListState = () => {
    this.setState(() => ({
      bookSearch: []
    }));
  }

  togglePopup = (updatedBook) => {
    const { showPopup } = this.state;
    this.setState({
      updatedBook,
      showPopup: !showPopup,
    });

    setTimeout(() => {
      this.setState({
        showPopup: false,
      });
    }, 3000);

    this.setLoader(false);
  }

  setLoader = (toggle) => {
    this.setState(() => ({
      showLoader: toggle
    }));
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
            clearBookListState={this.clearBookListState}>
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
                history.push('/');
              }}></BookShelfContainer>
            <Link
              className="open-search"
              to='/search'
              onClick={this.clearBookListState}>
              Add a book
            </Link>
          </div>
        )} />
        {
          this.state.showPopup ?
            <Popup
              loader={this.state.loader}
              textObject={this.state.updatedBook}
              showPopup={this.state.showPopup}
              closePopup={this.closePopup}
            /> : null
        }
        {
          this.state.showLoader ?
            <LoadingDialog /> : null
        }
      </div>
    )
  }
}

export default withRouter(BooksApp);
