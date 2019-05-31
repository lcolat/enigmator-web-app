import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import UserService from '../services/userService'
import HeaderDrawer from '../components/header-drawer'
import useStyles from './style'
const userService = UserService.getInstance()
const PrivateRoute = ({
	component: Component,
	redirect: pathname,
	...rest
}) => {
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
							<Grid
								className={classes.content}
								container
								direction={'column'}
								justify={'space-around'}
								spacing={2}>
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
