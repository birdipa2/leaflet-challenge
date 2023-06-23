# leaflet-challenge
## Earthquake Visualization

This project visualizes earthquake data using Leaflet and D3.js. It displays earthquake locations on a map, with markers representing the magnitude and color representing the depth of each earthquake.

## Files

### index.html

The HTML file (`index.html`) contains the structure of the webpage. It includes the necessary CSS and JavaScript dependencies, such as the Leaflet CSS and JavaScript files, the D3.js library, and the custom JavaScript file (`logic.js`) that handles the earthquake data and map visualization. The HTML file also includes a `<div>` element with an id of "map" that serves as the container for the Leaflet map.

### style.css

The CSS file (`style.css`) contains styling rules for the webpage. It includes styles to set the height of the map container and ensure it takes up the full height of the viewport. It also defines styles for the legend, which is used to display the color-coded depth information.

## logic.js

The JavaScript file (`logic.js`) is responsible for fetching earthquake data from the provided GeoJSON API, processing the data, and visualizing it on the Leaflet map.

1. It starts by defining the URL of the GeoJSON data source.
2. The code uses the `d3.json()` function to fetch the earthquake data.
3. The data is processed to filter earthquakes based on location (in this case, filtering for earthquakes in Colorado). One can always zoom out to view additional locations.
4. Leaflet and D3.js are used to create a map and visualize the earthquakes as circle markers.
5. The `getColor` function is defined to assign colors to the circle markers based on the depth of the earthquakes.
6. The circle markers are added to a layer group and displayed on the map.
7. The code sets up base maps and overlay maps for layer control in Leaflet.
8. A legend control is created and added to the map to display depth information.
9. Finally, the map and controls are added to the HTML page.

## Getting Started

To run the project, simply open the `index.html` file in a web browser. The browser will load the necessary dependencies and display the earthquake visualization on the map.

## Customization

To customize the visualization, you can modify the code in `logic.js`. You can change the GeoJSON data source URL, adjust the filtering criteria, customize the map settings, and modify the styling and legend in the code as per your requirements.

