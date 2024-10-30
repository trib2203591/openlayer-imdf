import GeoJSON from "ol/format/GeoJSON";

class IMDFGeoJSON extends GeoJSON {
        constructor(options) {
            console.log('IMDFGeoJSON constructor called with options:', options);
            super(options);
        }
        
    readFeatures(object, opt_options) {
      const features = super.readFeatures(object, opt_options);
  
      // Manually add `feature_type` to each feature if it exists in the GeoJSON
      object.features.forEach((geojsonFeature, index) => {
        if (geojsonFeature.feature_type) {
          features[index].set('feature_type', geojsonFeature.feature_type);
        }
      });
      return features;
    }
  }

  export default IMDFGeoJSON;