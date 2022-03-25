import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LocationSection.css';
import LocationInput from './LocationInput';
import Results from './Results';

function LocationSection() {

  var mapboxToken = 'pk.eyJ1Ijoic2V0aHBvbHkiLCJhIjoiY2trdHQ0bHN3MG05YjJ2bjB2YTNxNjZtaSJ9.MF6KudPJKru_AzDXo_q0Gg';
  var myMap = null; // map reference

  // Reference to input tags
  var labelLat = document.getElementById('label-lat');
  var labelLong = document.getElementById('label-long');

  // Keep track of validation of user input
  const [validation, setValidation] = useState(true);

  // When the validation bool changes, run this script to change the style of 
  // input elements
  useEffect(  () => {
    changeInputStyle();
  }, [validation]);


  // Ask user's location permission and get location
  function getLocation(){
    console.log('Getting location...');
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(populateFields); // Fill fields
         // navigator.geolocation.getCurrentPosition(checkWater);
      } else {
          console.log('Geolocation is not supported by this browser.');
      }
  }

  function changeInputStyle(){
    if(validation){ // Change input elements back to normal
      console.log('Validation(1): ' + validation);
      document.getElementById('lat').style.background = '#fff';
      document.getElementById('long').style.background = '#fff';

    } else{ // Change input elements to red/errors
      console.log('Validation(2): ' + validation);
    }
  }

  // Validate the input fields 
  //@return bool if successful validation
  function validateFields(){
    var lat = document.getElementById('lat').value;
    var long = document.getElementById('long').value;

    if(!lat.match(/^-?\d+\.?\d+$/)){ // Fail
      setValidation(false);
      document.getElementById('lat').style.background = '#f09797';
    }if(!long.match(/^-?\d+\.?\d+$/)){ // Fail
      document.getElementById('long').style.background = '#f09797';
      setValidation(false);
    }if(!lat.match(/^-?\d+\.\d+$/) || !long.match(/^-?\d+\.\d+$/)){
      return false;
    }
    else{ // Success
      setValidation(true);
      return true;
    }
    
  }

  // User clicks 'submit coord' -> Data validation, check water API
  function submitCoordinates(){
    refreshMap();

    // Validate data
    if(validateFields()){
      var lat = document.getElementById('lat').value;
      var long = document.getElementById('long').value;
      checkWater(lat, long);
    }
  }

  // Populates the input fields with user's coords
  function populateFields(position){
    console.log('Populating fields..');
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    document.getElementById('lat').value = lat;
    document.getElementById('long').value = long;
  }

  // Init the leaflet map using user given params
  function initMap(long, lat){

    //refreshMap();

    var L = window.L;
    myMap = L.map('mapid').setView([lat,long],14); 

    console.log(myMap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      touchExtend: false,
      accessToken: mapboxToken
  }).addTo(myMap);

    var marker = L.marker([lat,long]).addTo(myMap);
  }

  function checkWater(lat, long){
    console.log('Checking water...');
    fetch('https://api.onwater.io/api/v1/results/' + lat + ',' + long +
   '?access_token=zSg2H86PvCAQMFKzLDXG')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.water);
    // Hide input element
    hideElement("input-box");
    setResult(data.water);
  });

  initMap(long, lat);
}

function refreshMap(){

  if(myMap != undefined || myMap != null){
    console.log('Refreshing the map...');
    myMap.off();
    myMap.remove();
  }
}

function setResult(result) {


  var detailedResult = "";
  if(result) {
    detailedResult = "You are on water.";
  } else {
    detailedResult = "You are not on water.";
  }
  document.getElementById('result').innerHTML = detailedResult;
}

function hideElement(elementId) {
  var element = document.getElementById(elementId);
  if(element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none"
  }
}
  

  return (
    <div>
      <div id="input-box">
        <LocationInput/>
        <div className="button-container">
          <button id="btn-findme" onClick={getLocation} ><span class='icon'>
          </span></button>
          <button id="btn-manual" onClick={submitCoordinates} className="btn-location">Submit coordinates</button>
        </div>
      </div>
        <div id="result-container">
          <h1 id="result"></h1>
          <div id="mapid"></div>
        </div>
    </div>
  );
}

export default LocationSection;
