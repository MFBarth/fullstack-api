/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

const baseUrl = window.location.origin;

document.getElementById('user-login').addEventListener('click', async event => {
    event.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const body = {
        email: email.value,
        password: password.value,
    };

    await fetch(`${baseUrl}/api/session`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' }
    });
     
    document.getElementById("create-user-form").reset();
    window.location.href = `${baseUrl}/`
});