# leaflet-challenge
# Leaflet-Part-1 & Leaflet-Part-2

This repository contains two parts of a Leaflet project: Leaflet-Part-1 and Leaflet-Part-2. Leaflet is a JavaScript library for interactive maps. Leaflet-Part-1 focuses on displaying earthquake data, while Leaflet-Part-2 includes both tectonic and earthquake data.

## Folder Structure

The repository has the following folder structure:

- Leaflet-Part-1
  - index.html
  - static
    - css
      - style.css
    - js
      - logic.js

- Leaflet-Part-2
  - index.html
  - static
    - css
      - style.css
    - js
      - logic.js

## Leaflet-Part-1

In Leaflet-Part-1, the webpage displays earthquake data on an interactive map. The index.html file contains the HTML structure, while the static/css/style.css file contains the CSS styles for the webpage. The static/js/logic.js file contains the JavaScript code for fetching earthquake data and creating the map.

The following functionalities are implemented in Leaflet-Part-1:

- Displaying earthquake data from the provided USGS API
- Creating circle markers with sizes corresponding to earthquake magnitudes
- Assigning different colors to the markers based on earthquake depths
- Adding a legend to indicate depth ranges and their corresponding colors
- Providing interactivity with popups showing additional details of each earthquake

## Leaflet-Part-2

In Leaflet-Part-2, the webpage extends the functionality of Leaflet-Part-1 by adding tectonic plates data to the map. In addition to the earthquake data, the tectonic plates data is fetched and visualized on the map.

The following functionalities are added in Leaflet-Part-2:

- Fetching tectonic plates data from the provided GeoJSON file
- Displaying tectonic plates as a separate layer on the map
- Providing layer controls to toggle the display of earthquake data and tectonic plates independently

## Running the Application

To run the application, follow these steps:

1. Clone the repository or download the ZIP file.
2. Navigate to the desired part (Leaflet-Part-1 or Leaflet-Part-2) in your local file system.
3. Open the `index.html` file in a web browser.

Make sure you have an active internet connection to fetch the necessary map tiles and data from external sources.

## Dependencies

The following libraries and services are used in the project:

- Leaflet: A JavaScript library for interactive maps.
- D3.js: A JavaScript library for data manipulation and visualization.
- Carto: A tile provider for grayscale map tiles.
- Google Maps: A tile provider for satellite map tiles.

## References

- Leaflet Documentation: [https://leafletjs.com/](https://leafletjs.com/)
- D3.js Documentation: [https://d3js.org/](https://d3js.org/)
- Carto: [https://carto.com/](https://carto.com/)
- Google Maps: [https://www.google.com/maps](https://www.google.com/maps)
- USGS Earthquake API: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Tectonic Plates GeoJSON Data: [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates)

## Contact

If you have any questions or feedback about this script, please feel free to contact me at param.birdi@utoronto.ca
