import React, { PureComponent } from 'react'
import {
	Home,
	AccountBox,
	Contacts,
	ImageSearch,
	AddBox,
	Stars,
	Forum,
	Info,
	Tune
} from '@material-ui/icons'
import MaterialDrawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'

class Drawer extends PureComponent {
	render() {
		const menuItems = [
			{
				text: 'Home',
				icon: <Home fontSize={'large'} />
			},
			{
				text: 'Profile',
				icon: <AccountBox fontSize={'large'} />
			},
			{
				text: 'Friends',
				icon: <Contacts fontSize={'large'} />
			},
			{
				text: 'Enigmas',
				icon: <ImageSearch fontSize={'large'} />
			},
			{
				text: 'Create',
				icon: <AddBox fontSize={'large'} />
			},
			{
				text: 'Rank',
				icon: <Stars fontSize={'large'} />
			},
			{
				text: 'Forum',
				icon: <Forum fontSize={'large'} />
			},
			{
				text: 'RGPD',
				icon: <Info fontSize={'large'} />
			},
			{
				text: 'Settings',
				icon: <Tune fontSize={'large'} />
			}
		]
		const { classes, handleDrawer, open } = this.props
		return (
			<MaterialDrawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
				anchor={'left'}
				open={open}
				onClose={handleDrawer}>
				<div className={classes.toolbar} />
				<List color="primary">
					{menuItems.map((item, index) => (
						<ListItem button key={index}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</MaterialDrawer>
		)
	}
}

export default Drawer
