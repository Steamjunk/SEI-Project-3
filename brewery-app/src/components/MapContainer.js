import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Styled from 'styled-components';

import MapModal from "./MapModal";
import axios from "axios";

require('dotenv').config();

const StyledMap = Styled.div`
  height: 70vh;
  width: 50%;
  border: solid brown 20px;
  border-radius: 10px;
`

const ResultPin = ({brewery}) => <MapModal brewery={brewery} />;
 
const MapContainer = (props) => {
  console.log(props.searchResults)
  
  const calcCenter = (set, type) => {
    if(set.length === 1 && set[0]!== " "){
      return set[0]
    }
    // todo: check with town of one
    if(set.length > 1) {
      if(set[1]==="" || set[1]===" ") {
        set.shift();
      }
      return set.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / set.length;
    } else {
      if(type === "lat") {
        return mapData.default.lat;
      } else if(type === "lng") {
        return mapData.default.lng;
      }
    }
  }

  const [mapData, setMapData] = useState({
    center: {
      lat: 41.559,
      lng: -90.483,
    },
    zoom: 11,
    default: {
      lat: 41.559,
      lng: -90.483,
      zoom: 11
    },
    activeLats: [],
    activeLngs: []
  })

  const [varData, setVarData] = useState({
    data: []
  })

   async function getCoords(geocodeURL) {
    let data = await axios.get(geocodeURL)
      .then (resp => {
        setVarData({
          data: resp.data.results[0]
        })
        console.log()
      })
      return data
      }

  // Setting map center based on center of results, will only change on newSet of results
  useEffect(() => {
    async function getCoords(geocodeURL, brew) {
      await axios.get(geocodeURL)
      .then(resp => {
        console.log(resp)
        brew.latitude = resp.data.results[0].geometry.location.lat;
        brew.longitude = resp.data.results[0].geometry.location.lng;
        mapData.activeLats.push(brew.latitude);
        mapData.activeLngs.push(brew.longitude);
      })}

    {props.searchResults.map((brew) => {
      if(brew.latitude) {
        mapData.activeLats.push(brew.latitude);
        mapData.activeLngs.push(brew.longitude);
      } else {
        let geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?"
        let street = brew.street;
        street = street.split(" Ste")[0];
        let address = `${street}, ${brew.city}, ${brew.state}`;
        address = address.split(" ").join("+")
        geocodeURL = `${geocodeURL}address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        console.log(geocodeURL)
        getCoords(geocodeURL, brew);
        
        
        // brew.latitude = varData.data.geometry.location.lat;
        // brew.longitude = varData.data.geometry.location.lng;
        // mapData.activeLats.push(brew.latitude);
        // mapData.activeLngs.push(brew.longitude);
      }
    })}

    
    setMapData({
      center: {
        lat: calcCenter(mapData.activeLats, "lat"),
        lng: calcCenter(mapData.activeLngs, "lng")
      },
      zoom: 11,
      default: { /*set Map center to users local default center*/
        lat: 41.559,
        lng: -90.483,
        zoom: 11
      },
      activeLats: [],
      activeLngs: []
    })
    console.log([calcCenter(mapData.activeLats, "lat"), calcCenter(mapData.activeLngs, "lng")])

  }, [props.searchResults])
  

  
  

  return (
    
    
    <StyledMap>
      <GoogleMapReact 
        // todo look into other parameters to use
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={mapData.center}
        zoom={mapData.zoom}
      >
        {props.searchResults.map((brew, index) => {
           return (
            <ResultPin
              lat={parseFloat(brew.latitude)}
              lng={parseFloat(brew.longitude)}
              brewery={brew}
            />
            )
        })}
       
      </GoogleMapReact>
    </StyledMap>
  );
}
 
export default MapContainer;