import React from 'react';
import PropTypes from 'prop-types';


const Book = props => {

    Book.propTypes = {
        book: PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired,
    };

    const { shelf, title, authors, imageLinks, id } = props.book;

    return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => props.updateBook({id: id}, event.target.value)} defaultValue={shelf ? shelf : 'none'}>
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

    );
};

// allowAnonLogging: true
// authors: ["William E. Shotts, Jr."]
// averageRating: 4
// canonicalVolumeLink: "https://market.android.com/details?id=book-nggnmAEACAAJ"
// categories: ["COMPUTERS"]
// contentVersion: "1.2.2.0.preview.2"
// description: "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial "shell shock," you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's "Evolution of a SysAdmin""
// id: "nggnmAEACAAJ"
// imageLinks: {smallThumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api", thumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
// industryIdentifiers: (2) [{…}, {…}]
// infoLink: "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api"
// language: "en"
// maturityRating: "NOT_MATURE"
// pageCount: 480
// panelizationSummary: {containsEpubBubbles: false, containsImageBubbles: false}
// previewLink: "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api"
// printType: "BOOK"
// publishedDate: "2012"
// publisher: "No Starch Press"
// ratingsCount: 2
// readingModes: {text: true, image: false}
// shelf: "currentlyReading"
// subtitle: "A Complete Introduction"
// title: "The Linux Command Line"

export default Book;