import React, { PureComponent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'

class Header extends PureComponent {
	render() {
		const { classes, handleDrawer, open } = this.props
		return (
			<AppBar
				position="fixed"
				color="primary"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawer}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open
						})}>
						{!open ? <MenuIcon /> : <ClearIcon />}
					</IconButton>
					<Typography variant="h6" color="inherit">
						Enigmator
					</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Header
