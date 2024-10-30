import VectorSource from 'ol/source/Vector';
import { global } from './global';
import { roomGEOJSON } from './features/unit';

export function filterRoomsByFloor(floor) {
    let filteredRooms = [];
  
    roomGEOJSON.forEachFeature(function (feature) {
      if (String(feature.get('level_id')) === String(floor)) {
        filteredRooms.push(feature);
      }
    });
  
    let filteredSource = new VectorSource({
      features: filteredRooms
    });
    global.room.setSource(filteredSource);
    return true;
  }