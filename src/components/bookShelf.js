import React, { Component } from 'react';
import propTypes from 'prop-types';
import BooksGrid from './booksGrid';

class BookShelf extends Component {
    static propTypes = {
        shelf: propTypes.object.isRequired,
        books: propTypes.array.isRequired,
        updateBook: propTypes.func.isRequired
    }

    render() {
        const { shelf, books, updateBook } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{`${shelf.name}`}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        shelf={shelf}
                        books={books}
                        updateBook={updateBook}
                    ></BooksGrid>
                </div>
            </div>
        )
    }
}

export default BookShelf;