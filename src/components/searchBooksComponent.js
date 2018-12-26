import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';
import BooksGrid from './booksGrid';
import { Link } from 'react-router-dom';
import LoadingDialog from './loadingDialog';

class SearchBooksComponent extends Component {
    static propTypes = {
        shelvedBooks: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchedBooks: [],
        showLoader: false
    }

    checkTermTable = (query) => {
        const searchWords = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
            'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business',
            'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling',
            'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
            'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football',
            'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King',
            'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money',
            'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
            'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction',
            'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
            'Virtual Reality', 'Web Development', 'iOS'];

        const result = searchWords.filter((term) => (
            term.toLowerCase().includes(query.toLowerCase())
        ));

        return result[0];
    }

    clearBookListState = () => {
        this.setState(() => ({
            searchedBooks: []
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchedBooks[0] !== prevState.searchedBooks[0]) {
            const result = this.checkTermTable(this.state.query);
            if (result && result.length) {
                return;
            } else {
                this.clearBookListState();
            }
        }
    }

    findShelvedBooks = (bookResult) => {
        if (bookResult.length) {
            for (let i = 0; i < bookResult.length; i++) {
                const shelvedBook = this.props.shelvedBooks.filter((book) => book.id === bookResult[i].id);
                if (shelvedBook.length) {
                    bookResult[i].shelf = shelvedBook[0].shelf;
                }
            }
        }

        return bookResult;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const result = this.checkTermTable(this.state.query);

        if (this.state.query === '') {
            this.clearBookListState();
        }

        if (this.searchBooks && result && result.length) {
            this.searchBooks(this.state.query, result);
        }
    }

    searchBooks = (query, result) => {
        this.setLoader(true);
        if (query === '' || !result) {
            this.clearBookListState();
            this.setLoader(false);
        } else {
            BooksAPI.search(query)
                .then((bookResult) => {
                    const searchedBooks = this.findShelvedBooks(bookResult);
                    this.setState(() => ({
                        searchedBooks
                    }));
                    this.setLoader(false);
                });
        }
    }

    setLoader = (toggle) => {
        this.setState(() => ({
            showLoader: toggle
        }));
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));

        const result = this.checkTermTable(query);
        this.searchBooks(query, result);
    }

    render() {
        const { query, searchedBooks } = this.state;
        const { updateBook } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <form
                            onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value, event)} />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        books={searchedBooks}
                        updateBook={updateBook}
                    ></BooksGrid>
                </div>
                {
                    this.state.showLoader ?
                        <LoadingDialog /> : null
                }
            </div>
        )
    }
}

export default SearchBooksComponent;
