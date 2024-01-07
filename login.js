document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('user-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        try {
            const response = await axios.post('https://book-app-cfffe880e610.herokuapp.com/users/login', {
                name: name,
                email: email
            });

            // Assuming the server responds with user data
            if (response.data) {

                // Store user data if needed (e.g., in localStorage)
                localStorage.setItem('user', JSON.stringify(response.data));

                // Redirect to the book collections page
                window.location.href = './collection.html';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (e.g., show message to user)
        }
    });

    const newForm = document.getElementById('new-user-form')

    newForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('new-name').value;
        const email = document.getElementById('new-email').value;

        try {
            const response = await axios.post('https://book-app-cfffe880e610.herokuapp.com/users/', {
                name: name,
                email: email
            });

            // Assuming the server responds with user data
            if (response.data) {

                // Store user data if needed (e.g., in localStorage)
                localStorage.setItem('user', JSON.stringify(response.data));

                // Redirect to the book collections page
                window.location.href = './collection.html';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (e.g., show message to user)
        }
    });

});