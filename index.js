import * as L from 'https://unpkg.com/leaflet/dist/leaflet-src.esm.js';
import { requestLocation } from 'https://lsong.org/scripts/location.js';

const mymap = L.map('map');

const accessToken = 'pk.eyJ1Ijoic29uZzk0MCIsImEiOiJja2tudHpyMGgxYWx3MnBxdG9kYWZqdXhzIn0.GXhDbENbTMseuTT5QdoA9Q';

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  accessToken,
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.setView([51.5, -0.09], 13);

mymap.on('click', onMapClick);

(async () => {
  const loc = await requestLocation();
  console.log(loc);
  const { latitude, longitude } = loc.coords;
  mymap.flyTo([latitude, longitude], 13);
})();