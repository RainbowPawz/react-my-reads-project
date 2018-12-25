import React, { Component } from 'react';
import propTypes from 'prop-types';
import Book from './book'

class BooksGrid extends Component {
    static propTypes = {
        books: propTypes.array.isRequired,
        updateBook: propTypes.func.isRequired
    }

    getBook = (book, updateBook) => {
        return (
            <li key={book.id}>
                <Book
                    book={book}
                    updateBook={updateBook}>
                </Book>
            </li>
        )
    }

    render() {
        const { shelf, books, updateBook, location } = this.props;

        return (
            <ol className="books-grid">
                {
                    books.map((book) => (
                        location.pathname === '/'
                            ? shelf.type === book.shelf
                                ? this.getBook(book, updateBook) : null
                            : this.getBook(book, updateBook)
                    ))
                }
            </ol>
        )
    }
}

export default BooksGrid;
