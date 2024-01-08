document.addEventListener('DOMContentLoaded', function () {
    //Login Existing User
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

                // Clear User Input
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';

                // Redirect to the book collections page
                window.location.href = './collection.html';
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });

    //Add New User
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

                // Clear New User Input
                document.getElementById('new-name').value = '';
                document.getElementById('new-email').value = '';

                // Redirect to the book collections page
                window.location.href = './registration.html';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (e.g., show message to user)
        }
    });

});