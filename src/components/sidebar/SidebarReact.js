import React from "react";

import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from "./style/StyledSidebarComponents";

import {Home, AccountBox, Contacts, ImageSearch, AddBox, Stars, Forum, Info, Tune} from '@material-ui/icons';


// import {library} from "@fortawesome/fontawesome-svg-core";
// import {
//     faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
//     faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH
// } from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// library.add(faAngleDoubleLeft, faHome, faAddressCard, faUserFriends, faPuzzlePiece,
//     faPlusSquare, faUserPlus, faCrown, faComments, faInfoCircle, faSlidersH);


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
                        <Home fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"home"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <AccountBox fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"address-card"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="friend">
                    <NavIcon>
                        <Contacts fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"user-friends"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Friend
                    </NavText>
                </NavItem>
                <NavItem eventKey="enigmas">
                    <NavIcon>
                        <ImageSearch fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"puzzle-piece"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Enigmas
                    </NavText>
                </NavItem>
                <NavItem eventKey="create_enigma">
                    <NavIcon>
                        <AddBox fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"plus-square"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Create
                    </NavText>
                </NavItem>
                <NavItem eventKey="rank">
                    <NavIcon>
                        <Stars fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"crown"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Rank
                    </NavText>
                </NavItem>
                <NavItem eventKey="forum">
                    <NavIcon>
                        <Forum fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"comments"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Forum
                    </NavText>
                </NavItem>
                <NavItem eventKey="rgpd">
                    <NavIcon>
                        <Info fontSize={"large"}/>
                        {/*<FontAwesomeIcon icon={"info-circle"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        RGPD
                    </NavText>
                </NavItem>
                <NavItem eventKey="settings">
                    <NavIcon>
                        <Tune fontSize={"large"} alignmentBaseline={"middle"}/>
                        {/*<FontAwesomeIcon icon={"sliders-h"} size={"lg"}/>*/}
                    </NavIcon>
                    <NavText>
                        Settings
                    </NavText>
                </NavItem>
            </Nav>
        </SideNav>
    );
}