import React, { Component } from 'react';
import SearchAccomm from './searchAccommodation';
import Footer from './Footer';
import Header from './Header';
import SideNav from './SideNav';
import "./AppComponent.css";
import Map from './MapWithMarker';

//using lifting up state 
function AppComponent() {

    return (
        <main>
            <>
                <Header />
                {/* <SideNav/> */}
                <SearchAccomm />
                <Map/>
                <Footer />
            </>

            {/* use if statements to display certain sections of the page () for example when a session based system is there.  */}
        </main>
    )
}

export default AppComponent;