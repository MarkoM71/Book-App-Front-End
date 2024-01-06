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
            const favoriteButton = document.createElement('button');

            bookDiv.className = 'book';
            bookTitle.className = 'book-title';
            bookAuthor.className = 'book-author';
            bookYear.className = 'book-release-year'
            deleteButton.className = 'delete';
            editButton.className = 'edit';
            favoriteButton.className = 'favorite'
            

            bookTitle.textContent = book.title;
            bookAuthor.textContent = book.author;
            bookYear.textContent = book.year;


            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(book._id))

            editButton.textContent = 'Edit';

            favoriteButton.textContent = 'Favorite';
            favoriteButton.addEventListener('click', () => addFavorite(book._id));

            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(bookAuthor);
            bookDiv.appendChild(bookYear);
            bookDiv.appendChild(deleteButton);
            bookDiv.appendChild(editButton);
            bookDiv.appendChild(favoriteButton);

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

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
console.log(user._id)
console.log(typeof user);
console.log(Object.keys(user));
console.log(user.user._id)
//Add Favorite
async function addFavorite(bookId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const userId = user.user._id; // Assuming the user's ID is stored in the localStorage

        const response = await axios.post('https://book-app-cfffe880e610.herokuapp.com/users/favorites', {
            userId: userId,
            bookId: bookId
        });

        console.log('Favorite added:', response.data);
        // Update the UI accordingly
        // const favButton = document.querySelector('.favorite');
        // if (favButton) {
        //     favButton.style.backgroundColor = 'yellow';
        // }



    } catch (error) {
        console.error('Error adding favorite:', error.response ? error.response.data : error.message);
        // Handle errors from server or network issues
    }
}




//Add Book to Favorites// This is something I added today.
// async function toggleFavorite(bookId, button) {
//     try {
        // Assuming you have a function to get the current user's ID
        // const userId = getCurrentUserId(); //How do I do this?
//         await axios.post(`https://book-app-cfffe880e610.herokuapp.com/users/${userId}/favorites`, { bookId });
//         button.style.backgroundColor = button.style.backgroundColor === 'yellow' ? 'initial' : 'yellow';
//     } catch (error) {
//         console.error('Error toggling favorite:', error);
//     }
// }

// toggleFavorite(bookId, button) {
//         button.style.backgroundColor = button.style.backgroundColor === 'yellow' ? 'initial' : 'yellow';
// };




//Take Book Away from Favorites


