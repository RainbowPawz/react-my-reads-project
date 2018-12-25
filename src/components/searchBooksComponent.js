import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './booksGrid';
import { Link } from 'react-router-dom';

class SearchBooksComponent extends Component {
    static propTypes = {
        searchBooks: PropTypes.array.isRequired,
        onSearchBooks: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired,
        clearBookListState: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchBooks[0] !== prevProps.searchBooks[0]) {
            const result = this.checkTermTable(this.state.query);
            this.props.onSearchBooks(result);
        }
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
            term.toLowerCase() === query.toLowerCase()
        ));

        return result[0];
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));

        const result = this.checkTermTable(query);

        this.props.onSearchBooks(result);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const result = this.checkTermTable(this.state.query);

        if (this.props.onSearchBooks && result && result.length) {
            this.props.onSearchBooks(this.state.query);
        }
    }

    render() {
        const { query } = this.state;
        const { searchBooks, updateBook } = this.props;

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
                        books={searchBooks}
                        updateBook={updateBook}
                    ></BooksGrid>
                </div>
            </div>
        )
    }
}

export default SearchBooksComponent;
