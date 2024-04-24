// searchAccommodation.js
//Task 4 - Write a HTML page which allows users to search for all accommodations in a givven location
import React from "react";
import "./searchAccommodation.css";

//function to search for accommodation
function SearchAccomm() {
    //Creating empty state properties so they can be populated later on
    const [currentAccomm, setCurrentAccomm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [newAccID, setNewAccID] = React.useState([]);

    //Mapping to display the list of all accommodations in the database which meet the conditions
    const allAccommodations = searchResults.map(accommodation => {
        //Task 5 - Create a book button for each result 
        return <li key={accommodation.id}>
            Name: {accommodation.name} <br></br>
            Type: {accommodation.type} <br></br>
            Location {accommodation.location} <br></br>
            Latitude: {accommodation.latitude} <br></br>
            Longitude: {accommodation.longitude} <br></br>
            <button id="bookAccommButton" onClick={bookAccomm}> Book It!</button>
            <br></br>
        </li>;

        async function bookAccomm() {
            
            const deatilsToBook = {
                "accID": `${setNewAccID(accommodation.id)}`,
                "thedate": 240601,
                "npeople": 1
            };
            document.getElementById("bookAccommButton").addEventListener('click', async () => {
                const response2 = await fetch('http://localhost:3000/placestostay/accommodation/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deatilsToBook)
                });
            })
        }
    });

    //Returning the JSX with inline styles 
    return (<div className="searchDiv">
        <p>Please enter the location you would like to search for:</p>
        <button onClick={updateLocationName}>Update Location Name</button>
        <input placeholder="Location Name..." id="location" />
        <p>After changing the location name , please click the "update accommodation name" button!</p>
        <p id='currentLocation' > Current Location:{currentAccomm}</p>
        <br></br>
        <button onClick={displayAllLocation} >Search</button>
        <br></br>
        <h2>Results</h2>
        <div id='locationSearchResults'>
            {allAccommodations}
        </div>
        <br></br>
    </div>)

    //nested function to update the state of the current accommodation displayed
    function updateLocationName() {
        setCurrentAccomm(document.getElementById('location').value);
    }
    //nested asyncronus functuon to send a AJAX search request to web API and update the search results
    async function displayAllLocation() {
        const response = await fetch(`http://localhost:3000/placestostay/accommodation/${currentAccomm}`)
        const allAccommodations = await response.json();
        console.log(JSON.stringify(allAccommodations))
        setSearchResults(allAccommodations)
    }

}
//exporting the function 
export default SearchAccomm