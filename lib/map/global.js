import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Icon } from 'ol/style.js';
import { Style} from 'ol/style';

import { room } from "./features/unit";

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
      featureProjection: 'EPSG:4326' // Ensure the coordinates are in the correct projection
    }),
  });
  vectorSource.getFeatures().forEach(function(feature) {
    console.log(vectorSource.getFeatures());

    const featureProps = feature.getProperties();
    // const featureType = feature.feature_type || 'unknown';  // Retrieve feature_type from GeoJSON properties
    // feature.set('feature_type', featureType); // Manually set the `feature_type` property
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

export const global = {
    selectedFeature: null,
  
    room : room,

    anchors : anchors,
  
    map : null
  };