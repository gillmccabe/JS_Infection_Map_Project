var Map = require('../models/map');
var Diseases = require('../models/diseases');

var UI = function() {  
  var container = document.getElementById('map');
  var center = {lat: 42.384902, lng: 11.918695};
  this.diseases = new Diseases();
  var map = new Map(container, center, 1);
  map.googleMap.setZoom(2);

  // this.getDisease(this.diseases, map);
  this.selectDropdown(map);
}

UI.prototype = {
  selectDropdown: function (map) {
    var select = document.querySelector('select');
    select.onchange = function() {
      var value = (select.selectedIndex);
          console.log(value);
      this.handleSelectChanged(event, this.diseases, map, value, select);
    }.bind(this)  
  },
  handleSelectChanged: function(event, diseases, map, value, select) {
    map.deleteMarkers();
    var option = select.options[value].value;
    console.log(option);
    for(disease of diseases) {
      if(option === disease.name) {
        console.log(disease)
        var diseasio = [disease];
        this.getDisease(diseasio, map)
      }
    } 
  },
  createMarker: function(country, map, disease) {
    console.log(disease);
      map.addMarker(country, map, disease);
  },
  getDisease: function(disease, map) {
    console.log(disease);
    for(diseasio of disease) {
      console.log(diseasio)
      this.getCountry(diseasio, map);
    }
  },
  getCountry: function(disease, map) {
    var countries = disease.nineteenthCentury;
    console.log(disease)
    for(country of countries) {
      this.createMarker(country, map, disease);
    }
  }
}

module.exports = UI;