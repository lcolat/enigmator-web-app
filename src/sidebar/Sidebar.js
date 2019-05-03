import React from 'react';
import './Sidebar.css';

import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
    faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
    faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH);

class SideBarState {

    sideBarCollapsed;

    constructor() {
        this.sideBarCollapsed = false;
    }

    changeState() {
        this.sideBarCollapsed = !this.sideBarCollapsed;
    }
}

let sideBarState = new SideBarState();

function Sidebar() {
    return (
        <div className="sidebar">
            <button className="moveSideBarButton" onClick={sideBarState.changeState()}>
                <FontAwesomeIcon className={"MoveSideBar"} icon={"angle-double-left"} color={"purple"} size={"lg"}/>
            </button>
            <table>
                <tbody>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"home"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#home"}>Home</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"address-card"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#profile"}>Profile</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"user-friends"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#friends"}>Friends</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"puzzle-piece"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#enigmas"}>Enigmas</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"plus-square"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#create_enigma"}>Create</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"crown"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#rank"}>Rank</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"comments"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#forum"}>Forum</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"info-circle"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#rgpd"}>RGPD</a>
                    </td>
                    }
                </tr>
                <tr>
                    <td className="icon">
                        <FontAwesomeIcon icon={"sliders-h"} color={"purple"} size={"lg"}/>
                    </td>
                    {sideBarState.sideBarCollapsed &&
                    <td className="section">
                        <a href={"#settings"}>Settings</a>
                    </td>
                    }
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Sidebar;