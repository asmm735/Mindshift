document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (username === "" || password === "") {
        showError("Please fill in all fields.");
        return;
    }

    // Simulate login (replace with actual backend API call)
    if (username === "user" && password === "password") {
        // Redirect to the main app page
        window.location.href = "app.html"; // Replace with your app's main page
    } else {
        showError("Invalid username or password.");
    }
});

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        showError("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('https://your-backend-api.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Save token or user data (e.g., in localStorage)
            localStorage.setItem('token', data.token);
            window.location.href = "app.html"; // Redirect to main app
        } else {
            showError(data.message || "Login failed.");
        }
    } catch (error) {
        showError("An error occurred. Please try again.");
    }
});