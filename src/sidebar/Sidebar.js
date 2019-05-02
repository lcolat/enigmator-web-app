import React, {Component} from 'react';
import './Sidebar.css';
import arrow_right from "./arrow_right.png";
import arrow_left from "./arrow_left.png";

function Sidebar() {
    return (
        <div className="sidebar">
            <img src={arrow_left} alt={"<<"}/>
            <ul>
                <li>
                    <a href={"#home"}>Home</a>
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