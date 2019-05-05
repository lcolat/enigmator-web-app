import React from "react";
import Sidebar from "react-sidebar";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
    faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
    faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH);

export default function SidebarReact() {
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <FontAwesomeIcon icon={"home"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <FontAwesomeIcon icon={"address-card"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="friend">
                    <NavIcon>
                        <FontAwesomeIcon icon={"user-friends"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Friend
                    </NavText>
                </NavItem>
                <NavItem eventKey="enigmas">
                    <NavIcon>
                        <FontAwesomeIcon icon={"puzzle-piece"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Enigmas
                    </NavText>
                </NavItem>
                <NavItem eventKey="create_enigma">
                    <NavIcon>
                        <FontAwesomeIcon icon={"plus-square"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Create
                    </NavText>
                </NavItem>
                <NavItem eventKey="rank">
                    <NavIcon>
                        <FontAwesomeIcon icon={"crown"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Rank
                    </NavText>
                </NavItem>
                <NavItem eventKey="forum">
                    <NavIcon>
                        <FontAwesomeIcon icon={"comments"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Forum
                    </NavText>
                </NavItem>
                <NavItem eventKey="rgpd">
                    <NavIcon>
                        <FontAwesomeIcon icon={"info-circle"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        RGPD
                    </NavText>
                </NavItem>
                <NavItem eventKey="settings">
                    <NavIcon>
                        <FontAwesomeIcon icon={"sliders-h"} color={"purple"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}