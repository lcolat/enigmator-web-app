import React, { Component } from 'react'
import Home from '@material-ui/icons/Home'
import AccountBox from '@material-ui/icons/AccountBox'
import Contacts from '@material-ui/icons/Contacts'
import ImageSearch from '@material-ui/icons/ImageSearch'
import AddBox from '@material-ui/icons/AddBox'
import Stars from '@material-ui/icons/Stars'
import Forum from '@material-ui/icons/Forum'
import Info from '@material-ui/icons/Info'
import Tune from '@material-ui/icons/Tune'
import EventAvailable from '@material-ui/icons/EventAvailable'
import MaterialDrawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import clsx from 'clsx'

class Drawer extends Component {
	state = {
		menuItems: [
			{
				text: 'Accueil',
				icon: <Home fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/'
					})
				}
			},
			{
				text: 'Profile',
				icon: <AccountBox fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/profile'
					})
				}
			},
			{
				text: 'Amis',
				icon: <Contacts fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/friends'
					})
				}
			},
			{
				text: 'Enigmes',
				icon: <ImageSearch fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/enigmas'
					})
				}
			},
			{
				text: 'Créer',
				icon: <AddBox fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/create-enigmas'
					})
				}
			},
			// {
			// 	text: 'Rang',
			// 	icon: <Stars fontSize={'large'} />,
			// 	handleClick: () => {
			// 		this.props.isValid()
			// 		this.haveValidation()
			// 		this.props.history.push({
			// 			pathname: '/rank'
			// 		})
			// 	}
			// },
			{
				text: 'Forum',
				icon: <Forum fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/forums'
					})
				}
			},
			// {
			// 	text: 'Réglages',
			// 	icon: <Tune fontSize={'large'} />,
			// 	handleClick: () => {
			// 		this.props.isValid()
			// 		this.haveValidation()
			// 		this.props.history.push({
			// 			pathname: '/settings'
			// 		})
			// 	}
			// },
			{
				text: 'RGPD',
				icon: <Info fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/privacy-policy'
					})
				}
			}
		]
	}
	containsValidation = menuItems => {
		let res = false
		menuItems.forEach(item => {
			if (item.text === 'Validation') {
				res = true
			}
		})
		return res
	}
	haveValidation = async () => {
		const isValidator = await this.props.userService.isValidator
		const haveUnvalidatedEnigma = await this.props.enigmaService.haveWaitingValidation()
		if (
			isValidator === true &&
			haveUnvalidatedEnigma === true &&
			!this.containsValidation(this.state.menuItems)
		) {
			let newMenuItems = this.state.menuItems
			newMenuItems.splice(1, 0, {
				text: 'Validation',
				icon: <EventAvailable color="primary" fontSize={'large'} />,
				handleClick: () => {
					this.props.isValid()
					this.haveValidation()
					this.props.history.push({
						pathname: '/validation'
					})
				}
			})
			this.setState({
				menuItems: newMenuItems
			})
		}
	}
	async componentDidMount() {
		this.haveValidation()
	}
	render() {
		const { menuItems } = this.state
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
