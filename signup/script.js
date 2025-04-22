document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (username === "" || password === "" || confirmPassword === "") {
        showError("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }

    // Simulate signup (replace with actual backend API call)
    // For now, just redirect to login page after successful signup
    alert("Signup successful! Please login.");
    window.location.href = "../loginpage/index.html";
});

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
