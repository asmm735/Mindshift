const darkModeToggle = document.getElementById('dark-mode');
const container = document.querySelector('.container');

darkModeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        container.classList.add('dark-mode');
    } else {
        container.classList.remove('dark-mode');
    }
});

// Placeholder logout function
document.querySelector('.logout .button').addEventListener('click', () => {
    alert('Logged out successfully!');
});
