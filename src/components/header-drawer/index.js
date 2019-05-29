import React from 'react'
import Header from './header'
import Drawer from './drawer'
import useStyles from './style'

export default function HeaderDrawer() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	function handleDrawer() {
		setOpen(!open)
	}
	return (
		<>
			<Header classes={classes} handleDrawer={handleDrawer} open={open} />
			<Drawer classes={classes} open={open} handleDrawer={handleDrawer} />
		</>
	)
}
