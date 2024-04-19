import React, { Component } from 'react';
import SearchAccomm from './searchAccommodation';
import Footer from './Footer';
import Header from './Header';
import "./AppComponent.css"
import SideNav from './SideNav';


//using lifting up state 
function AppComponent(){

    return(
        <main class="main">
            <>
            <Header/>
            <SideNav/>
            <SearchAccomm/>
            <Footer/>
            </>
            
        </main>
    )
}

export default AppComponent