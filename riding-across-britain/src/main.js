const styles = require("./static/styles.css");
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

(() => {
    const wrapper = document.createElement("div");
    wrapper.id = "map";
    document.body.appendChild(wrapper);
    if (wrapper)
    {
        mapboxgl.accessToken = 'pk.eyJ1IjoicG91d2Vya2VyayIsImEiOiJjaXFqZWxkZGIwOXRoZnRuZTJ0M2hocTVrIn0.p-TeDs92ZEJ5QtaHtYH2Og';

        const map = new mapboxgl.Map({
            container: wrapper.id,
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }
})();
