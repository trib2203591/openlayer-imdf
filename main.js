import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { global } from './lib/map/global';
import { filterRoomsByFloor } from './lib/map/fillterRoom';
import {highlightFeature} from './lib/map/onClick/hightLight';
import {roomGEOJSON} from './lib/map/features/unit';

import './style.css'
import { toggleSidePanel } from './lib/map/onClick/sidePanel';
/* const vectorLayer = new VectorLayer({
  source: new VectorSource({
    url: 'https://geoserver.ctu.edu.vn/geoserver/ctu/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ctu%3Acantho_university_units&maxFeatures=50&outputFormat=application%2Fjson',
    format: new GeoJSON(),
*/

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
  toggleSidePanel(evt);
});

//floor change
floorSelector.addEventListener('change', function (event) {
  const selectedFloor = String(event.target.value);
  filterRoomsByFloor(selectedFloor);
});

