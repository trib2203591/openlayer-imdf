import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector.js';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Icon } from 'ol/style.js';
import { Fill, Stroke, Style } from 'ol/style';
import OSM from 'ol/source/OSM';

import { room } from "./features/unit";
import IMDFGeoJSON from './custom/IMDFGeoJSON';

const geojsonFeature = {
  "type": "FeatureCollection", "features": [
    {
      "id": "11111111-1111-1111-1111-111111111112",
      "type": "Feature",
      "feature_type": "anchor",
      "geometry": {
        "type": "Point",
        "coordinates": [
          11774144.287902, 1122409.9996554
        ]
      },
      "properties": {
        "address_id": "11111111-1111-1111-1111-111111111111",
        "unit_id": "11111111-1111-1111-1111-111111111111"
      }
    }
  ], "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG:4326" } },
};


const vectorSource = new VectorSource({
  features: new IMDFGeoJSON().readFeatures(geojsonFeature, {
    featureProjection: 'EPSG:4326' // Ensure the coordinates are in the correct projection
  }),
});
  vectorSource.forEachFeature(function (feature) {
      console.log(feature.get('feature_type'));
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

const global = {
  selectedFeature: null,

  room: room,

  anchors: anchors,

  map: null
};

global.map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    global.room,
    global.anchors
  ],
  target: 'map',
  view: new View({
    center: [11774144.287902, 1122409.9996554],
    zoom: 20
  })
});

export { global };