import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserService from '../services/userService'
import HeaderDrawer from '../components/header-drawer'
const userService = UserService.getInstance()
const PrivateRoute = ({
	component: Component,
	redirect: pathname,
	...rest
}) => {
	const useStyles = makeStyles(theme => ({
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar
		}
	}))
	const classes = useStyles()
	return (
		<Route
			{...rest}
			render={props =>
				userService.isLogin ? (
					<>
						<HeaderDrawer />
						<main>
							<div className={classes.toolbar} />
							<Grid container direction={'column'} justify={'space-around'}>
								<Component {...rest} {...props} />
							</Grid>
						</main>
					</>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	)
}
export default PrivateRoute
