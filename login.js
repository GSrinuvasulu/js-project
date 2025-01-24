 // Function to handle the login form submission
 function handleLogin(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Redirect only if email and password are filled
    if (email && password) {
        window.location.href = "index.html";
    } else {
        alert("Please fill in both email and password.");
    }
}

// Function to handle guest login
function handleGuestLogin() {
    // Redirect directly to index.html
    window.location.href = "index.html";
}