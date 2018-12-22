import React, { Component } from 'react';
import propTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import BookShelf from './bookShelf';

class BookShelfContainer extends Component {
    static propTypes = {
        books: propTypes.array.isRequired,
        updateBook: propTypes.func.isRequired
    }

    render() {
        const { books, updateBook } = this.props;

        return (
            <div className="list-books-content">
                <div>
                    <BookShelf
                        shelf={{ name: 'Currently Reading', type: 'currentlyReading' }}
                        books={books}
                        updateBook={updateBook}>
                    </BookShelf>
                    <BookShelf
                        shelf={{ name: 'Want to Read', type: 'wantToRead' }}
                        books={books}
                        updateBook={updateBook}>
                    </BookShelf>
                    <BookShelf
                        shelf={{ name: 'Read', type: 'read' }}
                        books={books}
                        updateBook={updateBook}>
                    </BookShelf>
                </div>
            </div>
        )
    }
}

export default BookShelfContainer;