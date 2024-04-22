import React, { Component } from 'react';
import SearchAccomm from './searchAccommodation';
import Footer from './Footer';
import Header from './Header';
import SideNav from './SideNav';
import "./AppComponent.css";
import BookAccomm from './bookAccommodation';

//using lifting up state 
function AppComponent(){

    return(
        <main className="main">
            <>
            <Header/>
            <SideNav/>
            <SearchAccomm/>
            <BookAccomm/>
            <Footer/>
            </>
            
        </main>
    )
}

export default AppComponent;