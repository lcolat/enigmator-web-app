import React, { PureComponent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import ExitIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

class Header extends PureComponent {
	state = {
		userService: this.props.userService
	}
	handleLogout = async () => {
		const res = await this.state.userService.logout()
		if (res === true) {
			this.props.history.push({
				pathname: '/login'
			})
			createNotification({
				level: Level.SUCCESS,
				message: 'Vous avez bien été déconnecté'
			})
		} else {
			createNotification({
				level: Level.ERROR,
				message: res
			})
		}
	}
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
					<Typography variant="h6" color="inherit" className={classes.title}>
						Enigmator
					</Typography>
					<IconButton
						color="inherit"
						aria-label="Logout user"
						onClick={this.handleLogout}
						edge="end"
						className={classes.logout}>
						<ExitIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Header
