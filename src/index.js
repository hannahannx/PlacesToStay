//index.js 

//imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchAccomm from './components/searchAccommodation';
//import BookAccomm from './components/bookAccommodation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SearchAccomm></SearchAccomm>);
//root.render(<BookAccomm></BookAccomm>);


//You would only want to render one function - which would be your app Component - you can create this later on