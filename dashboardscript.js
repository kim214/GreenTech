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
        document.getElementById("soil-ph").innerText = data.soil_ph; // Soil pH
        document.getElementById("humidity").innerText = data.humidity; // Humidity
        
        // Automatic Irrigation Logic
        if (data.moisture < 30) {
            startIrrigation(true); // Auto-start
        } else if (data.moisture > 60) {
            stopIrrigation(true); // Auto-stop
        }

        // Automatic Ventilation Logic (Only if manual mode is OFF)
        if (!manualVentilation) {
            if (data.temperature > 30 || data.humidity > 80) {
                openVentilation(true); // Auto-open fan
            } else {
                closeVentilation(true); // Auto-close fan
            }
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

// Ventilation System Logic
let manualVentilation = false; // Track manual control state

function openVentilation(auto = false) {
    document.getElementById("ventilation-status").innerHTML = "Ventilation Status: <span style='color:green;'>ON</span>";
    document.getElementById("open-ventilation").style.display = "none";
    document.getElementById("close-ventilation").style.display = "inline-block";

    if (auto) {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-on'>ON</span>";
        manualVentilation = false; // Disable manual mode when auto takes over
    } else {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-off'>OFF</span>";
        manualVentilation = true; // Enable manual mode
        alert("Fan opened successfully!");
    }
}

function closeVentilation(auto = false) {
    document.getElementById("ventilation-status").innerHTML = "Ventilation Status: <span style='color:red;'>OFF</span>";
    document.getElementById("close-ventilation").style.display = "none";
    document.getElementById("open-ventilation").style.display = "inline-block";

    if (auto) {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-on'>ON</span>";
        manualVentilation = false; // Disable manual mode when auto takes over
    } else {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-off'>OFF</span>";
        manualVentilation = true; // Enable manual mode
        alert("Fan closed successfully!");
    }
}

function logout() {
    window.location.href = "index.html"; // Redirects back to login page
}

document.addEventListener("DOMContentLoaded", () => {
    openTab('monitoring'); // Default tab
});
