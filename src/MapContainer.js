import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import data from './store_directory.json';

export default class MapContainer extends Component {

    state = {
        locations: [
            { name: "Red Barn Stores 3858-CUAJIMALPA", location: { lat: 40.7143033, lng: -74.0036919 }, address: "JOSE MA. CASTORENA NO. 84  COL. SAN JOSE DE LOS CEDROS, DELEGACION CUAJIMALPA   MEXICO D.F. C.P. 05210" },
            { name: "Queens County Supreme Court", location: { lat: 19.356827, lng: -99.184726 } },
            { name: "Kings County Supreme Court", location: { lat: 40.6940226, lng: -73.9890967 } },
            { name: "Richmond County Supreme Court", location: { lat: 40.6412336, lng: -74.0768597 } },
            { name: "Bronx Supreme Court", location: { lat: 40.8262388, lng: -73.9235238 } }
        ]
    }


    componentDidUpdate() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: { lat: 19.373029, lng: -99.144993 },
                zoom: 12,
                mapTypeId: 'roadmap'
            })

            const losdatos = JSON.stringify(data);

            console.log(data);
            //console.log(losdatos);
            //console.log(JSON.parse(losdatos));
            console.log(losdatos);

            const infowindow = new google.maps.InfoWindow();
            const geocoder = new google.maps.Geocoder();
            this.map = new maps.Map(node, mapConfig);
            this.service = new google.maps.places.PlacesService(this.map);
            this.state.locations.forEach(location => {
                
                const marker = new google.maps.Marker({
                    position: location.location,
                    map: this.map,
                    title: location.name
                });
                google.maps.event.addListener(marker, 'click', function() {
                    console.log('hola');
                    infowindow.setContent('<div><strong>' + location.name + '</strong><br>' +
                        'Place ID: ' + location.name + '<br>' +
                        location.name + '</div>');
                    infowindow.open(this.map, this);
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
          <div ref="map" style = { style } >loading map... </div>
        )
    }
}