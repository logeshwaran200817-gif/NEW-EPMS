document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });


    // POLLUTION REPORT SYSTEM

    const reportForm = document.getElementById("reportForm");
    const reportList = document.getElementById("reportList");
    const message = document.getElementById("message");

    let reportCount = 0;

    reportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("reporter").value.trim();
        const type = document.getElementById("pollutionType").value;
        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!name || !type || !location || !description) {
            message.textContent = "Please fill all fields.";
            return;
        }

        reportCount++;

        const reportCard = document.createElement("div");
        reportCard.className = "report-item";

        const heading = document.createElement("h3");
        heading.textContent = type;

        const locationText = document.createElement("p");
        locationText.textContent = "Location: " + location;

        const descriptionText = document.createElement("p");
        descriptionText.textContent = "Description: " + description;

        const reporterText = document.createElement("small");
        reporterText.textContent = "Reported by: " + name;

        reportCard.append(
            heading,
            locationText,
            descriptionText,
            reporterText
        );

        if (reportCount === 1) {
            reportList.innerHTML = "";
        }

        reportList.prepend(reportCard);

        document.getElementById("reportCount").textContent = reportCount;

        message.textContent = "Report submitted successfully!";

        reportForm.reset();
    });


    // POLLUTION ANALYTICS CHART

    const chartElement = document.getElementById("pollutionChart");

    if (typeof Chart !== "undefined" && chartElement) {

        new Chart(chartElement, {
            type: "line",

            data: {
                labels: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],

                datasets: [{
                    label: "Sample AQI",
                    data: [65, 75, 85, 70, 95, 80, 60],
                    borderWidth: 3,
                    tension: 0.4,
                    fill: false
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "AQI"
                        }
                    }
                }
            }
        });

    } else {
        console.error("Chart.js is not loaded.");
    }


    // GLOBAL POLLUTION MAP

    const mapElement = document.getElementById("pollutionMap");

    if (!mapElement) {
        console.error("Map container not found!");
        return;
    }

    if (typeof L === "undefined") {
        mapElement.textContent =
            "Map library not loaded. Check your internet connection.";
        console.error("Leaflet is not loaded.");
        return;
    }

    const pollutionMap = L.map("pollutionMap").setView([20, 0], 2);

    const tileLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }
    );

    tileLayer.addTo(pollutionMap);

    tileLayer.on("tileerror", function () {
        console.error("Map tiles failed to load.");
    });

    // SAMPLE LOCATIONS
    // These are demonstration markers, not live pollution readings.

    const locations = [
        {
            name: "Chennai, India",
            coordinates: [13.0827, 80.2707],
            pollution: "Sample Pollution Report"
        },
        {
            name: "Coimbatore, India",
            coordinates: [11.0168, 76.9558],
            pollution: "Sample Pollution Report"
        },
        {
            name: "Delhi, India",
            coordinates: [28.6139, 77.2090],
            pollution: "Sample Pollution Report"
        },
        {
            name: "London, UK",
            coordinates: [51.5072, -0.1276],
            pollution: "Sample Pollution Report"
        },
        {
            name: "New York, USA",
            coordinates: [40.7128, -74.0060],
            pollution: "Sample Pollution Report"
        },
        {
            name: "Tokyo, Japan",
            coordinates: [35.6762, 139.6503],
            pollution: "Sample Pollution Report"
        }
    ];

    locations.forEach(function (location) {

        L.marker(location.coordinates)
            .addTo(pollutionMap)
            .bindPopup(
                "<b>" + location.name + "</b><br>" +
                location.pollution
            );

    });

    // Correct map display size

    setTimeout(function () {
        pollutionMap.invalidateSize();
    }, 500);

    console.log("EcoWatch loaded successfully!");

});
