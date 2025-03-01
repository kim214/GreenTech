function loginUser(event) {
    event.preventDefault(); // Prevent page reload

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Retrieve stored user data from localStorage
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found! Please create an account first.");
        return false;
    }

    // Validate login details
    if (email === storedUser.email && password === storedUser.password) {
        // Redirect to dashboard on successful login
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect email or password! Please try again.");
    }
}