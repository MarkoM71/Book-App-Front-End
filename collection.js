document.addEventListener('DOMContentLoaded', function () {
  renderBooks();
});

let books = [];

//Fetch Books from the Backend
async function getBooks() {
    try {
        const response = await axios.get('https://book-app-cfffe880e610.herokuapp.com/books/')
        return response.data.books
    } catch (error) {
    console.error("Error getting Books:", error);
    return [];
  }
}

//Render Books
async function renderBooks() {
    try {
        books = await getBooks()

        const bookContainer = document.querySelector('.collection-container')
        bookContainer.innerHTML = '';

        books.forEach((book) => {
            const bookDiv = document.createElement('div')
            const bookTitle = document.createElement('h3')
            const bookAuthor = document.createElement('h4')
            const bookYear = document.createElement('p')
            const deleteButton = document.createElement('button');
            const editButton = document.createElement('button');

            bookDiv.className = 'book';
            bookTitle.className = 'book-title';
            bookAuthor.className = 'book-author';
            bookYear.className = 'book-release-year'
            deleteButton.className = 'delete';
            editButton.className = 'edit';

            bookTitle.textContent = book.title;
            bookAuthor.textContent = book.author;
            bookYear.textContent = book.year;

            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(book._id))

            editButton.textContent = 'Edit';

            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(bookAuthor);
            bookDiv.appendChild(bookYear);
            bookDiv.appendChild(deleteButton);
            bookDiv.appendChild(editButton);

            bookContainer.appendChild(bookDiv);
        })
    } catch (error){
            console.error('Error rendering books:', error);
    }
}

//Delete Book
async function deleteBook(bookId) {
    try {
        await axios.delete(`https://book-app-cfffe880e610.herokuapp.com/books/${bookId}`);
        await renderBooks(); 
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}



