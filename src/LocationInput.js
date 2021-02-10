import React, { useEffect, useState } from 'react';
import './LocationInput.css';

function LocationInput() {
  return (
    <div className="container-inputs">
        <form>
            <div className="container-input">
                <label id='label-lat'className="label-input" for="lat">LATITUDE</label>
                    <input required className="input-box" type='number' id='lat' name="lat" 
                        min="-90"max="90"placeholder="-89.23419" step='0.000000000000000001'></input>
            </div>
            <div className="container-input">
                <label id='label-long'className="label-input" for="long">LONGITUDE</label>
                <input required className="input-box" type='number' id='long' name="long" 
                    min="-180"max="180"placeholder="22.97414"step='0.000000000000000001'></input>
            </div>
        </form>
    </div>
  );
}

export default LocationInput;
