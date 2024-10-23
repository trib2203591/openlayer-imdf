import { Fill, Stroke, Style} from 'ol/style';

//import { global } from '../global';
import { global } from '../../../main';


const highlightStyle = new Style({
    stroke: new Stroke({
      color: 'gray',
      width: 5,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.5)',
    }),
  });

export function highlightFeature(evt) {
    if (global.selectedFeature) {
      global.selectedFeature.setStyle(undefined);  // This is allowed
    }

    global.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      if (String(feature.getGeometry().getType()) === "Polygon") {
        global.selectedFeature = feature;  // Updating property is allowed
        feature.setStyle(highlightStyle);
      }
      return true;
    });
}