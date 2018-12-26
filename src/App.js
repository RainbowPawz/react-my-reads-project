import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelfContainer from './components/bookShelfContainer';
import SearchBooksComponent from './components/searchBooksComponent';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import ConfirmModal from './components/confirmModal';
import LoadingDialog from './components/loadingDialog';

class BooksApp extends Component {
  state = {
    books: [],
    showConfirmModal: false,
    updatedBook: {},
    showLoader: false
  }

  closeConfirmModal = () => {
    this.setState({
      showConfirmModal: false
    });
  }

  componentDidMount() {
    this.getAllBooks();
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

  setLoader = (toggle) => {
    this.setState(() => ({
      showLoader: toggle
    }));
  }

  toggleConfirmModal = (updatedBook) => {
    const { showConfirmModal } = this.state;
    this.setState({
      updatedBook,
      showConfirmModal: !showConfirmModal,
    });

    setTimeout(() => {
      this.setState({
        showConfirmModal: false,
      });
    }, 3000);

    this.setLoader(false);
  }

  updateBook = (book, shelf) => {
    this.setLoader(true);
    BooksAPI.update(book, shelf)
      .then(() => {
        this.getAllBooks(true);
        this.toggleConfirmModal(book);
      });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooksComponent
            shelvedBooks={this.state.books}
            updateBook={this.updateBook}>
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
          this.state.showConfirmModal ?
            <ConfirmModal
              textObject={this.state.updatedBook}
              showConfirmModal={this.state.showConfirmModal}
              closeConfirmModal={this.closeConfirmModal}
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
