const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const { bounds } = require("./lib/stops");

const data = require("./lib/route.json");
const state = { activeId: "full" };
const days = data.data.features.filter((feature) => feature.geometry.type === "LineString");

const titleToId = title => parseInt(title.replace(/Day /, "")) - 1;

function setMode(map, dark = true)
{
    const theme = dark ? "dark-v10" : "light-v10";
    map.setStyle(`mapbox://styles/mapbox/${theme}`);
}

function matchModeToUserPreference(map)
{
    if (window.matchMedia)
    {
        if (window.matchMedia("(prefers-color-scheme: light)").matches)
            setMode(map, false);

        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", event =>
        {
            if (event.matches)
                setMode(map, false);
            else
                setMode(map, true);
        });
    }
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
            },
            filter: ["==", "$type", "LineString"]
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
            id: "labels",
            type: "symbol",
            source: "route",
            layout:
            {
                // get the title name from the source's "title" property
                "text-field": ["get", "title"],
                "text-font": [
                    "DIN Pro Bold",
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold",
                ],
                "text-letter-spacing": 0.05,
                "text-transform": "uppercase",
                "text-anchor": "right",
                "text-offset": [-1, 0],

            },
            paint: {
                "text-color": "yellow",
                "text-halo-color": "rgba(0,0,0,0.3)",
                "text-halo-width": 1,
                "text-halo-blur": 2.5,
            },
            filter: ["==", "$type", "Point"]
        });
        map.addLayer({
            id: "points",
            type: "circle",
            source: "route",
            layout:
            {
            },
            paint: {
                "circle-color": "yellow",
                "circle-radius": 3,
            },
            filter: ["==", "$type", "Point"]
        });
    });
}

function setActive(id)
{
    const results = document.querySelectorAll("nav li.active");
    results.forEach(result => result.classList.remove("active"));

    const activeFeature = document.getElementById(id);
    activeFeature.classList.add("active");
}

function navigateToFeature(map, feature)
{
    const { properties } = feature;
    const bounds = typeof properties.bounds === "string" ? JSON.parse(properties.bounds) : properties.bounds;
    const id = titleToId(properties.title);

    state.activeId = id;

    map.fitBounds(bounds, {
        padding: 20
    });

    setActive(id);
}

(() =>
{
    mapboxgl.accessToken = "pk.eyJ1IjoicG91d2Vya2VyayIsImEiOiJjaXFqZWxkZGIwOXRoZnRuZTJ0M2hocTVrIn0.p-TeDs92ZEJ5QtaHtYH2Og";

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10"
    });

    matchModeToUserPreference(map);
    navigateToFull(map);
    drawRoute(map);

    function featureFromId(id)
    {
        return days[id];
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
    const prevButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const fullButton = document.getElementById("full");

    function navigateToFull(map)
    {
        setActive("full");
        map.fitBounds(bounds, { padding: 20 });
    }

    fullButton.onclick = (e) => {
        e.preventDefault();
        navigateToFull(map);
    };

    prevButton.onclick = (e) =>
    {
        e.preventDefault();
        if (state.activeId === 0)
        {
            state.activeId = "full";
            return navigateToFull(map);
        }

        if (state.activeId === "full")
            state.activeId = days.length - 1;
        else if (state.activeId > 0)
            state.activeId--;

        const feature = featureFromId(parseInt(state.activeId));
        navigateToFeature(map, feature);
    };

    nextButton.onclick = (e) =>
    {
        e.preventDefault();
        if (state.activeId === days.length - 1)
        {
            state.activeId = "full";
            return navigateToFull(map);
        }

        if (state.activeId === "full")
            state.activeId = 0;
        else if (state.activeId <= days.length - 1)
            state.activeId++;

        const feature = featureFromId(parseInt(state.activeId));
        navigateToFeature(map, feature);
    };

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

    days.map((feature, i) =>
    {
        addListItem(ul, i, feature.properties.title, "day");
    });
})();
