import React from "react";
import "leaflet";
import allAccommodations from "./searchAccommodation";

function Map({ lat1, lon1 }) {
    const map = React.useRef(null);
    const [lat, setLat] = React.useState(lat1 || 51.05);
    const [lon, setLon] = React.useState(lon1 || -0.72);

    React.useEffect(() => {
        // As effect will run only once, there is no need to check if map.current is null
        map.current = L.map("map1");
        // Set the map up in the normal way
        L.tileLayer
            ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                { attribution: "Copyright OSM contributors, ODBL" }).addTo(map.current);
        const pos = [lat, lon];
        map.current.setView(pos, 15);
        // Handle the map moveend event by updating the state appropriately
        map.current.on("moveend", e => {
            const centre = map.current.getCenter();
            setLat(centre.lat);
            setLon(centre.lng);
        });
    }, []);


    return (
        <div className="mainContentDiv">
            <input id='lat' placeholder="Latitude..." />
            <input id='lon' placeholder="Longitude..." />
            <input type='button' value='go' onClick={setPos} />
            <p>Map centred at: {lat} {lon}</p>
            <div id="map1" style={{ height: "500px", alignItems: "center", justifyContent: "center" }}></div>
        </div>
    );

    //for each item which is on the search accom list, place a marker with the infomation for that positon on the map

    function setPos() {
        const lt = document.getElementById('lat').value;
        const lng = document.getElementById('lon').value;
        setLat(lt);
        setLon(lng);
        map.current.setView([lt, lng], 14);
        const marker = L.marker([lt,lng]).addTo(map.current);
        marker.bindPopup(`Latitude : ${lt} Longitude : ${lng} `);
    }
}

export default Map