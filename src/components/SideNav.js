import React from "react";

function SideNav(){
    return(
        <div id="sideNav" class="sideNav">
            <a href="javascript:void(0)" class="closeNav" onClick={closeNavBar}>"&times;</a>
            <a href="#"> Home </a>
            <a href="#"> Home </a>
            <a href="#"> Home </a>

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