// searchAccommodation.js
//Task 4 - Write a HTML page which allows users to search for all accommodations in a givven location
import React from "react";

//function to search for accommodation
function SearchAccomm(){
    //Creating empty state properties so they can be populated later on
    const [currentAccomm,setCurrentAccomm] = React.useState("");
    const [searchResults,setSearchResults] = React.useState([]);

    //Mapping to display the list of all accommodations in the database which meet the conditions
    const allAccommodations = searchResults.map (accommodation =>
        //Task 5 - Create a book button for each result 
        <li style= {{backgroundColor: '#7D869C',color: '#E5E8B6',textAlign:"center"}} key={accommodation.id}>
        Name: {accommodation.name} <br></br>
        Type: {accommodation.type} <br></br>
        Location {accommodation.location} <br></br>
        Latitude: {accommodation.latitude} <br></br>
        Longitude: {accommodation.longitude} <br></br>
        <br></br>
        </li>
        );

    //Returning the JSX with inline styles 
    return  <div style = {{backgroundColor:'#586994',textAlign:"center"}}>
                <h1 style= {{color: '#E5E8B6',textAlign:"center"}}>Places to Stay</h1>
                <p style={{color:'#B4C4AE'}}>Please enter the location you would like to search for:</p>
                <input type="button" value='Update Accommodation Name' onClick={updateAccommName}/>
                <input placeholder="Location Name..." id="location"/>
                <p style={{color:'#B4C4AE'}}>After changing the location name , please click the "update accommodation name" button!</p>
                <br></br>
                <div style={{color: '#A2ABAB'}}> Current Location: {currentAccomm}<br></br></div>
                <br></br>
                <input type="button" value='Search' onClick={displayAllLocation}/>
                <br></br>
                <br></br>
                <h2 style= {{color: '#E5E8B6',textAlign:"center" }} >Results</h2>
                <div id='locationSearchResults'>                    
                        {allAccommodations}    
                </div>
                /* Map for the elements */
                <br></br>
            </div>

//nested function to update the state of the current accommodation displayed
function updateAccommName(){
    setCurrentAccomm(document.getElementById('location').value);
}
//nested asyncronus functuon to send a AJAX search request to web API and update the search results
async function displayAllLocation(){
    const response = await fetch (`http://localhost:3000/placestostay/accommodation/${currentAccomm}`)
    const allAccommodations = await response.json();
    console.log(JSON.stringify(allAccommodations))
    setSearchResults(allAccommodations)
}           
}

//exporting the function 
export default SearchAccomm