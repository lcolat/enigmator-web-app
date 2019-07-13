import React from 'react'
import Header from './header'
import Drawer from './drawer'
import useStyles from './style'
import { useTheme } from '@material-ui/styles'
export default function HeaderDrawer(props) {
	const theme = useTheme()
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	function handleDrawer() {
		if (open === false) {
			document.getElementById('domain').setAttribute(
				'style',
				`width :calc(100vw - 160px);
					transition: ${theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen
					})};`
			)
		} else {
			document.getElementById('domain').setAttribute(
				'style',
				`width :calc(100vw - ${theme.spacing(9) + 1}px);
					transition:${theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen
					})};`
			)
		}
		setOpen(!open)
	}
	return (
		<>
			<Header
				{...props}
				classes={classes}
				handleDrawer={handleDrawer}
				open={open}
			/>
			<Drawer
				{...props}
				classes={classes}
				open={open}
				handleDrawer={handleDrawer}
			/>
		</>
	)
}
