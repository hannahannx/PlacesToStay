// searchAccommodation.js

import React from "react";

function SearchAccomm(){

    const [currentAccomm,setCurrentAccomm] = React.useState("");
    const [searchResults,setSearchResults] = React.useState([]);


    const allAccommodations = searchResults.map (accommodation =>
        <p style= {{backgroundColor: '#7D869C',color: '#E5E8B6',textAlign:"center"}} key={accommodation.id}>
        Name: {accommodation.name} <br></br>
        Type: {accommodation.type} <br></br>
        Location {accommodation.location} <br></br>
        Latitude: {accommodation.latitude} <br></br>
        Longitude: {accommodation.longitude} <br></br>
        </p>
        );

    return  <div style = {{backgroundColor:'#586994',textAlign:"center"}}>
                <h1 style= {{color: '#E5E8B6',textAlign:"center"}}>Places to Stay</h1>
                <p style={{color:'#B4C4AE'}}>Please enter the location you would like to search for:</p>
                <input type="button" value='Update Accommodation Name' onClick={updateAccommName}/>
                <input placeholder="Location Name..." id="location"/>
                <div style={{color: '#A2ABAB'}}>{currentAccomm}</div>
                <br></br>
                <input type="button" value='Search' onClick={displayAllLocation}/>
                <br></br>
                <br></br>
                <h2 style= {{color: '#E5E8B6',textAlign:"center" }} >Results</h2>
                <div id='locationSearchResults'>
                    
                        {allAccommodations}
                    
                </div>
                <br></br>
            </div>

function updateAccommName(){
    setCurrentAccomm(document.getElementById('location').value);
}
    
async function displayAllLocation(){
    
    const response = await fetch (`http://localhost:3000/placestostay/accommodation/${currentAccomm}`)
    const allAccommodations = await response.json();
    console.log(JSON.stringify(allAccommodations))
    setSearchResults(allAccommodations)
}           
}

export default SearchAccomm