import { ready } from 'https://lsong.org/scripts/dom.js';
import { requestLocation } from 'https://lsong.org/scripts/location.js';

ready(async () => {
  const loc = await requestLocation();
  const maps = document.querySelector('x-leaflet');
  maps.flyTo(loc.coords, 13);
});