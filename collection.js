document.addEventListener('DOMContentLoaded', function () {
    renderBooks();
    
    //Edit Book Functionality
    document.getElementById('editBookForm').addEventListener('submit', editBook);

    document.querySelector('.close-button').addEventListener('click', function() {
        document.getElementById('editModal').style.display = 'none';
    });
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
            const favoriteButton = document.createElement('button');
            const unFavoriteButton = document.createElement('button');

            bookDiv.className = 'book';
            bookTitle.className = 'book-title';
            bookAuthor.className = 'book-author';
            bookYear.className = 'book-release-year'
            deleteButton.className = 'delete';
            editButton.className = 'edit';
            favoriteButton.className = 'favorite';
            unFavoriteButton.className = 'un-favorite';
            

            bookTitle.textContent = book.title;
            bookAuthor.textContent = book.author;
            bookYear.textContent = book.year;


            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(book._id))

            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => openEditModal(book));

            //Add this to Open Modal
            editButton.addEventListener('click', () => openEditModal(book));

            favoriteButton.textContent = 'Favorite';
            favoriteButton.setAttribute('data-book-fav-id', book._id); 
            favoriteButton.addEventListener('click', () => addFavorite(book._id));

            unFavoriteButton.textContent = 'Un-Favorite';
            unFavoriteButton.setAttribute('data-book-unFav-id', book._id)
            unFavoriteButton.addEventListener('click', () => unFavorite(book._id));

            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(bookAuthor);
            bookDiv.appendChild(bookYear);
            bookDiv.appendChild(deleteButton);
            bookDiv.appendChild(editButton);
            bookDiv.appendChild(favoriteButton);
            bookDiv.appendChild(unFavoriteButton);

            bookContainer.appendChild(bookDiv);
        })
    } catch (error){
            console.error('Error rendering books:', error);
    }
}

document.getElementById('book-form').addEventListener('submit', addBook);

//Add Book 
async function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    const bookData = {
        title: title,
        author: author,
        year: year
    };

    try {
        await axios.post('https://book-app-cfffe880e610.herokuapp.com/books/', bookData)

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('year').value = '';

        await renderBooks();
    } catch (error) {
        console.error('Error submitting book:', error);
    }
}

//Open Edit Modal 
function openEditModal(book) {
    document.getElementById('editBookId').value = book._id;
    document.getElementById('editTitle').value = book.title;
    document.getElementById('editAuthor').value = book.author;
    document.getElementById('editYear').value = book.year;

    document.getElementById('editModal').style.display = 'block';
}

//EDIT BOOK FUNCTIONALITY 
async function editBook(event) {
    event.preventDefault();

    const bookId = document.getElementById('editBookId').value;
    const updatedBookData = {
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        year: document.getElementById('editYear').value
    };

    try {
        await axios.put(`https://book-app-cfffe880e610.herokuapp.com/books/${bookId}`, updatedBookData);
        document.getElementById('editModal').style.display = 'none';
        await renderBooks();
    } catch (error) {
        console.error('Error updating book:', error);
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


//Add Favorite
async function addFavorite(bookId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user._id; 

        // Find the button element by the book ID
        const favButtonElement = document.querySelector(`[data-book-fav-id="${bookId}"]`);
        if (!favButtonElement) {
            throw new Error('Favorite button not found');
        }

        const response = await axios.post('https://book-app-cfffe880e610.herokuapp.com/users/favorites', {
            userId: userId,
            bookId: bookId
        });

        console.log('Favorite added:', response.data);
        
        favButtonElement.style.backgroundColor = 'yellow';
        favButtonElement.style.color = 'black';

    } catch (error) {
        console.error('Error adding favorite:', error.response ? error.response.data : error.message);
    }
}

//Remove Favorites
async function unFavorite(bookId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user._id; 

        const response = await axios.patch('https://book-app-cfffe880e610.herokuapp.com/users/favorites', {
            userId: userId,
            bookId: bookId
        });

        console.log('Favorite deleted:', response.data);
        const favButtonElement = document.querySelector(`[data-book-fav-id="${bookId}"]`);

        favButtonElement.style.backgroundColor = '';
        favButtonElement.style.color = '';

    } catch (error) {
        console.error('Error deleting favorite:', error.response ? error.response.data : error.message);
    }
}










