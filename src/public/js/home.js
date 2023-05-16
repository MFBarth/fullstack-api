/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

const baseUrl = window.location.origin;
let userForUpdate = '';

async function loadUsers() {
    const result = await fetch(`${baseUrl}/api/user/findAll`, {
        method: 'GET',
    });
    
    return result.json();
};

async function updateUserTable() {
    const users = await loadUsers();
    const allUsersHtml = users.map(user =>
        `<tr>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.cpf}</td>
            <td>${user.phone}</td>
            <td>${user.birthDay}</td>
            <td>
                <i class="fa fa-pencil" onclick="editUser('${user.id}')"></i>
                <i class="fa fa-trash-o" onclick="deleteUser('${user.id}')"></i>
            </td>
        </tr>`
    );

    const tableUsers = document.getElementById('users-table');
    tableUsers.innerHTML = allUsersHtml.join('');
};

async function submitForm() {
    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const cpf = document.getElementById("cpf");
    const phone = document.getElementById("phone");
    const birthDay = document.getElementById("birthDay");

    const body = {
        name: name.value,
        lastName: lastName.value,
        cpf: cpf.value,
        phone: phone.value,
        birthDay: birthDay.value,
    };

    if(userForUpdate) {
        const updateBody = {
            ...body,
            id: userId
        };
        
        await fetch(`${baseUrl}/api/user/update`, {
            method: 'PUT',
            body: JSON.stringify(updateBody),
            headers: { 'Content-type': 'application/json' }
        });
    } else {
        await fetch(`${baseUrl}/api/user/create`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-type': 'application/json' }
        });
    }    

    document.getElementById("create-user-form").reset();
    return updateUserTable();
};

async function editUser(userId) {
    const user = await fetch(`${baseUrl}/api/user/find?userId=${userId}`, {
        method: 'GET',
    }).then(response => response.json()).then(json => json);

    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const cpf = document.getElementById("cpf");
    const phone = document.getElementById("phone");
    const birthDay = document.getElementById("birthDay");

    name.value = user.name;
    lastName.value = user.lastName;
    cpf.value = user.cpf;
    phone.value = user.phone;
    birthDay.value = user.birthDay;

    userForUpdate = userId;
}

async function deleteUser(userId) {
    if(confirm('Deseja realmente excluir o usuário?')) {
        await fetch(`${baseUrl}/api/user/delete?userId=${userId}`, {
            method: 'DELETE',
        });
    }

    return updateUserTable();
}

window.onload = () => {
    updateUserTable();
}