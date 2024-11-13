document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Leaflet map
    var map = L.map('map').setView([37.7, -122.4], 5);  // Default center on West Coast

    // Add OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize the heatmap layer with adjusted radius and blur for smaller, less intense points
    var heat = L.heatLayer([], {
        radius: 5,
        blur: 10,
        maxZoom: 17,
        gradient: {0.0: 'blue', 0.5: 'lime', 1.0: 'red'}
    }).addTo(map);

    var ufoSightingsData = [];

    // Load the UFO sightings data
    d3.csv("Data/ufo_sighting_data.csv").then(function(data) {
        data.forEach(function (d) {
            ufoSightingsData.push({
                date_time: d.Date_time,  // Use Date_time for date filtering
                city: d.city,
                state: d['state/province'],
                country: d.country,
                shape: d.UFO_shape,
                encounter_length: +d.length_of_encounter_seconds,
                described_duration: d.described_duration_of_encounter,
                description: d.description,
                date_documented: d.date_documented,
                latitude: +d.latitude,
                longitude: +d.longitude
            });
        });

        // Initially load all the data into the heatmap
        updateHeatmapData(ufoSightingsData);

        // Populate year dropdowns dynamically based on Date_time (year only)
        populateYearDropdowns(data);

        // Apply filters on page load (use default year range or empty values)
        filterData();

        // Safely check if elements exist before attaching event listeners
        var startDateDropdown = document.getElementById('startDate');
        if (startDateDropdown) {
            startDateDropdown.addEventListener('change', function () {
                filterData();
            });
        } else {
            console.error("startDate dropdown not found!");
        }

        var endDateDropdown = document.getElementById('endDate');
        if (endDateDropdown) {
            endDateDropdown.addEventListener('change', function () {
                filterData();
            });
        } else {
            console.error("endDate dropdown not found!");
        }

        // Apply filters on button click
        var applyFiltersButton = document.getElementById('apply-filters');
        if (applyFiltersButton) {
            applyFiltersButton.addEventListener('click', function () {
                filterData();
            });
        } else {
            console.error("Apply Filters button not found!");
        }
    }).catch(function(error) {
        console.error("Error loading CSV data: ", error);
    });

    // Function to filter the data based on the selected date range
    function filterData() {
        var startDate = document.getElementById('startDate') ? document.getElementById('startDate').value : '';
        var endDate = document.getElementById('endDate') ? document.getElementById('endDate').value : '';

        // Convert the selected years to date ranges
        var startDateObj = startDate ? new Date(startDate + '-01-01') : null;
        var endDateObj = endDate ? new Date(endDate + '-12-31') : null;

        var filteredData = ufoSightingsData.filter(function (sighting) {
            // Ensure the sighting's date_time is within the startDate and endDate range
            var sightingDate = new Date(sighting.date_time);  // Convert date_time to Date object

            var matchesStartDate = !startDateObj || sightingDate >= startDateObj;
            var matchesEndDate = !endDateObj || sightingDate <= endDateObj;

            return matchesStartDate && matchesEndDate;
        });

        console.log("Filtered Data:", filteredData);  // Log filtered data for debugging

        // Update the heatmap with the filtered data
        updateHeatmapData(filteredData);
    }

    // Function to update the heatmap with filtered data
    function updateHeatmapData(filteredData) {
        var heatData = [];

        filteredData.forEach(function (sighting) {
            var intensity = 20;  // Set constant intensity for all data points

            // Add the data point to the heatmap if it has valid latitude and longitude
            if (sighting.latitude && sighting.longitude) {
                heatData.push([sighting.latitude, sighting.longitude, intensity]);
            }
        });

        // Clear current heatmap data
        heat.setLatLngs([]);

        // Add new data to the heatmap
        heat.setLatLngs(heatData);
    }

    // Function to populate the start and end date dropdowns based on available years in the data
    function populateYearDropdowns(data) {
        var years = new Set();
        data.forEach(function (d) {
            var year = new Date(d.Date_time).getFullYear();  // Extract year from Date_time
            years.add(year);  // Add unique years to the set
        });

        // Convert the Set to an Array and sort the years (earliest to latest)
        var sortedYears = Array.from(years).sort(function (a, b) {
            return a - b;  // Sorting by year in ascending order
        });

        // Clear the dropdowns before populating
        var startDateDropdown = document.getElementById('startDate');
        var endDateDropdown = document.getElementById('endDate');
        startDateDropdown.innerHTML = '<option value="">Select Start Year</option>';
        endDateDropdown.innerHTML = '<option value="">Select End Year</option>';

        // Populate the sorted years in both dropdowns
        sortedYears.forEach(function (year) {
            var startOption = document.createElement('option');
            startOption.value = year;
            startOption.textContent = year;
            startDateDropdown.appendChild(startOption);

            var endOption = document.createElement('option');
            endOption.value = year;
            endOption.textContent = year;
            endDateDropdown.appendChild(endOption);
        });

        // Set default year range (2000 to the current year)
        var today = new Date().getFullYear(); // Get current year
        startDateDropdown.value = "2000";  // Default start year
        endDateDropdown.value = today.toString();  // Default end year
    }
});
