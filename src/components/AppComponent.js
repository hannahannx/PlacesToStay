import React, { Component } from 'react';
import SearchAccomm from './searchAccommodation';
import Footer from './Footer';
import Header from './Header';
import "./AppComponent.css";
import Map from './MapWithMarker';
import LoginUser from './loginUser';

//using lifting up state 
function AppComponent() {

    return (
            <>
                <Header />
                <LoginUser />
                <SearchAccomm />
                <Map/>
                <Footer />   
                {/* use if statements to display certain sections of the page () for example when a session based system is there.  */}
            </>
    )
}

export default AppComponent;