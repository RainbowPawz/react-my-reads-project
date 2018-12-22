import React from 'react'
import PropTypes from 'prop-types';
import BooksGrid from './booksGrid';


class SearchBooksComponent extends React.Component {
    static propTypes = {
        searchBooks: PropTypes.array.isRequired,
        onSearchBooks: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.onSearchBooks && this.state.query !== '') {
            this.props.onSearchBooks(this.state.query);
        }
    }

    render() {
        const { query } = this.state;
        const { searchBooks, updateBook } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        <form
                            onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)} />
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

export default SearchBooksComponent
