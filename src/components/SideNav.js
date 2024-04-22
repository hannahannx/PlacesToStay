import React from "react";

function SideNav(){
    return(
        <div id="sideNav" className="sideNav">
            <a href="javascript:void(0)" className="closeNav" onClick={closeNavBar}>"&times;</a>
            <a href="#"> Home </a>
            <a href="#"> Login </a>
            <a href="#"> Book Accomodation </a>

            <span onClick={openNavBar}>&#9776;</span>
        </div>
    )
    function closeNavBar(){
        document.getElementById("sideNav").style.display = "block";
    }

    function openNavBar(){
        document.getElementById("sideNav").style.display = "none";
    }
}

export default SideNav