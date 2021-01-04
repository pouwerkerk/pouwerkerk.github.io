const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const { bounds } = require("./lib/stops");

const data = require("./lib/route.json");

const titleToId = title => parseInt(title.replace(/Day /, "")) - 1;

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
            navigateToFeature(map, e.features[0]);
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

function navigateToFeature(map, feature)
{
    const { properties } = feature;
    const bounds = typeof properties.bounds === "string" ? JSON.parse(properties.bounds) : properties.bounds;
    const id = titleToId(properties.title);

    map.fitBounds(bounds, {
        padding: 20
    });

    const results = document.querySelectorAll("nav li.active");
    results.forEach(result => result.classList.remove("active"));

    const activeFeature = document.getElementById(id);
    activeFeature.classList.add("active");
}

(() =>
{
    mapboxgl.accessToken = "pk.eyJ1IjoicG91d2Vya2VyayIsImEiOiJjaXFqZWxkZGIwOXRoZnRuZTJ0M2hocTVrIn0.p-TeDs92ZEJ5QtaHtYH2Og";

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10"
    });

    map.fitBounds(bounds, { padding: 20 });

    drawRoute(map);

    function featureFromId(id)
    {
        return data.data.features[id];
    }

    function linkHandler(e)
    {
        e.preventDefault();
        const target = e.path.find(el => el.id);
        const id = target.id;
        const feature = featureFromId(parseInt(id));
        navigateToFeature(map, feature);
    }

    const ul = document.getElementById("main");
    const nextButton = document.getElementById("next");

    function addListItem(ul, id, text, type)
    {
        const li = document.createElement("li");
        const a = document.createElement("a");

        if (type === "day")
        {
            const daySpan = document.createElement("span");
            daySpan.innerText = "Day ";
            daySpan.classList.add("expanded");
            a.innerText = titleToId(text) + 1;
            a.prepend(daySpan);
        }
        else
            a.innerText = text;

        a.href = "#";
        a.onclick = linkHandler;
        li.appendChild(a);
        li.id = id;
        ul.insertBefore(li, nextButton);
    }

    data.data.features.map((feature, i) =>
    {
        addListItem(ul, i, feature.properties.title, "day");
    });
})();
