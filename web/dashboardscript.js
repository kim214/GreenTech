// MQTT Configuration
const broker = "ws://your-mqtt-broker-ip:port"; // Example: ws://192.168.1.100:9001
const topicSensor = "greenhouse/sensor"; // Topic for sensor data
const topicIrrigation = "greenhouse/irrigation"; // Topic for irrigation control
const topicVentilation = "greenhouse/ventilation"; // Topic for ventilation control

const client = mqtt.connect(broker);

client.on("connect", () => {
    console.log("Connected to MQTT broker!");
    client.subscribe(topicSensor); // Subscribe to sensor data
});

client.on("message", (topic, message) => {
    if (topic === topicSensor) {
        const data = JSON.parse(message.toString());
        updateSensorData(data);
    }
});

// Function to update UI with received sensor data
function updateSensorData(data) {
    document.getElementById("temperature").innerText = data.temperature;
    document.getElementById("moisture").innerText = data.moisture;
    document.getElementById("soil-ph").innerText = data.soil_ph;
    document.getElementById("humidity").innerText = data.humidity;

    // Automatic Irrigation Logic
    if (data.moisture < 30) {
        startIrrigation(true);
    } else if (data.moisture > 60) {
        stopIrrigation(true);
    }

    // Automatic Ventilation Logic (Only if manual mode is OFF)
    if (!manualVentilation) {
        if (data.temperature > 30 || data.humidity > 80) {
            openVentilation(true);
        } else {
            closeVentilation(true);
        }
    }
}

// Open and close tabs
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(tabName).style.display = 'block';
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Irrigation Functions
function startIrrigation(auto = false) {
    document.getElementById("irrigation-status").innerHTML = "Irrigation Status: <span style='color:green;'>ON</span>";
    document.getElementById("start-irrigation").style.display = "none";
    document.getElementById("stop-irrigation").style.display = "inline-block";
    client.publish(topicIrrigation, JSON.stringify({ status: "ON" })); // Send MQTT command
    if (!auto) alert("Irrigation started successfully!");
}

function stopIrrigation(auto = false) {
    document.getElementById("irrigation-status").innerHTML = "Irrigation Status: <span style='color:red;'>OFF</span>";
    document.getElementById("stop-irrigation").style.display = "none";
    document.getElementById("start-irrigation").style.display = "inline-block";
    client.publish(topicIrrigation, JSON.stringify({ status: "OFF" })); // Send MQTT command
    if (!auto) alert("Irrigation stopped successfully!");
}

// Ventilation System Logic
let manualVentilation = false; // Track manual control state

function openVentilation(auto = false) {
    document.getElementById("ventilation-status").innerHTML = "Ventilation Status: <span style='color:green;'>ON</span>";
    document.getElementById("open-ventilation").style.display = "none";
    document.getElementById("close-ventilation").style.display = "inline-block";
    client.publish(topicVentilation, JSON.stringify({ status: "ON" })); // Send MQTT command

    if (auto) {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-on'>ON</span>";
        manualVentilation = false;
    } else {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-off'>OFF</span>";
        manualVentilation = true;
        alert("Fan opened successfully!");
    }
}

function closeVentilation(auto = false) {
    document.getElementById("ventilation-status").innerHTML = "Ventilation Status: <span style='color:red;'>OFF</span>";
    document.getElementById("close-ventilation").style.display = "none";
    document.getElementById("open-ventilation").style.display = "inline-block";
    client.publish(topicVentilation, JSON.stringify({ status: "OFF" })); // Send MQTT command

    if (auto) {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-on'>ON</span>";
        manualVentilation = false;
    } else {
        document.getElementById("auto-ventilation-status").innerHTML = "Auto-Ventilation: <span class='auto-off'>OFF</span>";
        manualVentilation = true;
        alert("Fan closed successfully!");
    }
}

function logout() {
    window.location.href = "index.html"; // Redirects back to login page
}

document.addEventListener("DOMContentLoaded", () => {
    openTab('monitoring'); // Default tab
});
