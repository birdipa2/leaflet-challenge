const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch earthquake data from the provided URL using D3
d3.json(url).then(function(data) {
  const coordinates = [];
  console.log(data);
  let mapZoomLevel = 5;

  // Extract coordinates for earthquakes in Colorado and store them in the coordinates array
  data.features.forEach((feature) => {
    const place = feature.properties.place;
    if (/Colorado/i.test(place)) {
      const [longitude, latitude] = feature.geometry.coordinates;
      coordinates.push({ longitude, latitude });
    }
  });

  // Create the base tile layer using OpenStreetMap
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let baseMaps = {
    "Street Map": street
  };

  let eqMarkers = [];
  let eqID = data.features.map((feature) => feature.id);

  // Define a color function to determine the fill color based on earthquake depth
  const getColor = (depth) => {
    if (depth <= 10) {
      return "#A9F36A";
    } else if (depth <= 30) {
      return "yellow";
    } else if (depth <= 50) {
      return "#FFB83D";
    } else if (depth <= 70) {
      return "#FF6105";
    } else {
      return "red";
    }
  };

  // Create circle markers for each earthquake feature and customize their properties
  for (let i = 0; i < data.features.length; i++) {
    const feature = data.features[i];
    const eqCoords = feature.geometry.coordinates;
    const magnitude = feature.properties.mag;
    const depth = eqCoords[2];
    const radius = magnitude * 3.5; // Adjust the radius based on magnitude or any desired factor
    const fillColor = getColor(depth); // Use the color function to determine the fill color based on depth
    const eqMarker = L.circleMarker([eqCoords[1], eqCoords[0]], {
      radius: radius,
      fillColor: fillColor,
      fillOpacity: 0.6,
      color: "black",
      weight: 0.5
    });
    eqMarkers.push(eqMarker);
    eqMarker.bindPopup(`<b>Magnitude:</b> ${magnitude}<br><b>Location:</b> ${feature.properties.place}<br><b>Depth:</b> ${depth} km`);
  }

  // Create a layer group for the earthquake markers
  let epicenter = L.layerGroup(eqMarkers);

  let overlayMaps = {
    "Epicenter": epicenter
  };

  // Create the map with the base tile layer and earthquake overlay layer
  let myMap = L.map("map", {
    center: [coordinates[0].latitude, coordinates[0].longitude],
    zoom: mapZoomLevel,
    layers: [street, epicenter]
  });

  // Add layer control to switch between base layers and overlay layers
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  let legend = L.control({
    position:"bottomright"
  });

  // Define the legend content
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    let grades = [-10, 10, 30, 50, 70];
    let colors = ["#A9F36A", "yellow", "#FFB83D", "#FF6105", "red"];

    // Loop through the grades and colors to generate legend labels
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Add the legend to the map
  legend.addTo(myMap);

})
.catch((error) => {
  console.log("An error occurred while fetching the data:", error);
});
