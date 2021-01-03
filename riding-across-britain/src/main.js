const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const { bounds } = require("./lib/stops");

const data = require("./lib/route.json");

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
                "text-offset": [0, 1.25],
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
            bounds: bounds,
            style: "mapbox://styles/mapbox/dark-v10"
        });

        drawRoute(map);
    }
})();
