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
import clsx from 'clsx'

class Drawer extends PureComponent {
	render() {
		const menuItems = [
			{
				text: 'Home',
				icon: <Home fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/'
					})
				}
			},
			{
				text: 'Profile',
				icon: <AccountBox fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/profile'
					})
				}
			},
			{
				text: 'Friends',
				icon: <Contacts fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/friends'
					})
				}
			},
			{
				text: 'Enigmas',
				icon: <ImageSearch fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/enigmas'
					})
				}
			},
			{
				text: 'Create',
				icon: <AddBox fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/create-enigmas'
					})
				}
			},
			{
				text: 'Rank',
				icon: <Stars fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/rank'
					})
				}
			},
			{
				text: 'Forum',
				icon: <Forum fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/forum'
					})
				}
			},
			{
				text: 'Settings',
				icon: <Tune fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/settings'
					})
				}
			},
			{
				text: 'RGPD',
				icon: <Info fontSize={'large'} />,
				handleClick: () => {
					this.props.history.push({
						pathname: '/rgpd'
					})
				}
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
						<ListItem button key={index} onClick={item.handleClick}>
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
