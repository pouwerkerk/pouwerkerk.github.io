const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const { bounds } = require("./lib/stops");

const data = require("./lib/route.json");

function getBoundingBox(feature)
{
    const { coordinates } = feature.geometry;
    return coordinates.reduce(function (bounds, coord)
    {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
}

function drawRoute(map)
{
    map.on("load", () =>
    {
        map.addSource("route", data);
        map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout:
            {
                "line-join": "round",
                "line-cap": "round"
            },
            paint:
            {
                "line-color": "#fff",
                "line-width": 5,
                "line-opacity": 0.75
            }
        });

        map.on("click", "route", function (e)
        {
            const bounds = getBoundingBox(e.features[0]);
            map.fitBounds(bounds, {
                padding: 20
            });
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on("mouseenter", "route", () =>
        {
            map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "route", () =>
        {
            map.getCanvas().style.cursor = "";
        });

        map.addLayer({
            id: "points",
            type: "symbol",
            source: "route",
            layout:
            {
                // get the title name from the source's "title" property
                "text-field": ["get", "title"],
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-transform": "uppercase",
                "text-anchor": "center"
            }
        });
    });
}

(() =>
{
    const wrapper = document.createElement("div");
    wrapper.id = "map";
    document.body.appendChild(wrapper);
    if (wrapper)
    {
        mapboxgl.accessToken = "pk.eyJ1IjoicG91d2Vya2VyayIsImEiOiJjaXFqZWxkZGIwOXRoZnRuZTJ0M2hocTVrIn0.p-TeDs92ZEJ5QtaHtYH2Og";

        const map = new mapboxgl.Map({
            container: wrapper.id,
            style: "mapbox://styles/mapbox/dark-v10"
        });

        map.fitBounds(bounds, { padding: 20 });

        drawRoute(map);
    }
})();
