//index.js 

//imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchAccomm from './components/searchAccommodation';
import AppComponent from './components/AppComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppComponent></AppComponent>);


//You would only want to render one function - which would be your app Component - you can create this later on