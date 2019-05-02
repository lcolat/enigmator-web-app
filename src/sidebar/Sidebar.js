import React, {Component} from 'react';
import './Sidebar.css';
import arrow_right from "./arrow_right.png";
import arrow_left from "./arrow_left.png";

//https://codepen.io/CybMeta/pen/yyOLVz
//https://codepen.io/rusaidmrd/pen/xdEZya
//https://fontawesome.com/icons/

function Sidebar() {
    return (
        <div className="sidebar">
            <script defer src="https://use.fontawesome.com/releases/v5.8.1/js/all.js"
                    integrity="sha384-g5uSoOSBd7KkhAMlnQILrecXvzst9TdC09/VM+pjDTCM+1il8RHz5fKANTFFb+gQ"
                    crossOrigin="anonymous">
            </script>
            <img src={arrow_left} alt={"<<"}/>
            <ul>
                <li>
                    <a href={"#home"}><i className={"far fa-address-card"}/>Home</a>
                </li>
                <li>
                    <a href={"#profile"}>Profile</a>
                </li>
                <li>
                    <a href={"#friends"}>Friends</a>
                </li>
                <li>
                    <a href={"#enigmas"}>Enigmas</a>
                </li>
                <li>
                    <a href={"#create_enigma"}>Create</a>
                </li>
                <li>
                    <a href={"#rank"}>Rank</a>
                </li>
                <li>
                    <a href={"#forum"}>Forum</a>
                </li>
                <li>
                    <a href={"#rgpd"}>RGPD</a>
                </li>
                <li>
                    <a href={"#settings"}>Settings</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;