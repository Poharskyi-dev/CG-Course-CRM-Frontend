const token = localStorage.getItem("JWT");

if (token == null) {
    logout();
}

const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", function() {
    logout();
});

function logout() {
    localStorage.removeItem("JWT");
    location.href = "/pages/login.html";
}

const peopleTableBody = document.querySelector("#peopleTableBody");

async function getPeople() {
    const response = await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (response.ok) {

        const users = await response.json();

        let tableBodyHtml = "";
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            tableBodyHtml += `
            <tr id="${user.id}">
                <td>${user.user_id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteUser('${user.user_id}')">Delete</button>
                </td>
            </tr>
        `;
        }

        peopleTableBody.innerHTML = tableBodyHtml;

    } else {
        alert("Can not get people!");

        logout();
    }
}

getPeople();


async function deleteUser(userId) {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if (response.ok) {
        alert("User deleted successfully.");
        // If you get an error that query selector has invalid CSS selector please use getElementById instead of querySelector
        document.getElementById(userId).remove();
    } else {
        alert("User was not deleted!");
    }
}