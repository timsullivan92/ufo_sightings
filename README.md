# ufo_sightings
Project 3 - UFO Sighting visualizations
A lot of my files are too large to push to my branch. As such, I will take account of all of my files in my README.md.
1. ufo_sighting_data.csv
    - The set is from Kaggle, though the actual data is from nuforc.org. Cameron found it.
2. cleanedsightings.ipynb
    - The file in which I cleaned ufo_sighting_data.csv.
3. cleanedsightings.csv
    - The result of my cleaning.
4. nullsforrebekah.csv
    - None of the nulls were in the U.S.; other wise, Rebekah and I would have made calls to Reverse Geocoding API to the original coordinates with no city/state in ufo_sighting_data.csv for their counties.
5. us_cities_states_counties.csv
    - The set is from grammakov, a user on GitHub. The instructor was able to find it.
6. cleanedcounties.ipynb
    - The file in which I cleaned us_cities_states_counties.csv. I revisited it to (1) include columns for states and states' abbreviations and (2) make the letters' cases uniform for easier merges.
7. cleanedcounties.csv
    - The result of my cleaning.
8. merge.ipynb
    - I merged cleaned_sightings.csv and cleanedcounties.csv on the columns city and state to find each city's county/counties.
9. merge.csv
    - The result of my merging.
10. countiescounted.ipynb
    - I made a dataframe of (1) unique pairs of counties and states and (2) how often they appeared in merge.csv to get sums of the sightings in each county.
11. countiescounted.csv
    - Where I saved my dataframe.
12. US_County_Boundaries.geojson
    - The set is from Conservation.gov (https://www.conservation.gov/datasets/17b89622df5643cda5339ae6649247a6_0/explore). I found it.
13. cleanedgeodata.ipynb
    - I cleaned US_County_Boundaries.geojson.
14. cleanedgeodata.geojson
    - The result of my cleaning.
15. choropleth.ipynb
    - I merged cleanedgeodata.geojson with countiescounted.csv for only boundaries which we needed.
16. nooutliers.ipynb and yesoutliers.ipynb
    - I was torn between (1) using the original sightings and the variation in the lower values getting lost and (2) using the logarithim of the sightings and the higher outliers getting lost, so I opted for 2 maps. One with the outliers above the upper bounds of the data (which I calculated with quartiles), and another with all else.
17. nooutliers.html and yesoutliers.html
    - Where I saved the maps.
18. chloropleth.html
    - Both maps in one screen.