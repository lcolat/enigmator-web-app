import styled from 'styled-components';
import SideNav, {
	Toggle,
	Nav,
	NavItem,
	NavIcon,
	NavText
} from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

// SideNav
const StyledSideNav = styled(SideNav)`
	background-color: #ae75e9;
	border-right: 1px solid #ddd;
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
	background-color: #ae75e9;
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
	// Only for sidebar where section are storage
	background-color: #ae75e9;
	&&[class*="expanded--"] {
		[class*="sidenav-subnav--"] {
			> [class*="sidenav-subnavitem--"],
			> [class*="sidenav-subnavitem--"]:hover {
				> [class*="navitem--"] {
					color: #fff;
				}
			}
			> [class*="sidenav-subnavitem--"]:hover {
				> [class*="navitem--"] {
					background-color: #eee;
				}
			}
			> [class*="sidenav-subnavitem--"][class*="selected--"] {
				> [class*="navitem--"] {
					color: #3c3842;
				}
				
				> [class*="navitem--"]::before {
					border-left: 2px solid #403b20;
				}
			}
		}
	}
	&& > [class*="sidenav-navitem--"] {
		> [class*="navitem--"] {
			background-color: inherit;
			color: #222;
		}
	}
	// When hover a section
	&& > [class*="sidenav-navitem--"]:hover {
		> [class*="navitem--"] {
			background-color: rgba(255,253,241,0.31);
		}
	}
	&& > [class*="sidenav-navitem--"],
	&& > [class*="sidenav-navitem--"]:hover {
		> [class*="navitem--"] {
			// Section Icon & text
			[class*="navtext--"],
			[class*="navicon--"] {
				&, > * {
					color: #322b3d;
				}
			}
			[class*="sidenav-nav-text--"] {
				&, > * {
					color: #222;
				}
			}
		}
	}
	&& > [class*="sidenav-navitem--"][class*="highlighted--"],
	&& > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
		// If a selected section is hover ...
		/*> [class*="navitem--"]:hover {
			//background-color: #b488e9;
			// Color of name & icon when focus
			[class*="navicon--"],
			[class*="navtext--"] {
				&, > * {
					color: #fff;
				}
			}
			[class*="sidenav-nav-text--"] {
				font-weight: 700;
			}
		}*/
		> [class*="navitem--"] {
			//background-color: #b488e9;
			// Color of name & icon when focus
			[class*="navicon--"] {
				border-left: 6px solid #401b7f;
			}
			[class*="navicon--"],
			[class*="navtext--"] {
				&, > * {
					color: #000;
					font-weight: bold;
				}
			}
			[class*="sidenav-nav-text--"] {
				font-weight: 700;
			}
		}
	}
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
	&&&:hover {
		[class*="navtext--"] {
			color: #222;
		}
	}
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
	color: #222;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
	color: #222;
`;
StyledNavText.defaultProps = NavText.defaultProps;


export {
	StyledToggle as Toggle,
	StyledNav as Nav,
	StyledNavItem as NavItem,
	StyledNavIcon as NavIcon,
	StyledNavText as NavText
};
export default StyledSideNav;