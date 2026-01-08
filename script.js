const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// LOGIN
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value
        })
    })
    .then(res => res.text())
    .then(data => {
        message.textContent = data;
        message.style.color = data.includes("successful") ? "green" : "red";
    });
});

// REGISTER
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (regPass.value !== regConfirm.value) {
        message.textContent = "Passwords do not match";
        message.style.color = "red";
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: regEmail.value,
            password: regPass.value
        })
    })
    .then(res => res.text())
    .then(data => {
        message.textContent = data;
        message.style.color = "green";
    });
});
