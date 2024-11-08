// Adding the street layer
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Adding the topographical layer
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a new marker cluster group
let ufoMarkers = L.markerClusterGroup();

// Create a baseMaps object
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object
let overlayMaps = {
  "UFO Sightings": ufoMarkers
};

// Creating the map object
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [street, ufoMarkers]
});

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Function to populate date selectors
function populateDateSelectors() {
  const years = range(1940, 2024);
  const months = range(1, 13);
  const days = range(1, 32);

  const selectors = ['start', 'end'];
  selectors.forEach(prefix => {
      populateSelect(`${prefix}Year`, years);
      populateSelect(`${prefix}Month`, months);
      populateSelect(`${prefix}Day`, days);
  });

  // Set default dates
  document.getElementById('startYear').value = "1940";
  document.getElementById('endYear').value = "2024";
  document.getElementById('startMonth').value = "1";
  document.getElementById('endMonth').value = "12";
  document.getElementById('startDay').value = "1";
  document.getElementById('endDay').value = "31";
}

// Helper function to create range of numbers
function range(start, end) {
  return Array.from({length: end - start}, (_, i) => start + i);
}

// Helper function to populate select elements
function populateSelect(elementId, values) {
  const select = document.getElementById(elementId);
  values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.text = value;
      select.appendChild(option);
  });
}

// Load the CSV data using D3
d3.csv("Data/ufo_sighting_data2.csv").then(function(data) {
  // Parse dates in the data
  data.forEach(d => {
      d.parsed_date = new Date(d.Date_time);
  });

  // Populate shape dropdown with unique shapes
  const shapes = [...new Set(data.map(d => d.UFO_shape))];
  const shapeSelect = document.getElementById("ufoShapeSelect");
  shapes.forEach(shape => {
      const option = document.createElement('option');
      option.value = shape;
      option.text = shape;
      shapeSelect.appendChild(option);
  });

  // Initialize date selectors
  populateDateSelectors();

  // Function to plot markers based on selected filters
  function plotMarkers(selectedShape) {
      ufoMarkers.clearLayers();

      // Get date range values
      const startDate = new Date(
          document.getElementById('startYear').value,
          document.getElementById('startMonth').value - 1,
          document.getElementById('startDay').value
      );
      const endDate = new Date(
          document.getElementById('endYear').value,
          document.getElementById('endMonth').value - 1,
          document.getElementById('endDay').value
      );

      // Loop through the data
      data.forEach(function(sighting) {
          const lat = parseFloat(sighting.latitude);
          const lon = parseFloat(sighting.longitude);

          // Check if coordinates are valid and date is within range
          if (!isNaN(lat) && !isNaN(lon) && 
              sighting.parsed_date >= startDate && 
              sighting.parsed_date <= endDate &&
              (selectedShape === "All" || sighting.UFO_shape === selectedShape)) {
              
              // Create marker and popup
              ufoMarkers.addLayer(L.marker([lat, lon])
                  .bindPopup(`<strong>Date:</strong> ${sighting.Date_time}<br>
                          <strong>City:</strong> ${sighting.city}<br>
                          <strong>State:</strong> ${sighting['state/province']}<br>
                          <strong>Country:</strong> ${sighting.country}<br>
                          <strong>Shape:</strong> ${sighting.UFO_shape}<br>
                          <strong>Latitude:</strong> ${sighting.latitude}<br>
                          <strong>Longitude:</strong> ${sighting.longitude}<br>
                          <strong>Description:</strong> ${sighting.description}`));
          }
      });

      myMap.addLayer(ufoMarkers);
  }

  // Initial plot of all markers
  plotMarkers("All");

  // Event listeners for all filters
  document.getElementById("ufoShapeSelect").addEventListener("change", function() {
      plotMarkers(this.value);
  });

  // Add event listeners for date selectors
  const dateSelectors = ['startYear', 'startMonth', 'startDay', 'endYear', 'endMonth', 'endDay'];
  dateSelectors.forEach(selector => {
      document.getElementById(selector).addEventListener('change', function() {
          plotMarkers(document.getElementById("ufoShapeSelect").value);
      });
  });
});