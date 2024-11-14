# UFO Sightings Map Project
This project visualizes UFO sightings data on an interactive web map. The data is presented in various formats, including heat maps and marker maps, to offer insights into the distribution and density of UFO sightings across different regions in the United States. The project includes both data preparation and visualization components.  The data preparation includes merging county data with the original sighting dataset that was then imported to MongoDB.

## Project Team 
- Jordan Goodrick
- Cameron Pond
- Rebekah Roehl
- Tim Sullivan
- Hana Wasif

## Data Sources 

*The National UFO Reporting Center*: [National UFO Reporting Center](https://nuforc.org/)

*US Counties by City*:  cleanedcounties.csv

## Libraries Used 
- Leaflet
- D3
- Open Street Map



## Project Structure
The main folders and files in this project are organized as follows:

```plaintext
├── Data/
│   ├── cleanedcounties.csv
│   ├── cleanedsightings.csv
│   ├── merge.csv
│   ├── nullsforrebekah.csv
│   ├── Special_Use_Airspace.csv
│   ├── Special_Use_Airspace.geojson
│   ├── ufo_sighting_data.csv
│   └── us_cities_states_counties.csv
├── .gitignore
├── index.html
├── README.md
├── style.css
├── ufo_heatmap.js
├── ufo_markers.js
├── ufo_sightings_markers.js
└── ufo-heat-map.html
```

## File Descriptions
**Data/**
- *cleanedcounties.csv:* Cleaned dataset of county information, used for merging with sighting data.
- *cleanedsightings.csv:* Cleaned dataset of UFO sightings after data processing.
- merge.csv: Merged dataset combining cleaned counties and sightings data.
- nullsforrebekah.csv: Intermediate file for handling null values in data cleaning.
- Special_Use_Airspace.csv: Dataset providing information on special use airspaces.
- Special_Use_Airspace.geojson: GeoJSON file used for mapping special airspace zones.
- ufo_sighting_data.csv: Raw UFO sightings data, providing location and time information for each sighting.
- us_cities_states_counties.csv: Supporting dataset of U.S. cities, states, and counties.

**HTML Files**
- index.html: Main entry point for the web application. Loads the map and initializes data visualization.
- ufo-heat-map.html: HTML page specifically for the UFO sightings heat map visualization.
- ufo_markers.html:  HTML page specifically for the UFO sightings marker map visualization.

**JavaScript Files**
- ufo_heatmap.js: Script to render UFO sighting data as a heat map. Uses ufo_sighting_data.csv for data points.
- ufo_markers.js: Script for rendering UFO sightings as markers on the map.
- ufo_sightings_markers.js: Additional script for marker-specific functionalities on UFO sightings data.

**Other Files**
- .gitignore: Specifies files and folders to be ignored by Git.
- README.md: Project documentation (you are here).
- style.css: Contains custom CSS for styling the web pages.

**Outside Sources**
- https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js: Utilized an example on this website to load data from our dataset into our Javascript application. 
