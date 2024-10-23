
//import { global } from "../global";
import { Panel, global } from "../../../main";

export function toggleSidePanel(evt, anchors) {
    let foundFeature = null;
    global.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
      if (layer === global.anchors) {
        // Handle icon click
        foundFeature = feature;
        return true; // Stop checking other layers
      }
      if (layer === global.room) {
        // Handle room click
        foundFeature = feature;
      }
    })
        
  
        if (foundFeature) {
          var panelContent;
          console.log(foundFeature.getProperties());
          if (String(foundFeature.getGeometry().getType()) === "Point") {
            console.log(foundFeature.get('id'));
            panelContent = '<h3>aaa</h3>';
          }
          else if (String(foundFeature.getGeometry().getType()) === "Polygon") {
            panelContent = '<h3>' + foundFeature.get('name').vi + '</h3>';
            panelContent += '<p>Category: ' + foundFeature.get('category') + '</p>';
            panelContent += '<p>Level ID: ' + foundFeature.get('level_id') + '</p>';
            panelContent += '<p>Geometry Type: ' + foundFeature.getGeometry().getType() + '</p>';
            panelContent += '<p>Coordinates: ' + JSON.stringify(foundFeature.getGeometry().getCoordinates()) + '</p>';
          }
  
          Panel.sidePanelContent.innerHTML = panelContent;
          Panel.sidePanel.style.left = '0px';
        } else {
          Panel.sidePanel.style.left = '-300px';
        }
        return;
}