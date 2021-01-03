// src: https://www.rideacrossbritain.com/app/uploads/2019/06/national-map-stages-01.jpeg
const R = require("ramda");

const stops = [
    {
        city: "Land's End",
        page: "https://en.wikipedia.org/wiki/Land%27s_End",
        lat: 50.0686111,
        lon: -5.7161111,
    },
    {
        city: "Okehampton",
        page: "https://en.wikipedia.org/wiki/Okehampton",
        lat: 50.7388,
        lon: -4.0041,
        route: "https://goo.gl/maps/kui649PF6TszCGQg7",
    },
    {
        city: "Bath", // Bath, Somerset
        page: "https://en.wikipedia.org/wiki/Bath,_Somerset",
        lat: 51.38,
        lon: -2.36,
        route: "https://goo.gl/maps/tCJtAnJKgGb11jpAA",
    },
    {
        city: "Ludlow",
        page: "https://en.wikipedia.org/wiki/Ludlow",
        lat: 52.368,
        lon: -2.718,
        route: "https://goo.gl/maps/uxbodAYDLv8Szts6A"
    },
    {
        city: "Haydock",
        page: "https://en.wikipedia.org/wiki/Haydock",
        lat: 53.4678,
        lon: -2.6609,
        route: "https://goo.gl/maps/9vDQSkXkRsdStBHx7",
    },
    {
        city: "Carlisle",
        page: "https://en.wikipedia.org/wiki/Carlisle",
        lat: 54.891,
        lon: -2.944,
        route: "https://goo.gl/maps/J1DfkoHcWyyBGnKt8",
    },
    {
        city: "Hopetoun House",
        page: "https://en.wikipedia.org/wiki/Hopetoun_House",
        lat: 55.9954,
        lon: -3.4629,
        route: "https://goo.gl/maps/n7FJ3Rpwm8YiveUf7",
    },
    {
        city: "Strathdon",
        page: "https://en.wikipedia.org/wiki/Strathdon",
        lat: 57.199569,
        lon: -3.075739,
        route: "https://goo.gl/maps/GjMe9EvV6qtuSf8N8",
    },
    {
        city: "Kyle of Sutherland",
        page: "https://en.wikipedia.org/wiki/Kyle_of_Sutherland",
        lat: 57.925,
        lon: -4.4,
        route: "https://goo.gl/maps/zgELskz5pSiA8hL1A",
    },
    {
        city: "John o' Groats",
        page: "https://en.wikipedia.org/wiki/John_o%27_Groats",
        lat: 58.64,
        lon: -3.07,
        route: "https://goo.gl/maps/1v3KhaPdMov4K5Wf8",
    }
];

let N = stops[0].lat;
let E = stops[0].lon;
let S = stops[0].lat;
let W = stops[0].lon;
const coordinates = [];

R.map(({ lat, lon }) => {
    if (lat > N)
        N = lat;
    if (lat < S)
        S = lat;
    if (lon > E)
        E = lon;
    if (lon < W)
        W = lon;
    coordinates.push([lon, lat]);
}, stops);

const bounds = [W - 0.1, S - 0.1, E + 0.1, N + 0.1];

module.exports = {
    stops,
    bounds,
    coordinates,
};
