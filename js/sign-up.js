const token = localStorage.getItem("JWT");

if (token != null) {
    location.href = "/pages/people.html";
}

const signUpForm = document.querySelector("#signUpForm");

const firstNameInput = document.querySelector("#firstName");
const secondNameInput = document.querySelector("#secondName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const roleInput = document.querySelector("#role");

signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    await signUp();
});

async function signUp() {

    const firstName = firstNameInput.value;
    const lastName = secondNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;

    console.log("ROLE -> ", role);

    const signUpRequestBody = {
        first_name: firstName,
        second_name: lastName,
        email: email,
        password: password,
    };

    const response = await fetch("http://localhost:8080/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpRequestBody),
    });

    if (response.ok) {
        alert("Sign Up Successfully!");
        location.href = "/pages/login.html";
    } else {
        alert("Sign Up Failed!");
    }
}