function createAccount(event) {
    event.preventDefault(); // Prevent form submission reload

    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Store user data in localStorage
    let userData = {
        fullName: fullName,
        email: email,
        phone: phone,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect to login page
    window.location.href = "index.html"; 

    return false;
}