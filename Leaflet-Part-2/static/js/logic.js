const earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Fetch earthquake data from the provided URL using D3
d3.json(earthquakeURL).then(function(earthquakeData) {
  const coordinates = [];
  console.log(earthquakeData);
  let mapZoomLevel = 2.5;

  // Extract coordinates for earthquakes in Colorado and store them in the coordinates array
  earthquakeData.features.forEach((feature) => {
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

  // Create a grayscale tile layer using OpenStreetMap
  let grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com">Carto</a> contributors'
  });


  let satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20
  });

let baseMaps = {
  "Street Map": street,
  "Grayscale": grayscale,
  "Satellite": satellite
};


  let eqMarkers = [];
  let eqID = earthquakeData.features.map((feature) => feature.id);

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
  for (let i = 0; i < earthquakeData.features.length; i++) {
    const feature = earthquakeData.features[i];
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

  // Fetch tectonic plates data from the provided URL using D3
  d3.json(platesURL).then(function(platesData) {
    // Create a GeoJSON layer for the tectonic plates data
    let tectonicPlates = L.geoJSON(platesData, {
      style: function(feature) {
        return {
          color: "orange",
          weight: 2
        };
      }
    });

    // Create overlay maps for earthquake markers and tectonic plates
    let overlayMaps = {
      "Earthquakes": epicenter,
      "Tectonic Plates": tectonicPlates
    };

    // Create the map and set the initial view
    let myMap = L.map("map", {
      center: [coordinates[0].latitude, coordinates[0].longitude],
      zoom: mapZoomLevel,
      layers: [satellite, epicenter,tectonicPlates]
    });

    // Add layer control to switch between base maps and overlay maps
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // Create a legend control
    let legend = L.control({ position: "bottomright" });

    // Add legend details
    legend.onAdd = function(map) {
      let div = L.DomUtil.create("div", "info legend");

      let grades = [-10, 10, 30, 50, 70];
      let colors = ["#A9F36A", "yellow", "#FFB83D", "#FF6105", "red"];

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
          + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    // Add the legend control to the map
    legend.addTo(myMap);
  })
  .catch((error) => {
    console.log("An error occurred while fetching the tectonic plates data:", error);
  });

})
.catch((error) => {
  console.log("An error occurred while fetching the earthquake data:", error);
});
