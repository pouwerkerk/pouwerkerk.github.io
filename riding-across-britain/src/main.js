const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const { coordinates, bounds } = require("./lib/stops");
const R = require("ramda");

function drawRoute(map)
{
    map.on('load', function ()
    {
        map.addSource('route',
        {
            'type': 'geojson',
            'data':
            {
                'type': 'Feature',
                'properties': {},
                'geometry':
                {
                    'type': 'LineString',
                    coordinates
                }
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout':
            {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint':
            {
                'line-color': '#888',
                'line-width': 8
            }
        });
    });
}

(() => {
    const wrapper = document.createElement("div");
    wrapper.id = "map";
    document.body.appendChild(wrapper);
    if (wrapper)
    {
        mapboxgl.accessToken = 'pk.eyJ1IjoicG91d2Vya2VyayIsImEiOiJjaXFqZWxkZGIwOXRoZnRuZTJ0M2hocTVrIn0.p-TeDs92ZEJ5QtaHtYH2Og';

        const map = new mapboxgl.Map({
            container: wrapper.id,
            bounds: bounds,
            style: 'mapbox://styles/mapbox/streets-v11'
        });

        drawRoute(map);
    }
})();
