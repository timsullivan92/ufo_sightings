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

*Conservation.gov* US_County_Boundaries.geojson/cleanedgeodata.geojson
- <mark>Note:</mark> Both files, unzipped or zipped, are too large to push to the repository with GitHub LFS. As such, we are providing a link which you may consult if you wish to download US_County_Boundaries.geojson for your own use: https://www.conservation.gov/datasets/17b89622df5643cda5339ae6649247a6_0/about . cleanedgeodata.geojson may be acquired by following the subsequent steps -- (1) adding US_County_Boundaries.geojson to the "Data" folder in hana's branch in the repository on your computer and (2) running the cells in cleanedgeodata.ipynb.

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
  - Note: To view both choropleth map visualizations after clicking "UFO Chloropleth Map" button, follow instructions in highlighted note below in this "HTML Files" section.
- ufo-heat-map.html: HTML page specifically for the UFO sightings heat map visualization.
- ufo_markers.html:  HTML page specifically for the UFO sightings marker map visualization.
- yesoutliers.html: HTML page specifically for the UFO sightings' outliers above upper bound, choropleth map visualization
- nooutloers.html.gz/nooutliers.html: HTML page specifically for the UFO sightings <em>except</em> outliers above upper bound, choropleth map visualization
  - <mark>Note:</mark> To access nooutliers.html, open Terminal in the repository, and run the command "gunzip -k nooutliers.html.gz". After doing so, nooutliers.html should appear in the repository on your computer, and the map may be viewed through that file.
- chloropleth.html: HTML page specifically for both UFO sightings choropleth map visualizations
  - Note: To view both choropleth map visualizations when accessing cloropleth.html, follow instructions in highlighted note above in this "HTML Files" section.

**JavaScript Files**
"main" Branch
- ufo_heatmap.js: Script to render UFO sighting data as a heat map. Uses ufo_sighting_data.csv for data points.
- ufo_markers.js: Script for rendering UFO sightings as markers on the map.
- ufo_sightings_markers.js: Additional script for marker-specific functionalities on UFO sightings data.

**Jupyter Notebooks**
"hana" Branch
- yesoutliers.ipynb: Script to render UFO sighting outliers above upper bound as a choropleth map. Uses chloropleth.geojson for data points.
  - Note: choropleth.geojson, unzipped or zipped, are too large to push to the repository with GitHub LFS. As such, we are providing instructions to acquire that file: (1) Follow the steps in the highlighted note above under the "Data Sources" section, and (2) run the cells in choropleth.ipynb.
- nooutliers.ipynb: Script to render UFO sightings <em>except</em> outliers above upper bound as a choropleth map. Uses chloropleth.geojson for data points.
  - Note: choropleth.geojson, unzipped or zipped, are too large to push to the repository with GitHub LFS. As such, we are providing instructions to acquire that file: (1) Follow the steps in the highlighted note above under the "Data Sources" section, and (2) run the cells in choropleth.ipynb.

**Other Files**
- .gitignore: Specifies files and folders to be ignored by Git.
- README.md: Project documentation (you are here).
- style.css: Contains custom CSS for styling the web pages.

**Outside Sources**
- https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js: Utilized an example on this website to load data from our dataset into our Javascript application.
- Documentation for Folium
- Tutoring Sessions
- Xpert
