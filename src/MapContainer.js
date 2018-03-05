import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {

    state = {
        locations: [
          { name: "New York County Supreme Court", location: {lat: 40.7143033, lng: -74.0036919} },
          { name: "Queens County Supreme Court", location: {lat: 40.7046946, lng: -73.8091145} },
          { name: "Kings County Supreme Court", location: {lat: 40.6940226, lng: -73.9890967} },
          { name: "Richmond County Supreme Court", location: {lat: 40.6412336, lng: -74.0768597} },
          { name: "Bronx Supreme Court", location: {lat: 40.8262388, lng: -73.9235238} }
        ]
    }

    customData = require('./store_directory.json');

  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 19.373029, lng: -99.144993},
        zoom: 12,
        mapTypeId: 'roadmap'
      })

      this.map = new maps.Map(node, mapConfig);
      this.infowindow = new google.maps.InfoWindow();
      this.service = new google.maps.places.PlacesService(this.map);

      this.state.locations.forEach( location => {
        const marker = new google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: this.map,
          title: location.name
        });
        google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.setContent('<div><strong>' + location.name + '</strong><br>' +
              'Place ID: ' + location.name + '<br>' +
              location.name + '</div>');
            this.infowindowinfowindow.open(this.map, this);
          });
    })

    }
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}