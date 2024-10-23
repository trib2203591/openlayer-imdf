import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON.js';

export const roomGEOJSON = new VectorSource({
    url: 'http://127.0.0.1:8000/api/units',
    format: new GeoJSON(),
  });

export const room = new VectorLayer({
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
