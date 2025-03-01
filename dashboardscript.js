function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(tabName).style.display = 'block';
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

function fetchSensorData() {
    fetch("http://localhost:5000/sensor-data") // Change to your backend URL
    .then(response => response.json())
    .then(data => {
        document.getElementById("temperature").innerText = data.temperature;
        document.getElementById("moisture").innerText = data.moisture;
        
        // Automatic Irrigation Logic
        if (data.moisture < 30) {
            startIrrigation(true); // Auto-start
        } else if (data.moisture > 60) {
            stopIrrigation(true); // Auto-stop
        }
    })
    .catch(error => console.error("Error fetching data:", error));
}

setInterval(fetchSensorData, 5000); // Refresh every 5s

function startIrrigation(auto = false) {
    document.getElementById("irrigation-status").innerHTML = "Irrigation Status: <span style='color:green;'>ON</span>";
    document.getElementById("start-irrigation").style.display = "none";
    document.getElementById("stop-irrigation").style.display = "inline-block";
    if (!auto) alert("Irrigation started successfully!");
}

function stopIrrigation(auto = false) {
    document.getElementById("irrigation-status").innerHTML = "Irrigation Status: <span style='color:red;'>OFF</span>";
    document.getElementById("stop-irrigation").style.display = "none";
    document.getElementById("start-irrigation").style.display = "inline-block";
    if (!auto) alert("Irrigation stopped successfully!");
}

function logout() {
    window.location.href = "index.html"; // Redirects back to login page
}

document.addEventListener("DOMContentLoaded", () => {
    openTab('monitoring'); // Default tab
});
