import React from "react";

import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from "./style/StyledSidebarComponents";

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
            <Toggle/>
            <Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <FontAwesomeIcon icon={"home"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <FontAwesomeIcon icon={"address-card"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="friend">
                    <NavIcon>
                        <FontAwesomeIcon icon={"user-friends"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Friend
                    </NavText>
                </NavItem>
                <NavItem eventKey="enigmas">
                    <NavIcon>
                        <FontAwesomeIcon icon={"puzzle-piece"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Enigmas
                    </NavText>
                </NavItem>
                <NavItem eventKey="create_enigma">
                    <NavIcon>
                        <FontAwesomeIcon icon={"plus-square"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Create
                    </NavText>
                </NavItem>
                <NavItem eventKey="rank">
                    <NavIcon>
                        <FontAwesomeIcon icon={"crown"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Rank
                    </NavText>
                </NavItem>
                <NavItem eventKey="forum">
                    <NavIcon>
                        <FontAwesomeIcon icon={"comments"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Forum
                    </NavText>
                </NavItem>
                <NavItem eventKey="rgpd">
                    <NavIcon>
                        <FontAwesomeIcon icon={"info-circle"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        RGPD
                    </NavText>
                </NavItem>
                <NavItem eventKey="settings">
                    <NavIcon>
                        <FontAwesomeIcon icon={"sliders-h"} size={"lg"}/>
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                </NavItem>
            </Nav>
        </SideNav>
    );
}