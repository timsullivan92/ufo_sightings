// Creating the map object
let myMap = L.map("map", {
  center: [37.09, -95.71], // Center the map on a specific location
  zoom: 5 // Set the initial zoom level
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a new marker cluster group
let markers = L.markerClusterGroup();

// Load the CSV data using D3
d3.csv("Data/ufo_sighting_data2.csv").then(function(data) {
  console.log(data); // Check if data is loaded

  // Function to plot markers based on selected UFO shape
  function plotMarkers(selectedShape) {
    markers.clearLayers(); // Clear existing markers

    // Loop through the data
    data.forEach(function(sighting) {
      // Get the latitude and longitude from the CSV
      let lat = sighting.latitude;
      let lon = sighting.longitude;

      // Check if latitude and longitude are valid
      if (lat && lon) {
        // Check if the UFO shape matches the selected shape or if "All" is selected
        if (selectedShape === "All" || sighting.UFO_shape === selectedShape) {
          // Create a marker and bind a popup with sighting details
          markers.addLayer(L.marker([lat, lon])
            .bindPopup(`<strong>Date:</strong> ${sighting.Date_time}<br>
                         <strong>City:</strong> ${sighting.city}<br>
                         <strong>State:</strong> ${sighting['state/province']}<br>
                         <strong>Country:</strong> ${sighting.country}<br>
                         <strong>Shape:</strong> ${sighting.UFO_shape}<br>
                         <strong>Latitude:</strong> ${sighting.latitude}<br>
                         <strong>Longitude:</strong> ${sighting.longitude}<br>
                         <strong>Description:</strong> ${sighting.description}`));
        }
      }
    });

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  }

  // Initial plot of all markers
  plotMarkers("All");

  // Event listener for the dropdown selection
  document.getElementById("ufoShapeSelect").addEventListener("change", function() {
    const selectedShape = this.value; // Get the selected shape
    plotMarkers(selectedShape); // Re-plot markers based on the selected shape
  });
});