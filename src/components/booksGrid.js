import React, { Component } from 'react';
import propTypes from 'prop-types';
import Book from './book'

class BooksGrid extends Component {
    static propTypes = {
        books: propTypes.array.isRequired,
        updateBook: propTypes.func.isRequired
    }

    render() {
        const { shelf, books, updateBook } = this.props;

        return (
            <ol className="books-grid">
                {
                   shelf ? books.map((book) => (
                        shelf && shelf.type === book.shelf
                            ?
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateBook={updateBook}>
                                </Book>
                            </li>
                            : null

                    )) :
                    books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateBook={updateBook}>
                                </Book>
                            </li>

                    ))
                }
            </ol>
        )
    }
}

export default BooksGrid;