import * as L from 'https://unpkg.com/leaflet/dist/leaflet-src.esm.js';

const accessToken = 'pk.eyJ1Ijoic29uZzk0MCIsImEiOiJja2tudHpyMGgxYWx3MnBxdG9kYWZqdXhzIn0.GXhDbENbTMseuTT5QdoA9Q';

class Leaflet extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: `open` });
    shadowRoot.innerHTML = `
      <style>
        @import url("https://unpkg.com/leaflet/dist/leaflet.css");
        :host {
          display: block;
        }
        .leaflet-container {
          width: 100%;
          height: 100%;
        }
      </style>
      <div></div>
   `;
    const dom = shadowRoot.querySelector('div');
    this.map = L.map(dom, {
      center: [51.505, -0.09],
      zoom: 13
    });
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      accessToken,
    }).addTo(this.map);
  }
  flyTo(coords, zoom) {
    const { latitude, longitude } = coords;
    this.map.flyTo([latitude, longitude], zoom);
  }
}

customElements.define('x-leaflet', Leaflet);