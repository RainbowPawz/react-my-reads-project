import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
    Book.propTypes = {
        book: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired,
    };

    const { shelf, title, authors, imageLinks, id } = props.book;
    const imagePath = imageLinks ? imageLinks.smallThumbnail : null;
    const shelfTranslation = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None'
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className={!imagePath ? 'book-cover missing-book-cover' : 'book-cover'} style={{ backgroundImage: `url(${imagePath})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => props.updateBook({ id: id, title: title, shelf: shelfTranslation[event.target.value] }, event.target.value)} defaultValue={shelf ? shelf : 'none'}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    )
}

export default Book;
