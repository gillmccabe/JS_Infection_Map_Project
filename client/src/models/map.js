var markers = [];

// keep outside of constructor to only display one infowindow at a time
var infowindow = null;


var Map = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
      center: coords, 
      zoom: zoom,
      disableDefaultUI: true
  });
}


Map.prototype = {

  getContentString: function(disease, country) {
    var i = this.getRandomFact(disease.facts);
    var contentString = '<div id="infoWindowStyles">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="heading">'+ disease.name + '</h1>'+
      '<h3 id="subHeading">' + country.name + '</h3>' +
      '<h3 id="subHeading">' + "Infection Rate: " + country.mortality.toUpperCase() + '</h3>' +
      '<div id="bodyContent">' + disease.facts[i].comment + '</div>' 
      // +
      // '<img id="infoWindowImage" src="' + disease.facts[i].image + '"/>';
    return contentString;
  },

  getRandomFact: function(facts){
    return Math.floor((Math.random() * 5));
  },

  addMarker: function(country, map, disease) {
    var contentio = this.getContentString(disease, country)
    
    var customIcon = {
      url: setIcon(disease.name),
      // TODO: update when century becomes selectable
      scaledSize: setIconSize(country.mortality)
    };
    var marker = new google.maps.Marker({
      position: country.coords,
      map: this.googleMap,
      icon: customIcon
    });
    markers.push(marker);
    marker.addListener('click', function() {
      if (infowindow) {
        infowindow.close();
      }
      infowindow = new google.maps.InfoWindow({
        content: contentio,
        disableAutoPan: true
      });
      var center = {lat: 42.384902, lng: 11.918695};
      this.googleMap.setCenter(center);
      infowindow.open(map, marker);
    }.bind(this));
  },

  setMapOnAll: function(map) {
    for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  },

  clearMarkers: function() {
    this.setMapOnAll(null);
  },

  deleteMarkers: function() {
    this.clearMarkers();
    markers = [];
  }
}


function setIcon(diseaseName){
  switch(diseaseName.toLowerCase()){
    case "tuberculosis": 
      return "http://www.clker.com/cliparts/q/I/Q/u/Z/1/marker-hi.png";
      break;
    case "smallpox": 
      return "http://www.pd4pic.com/images/landmark-map-marker-green-location-google-maps.png";
      break;
    case "hiv/aids": 
      return "http://www.clker.com/cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png";
      break;
    case "zika": 
      return "http://www.clker.com/cliparts/I/l/L/S/W/9/map-marker.svg";
      break;
    default:
      return null;
      break; 
  }
}


function setIconSize(mortality){
  console.log(mortality.toLowerCase());
  switch(mortality){
    case "low": 
      return new google.maps.Size(12, 22);
    case "medium": 
      return new google.maps.Size(22, 32);
    case "high": 
      return new google.maps.Size(32, 42);
    default: 
      return new google.maps.Size(22, 32);
      break;
  }
}


module.exports = Map;