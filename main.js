import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Icon } from 'ol/style.js';
import { Fill, Stroke, Style} from 'ol/style';
import OSM from 'ol/source/OSM';

//import { global } from './lib/map/global';
import { filterRoomsByFloor } from './lib/map/fillterRoom';
import {highlightFeature} from './lib/map/onClick/hightLight';

import './style.css'
import { toggleSidePanel } from './lib/map/onClick/sidePanel';
/* const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ctu%3Acantho_university_units&maxFeatures=50&outputFormat=application%2Fjson',
    format: new GeoJSON(),
  }),
  style: {
    'fill-color': 'red',
    'stroke-color' : 'black',
    'stroke-width' : 1.0,
  },
}); */
const geojsonFeature = {
  "type": "FeatureCollection", "features": [
    {
      "id": "11111111-1111-1111-1111-111111111112",
      "type": "Feature",
      "feature_type": "anchor",
      "geometry": {
        "type": "Point",
        "coordinates": [
          11774144.287902,1122409.9996554
        ]
      },
      "properties": {
        "address_id": "11111111-1111-1111-1111-111111111111",
        "unit_id": "11111111-1111-1111-1111-111111111111"
      }
    }
  ], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::404000" } }
};


const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonFeature, {
    featureProjection: 'EPSG:3857' // Ensure the coordinates are in the correct projection
  }),
});
vectorSource.getFeatures().forEach(function(feature) {
  const featureProps = feature.getProperties();
  const featureType = featureProps.feature_type || 'unknown';  // Retrieve feature_type from GeoJSON properties
  console.log(featureType);
  feature.set('feature_type', featureType); // Manually set the `feature_type` property
  console.log('Feature Type:', feature.get('feature_type'));
});


const anchors = new VectorLayer({
  source: vectorSource,
  style: new Style({
    image: new Icon({
      crossOrigin: 'anonymous',
      scale: 0.05,
      src: './eye.svg',
    }),
  })
});

const roomGEOJSON = new VectorSource({
  url: 'http://127.0.0.1:8000/api/units',
  format: new GeoJSON(),
});

const room = new VectorLayer({
  source: roomGEOJSON,
  style: new Style({
    fill: new Fill({
      color: 'rgba(80,180,250,0.5)',
    }),
    stroke: new Stroke({
      color: 'gray',
      width: 2,
    })
  })
});




export const global = {
  selectedFeature: null,

  room : room,

  map : new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      room,
      anchors,
    ],
    target: 'map',
    view: new View({
      center: [11774159.39, 1122409.36],
      zoom: 20,
    }),
  }),


};

export const Panel = {
  sidePanel : document.getElementById('side-panel'),
  sidePanelContent : document.getElementById('side-panel-content'),
  closeBtn : document.getElementById('close-btn')
};
const floorSelector = document.getElementById('floor-select');


//side panel close button
Panel.closeBtn.onclick = function () {
  Panel.sidePanel.style.left = '-300px';
};

//click events
global.map.on('click', function (evt) {
  highlightFeature(evt);
  toggleSidePanel(evt, anchors);
});

//floor change
floorSelector.addEventListener('change', function (event) {
  const selectedFloor = String(event.target.value);
  filterRoomsByFloor(selectedFloor, roomGEOJSON);
});

