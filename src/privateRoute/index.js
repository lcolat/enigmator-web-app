import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import HeaderDrawer from '../components/header-drawer'
import useStyles from './style'
const PrivateRoute = ({
	component: Component,
	userService,
	enigmaService,
	redirect: pathname,
	isValid,
	valid,
	history,
	...rest
}) => {
	const classes = useStyles()
	return (
		<Route
			{...rest}
			render={props =>
				userService.isLogin() && valid ? (
					<>
						<HeaderDrawer
							{...props}
							userService={userService}
							enigmaService={enigmaService}
							isValid={isValid}
						/>
						<main>
							<div className={classes.toolbar} />
							<Grid
								className={classes.content}
								id="domain"
								container
								direction={'column'}
								justify={'space-around'}>
								<Component.type
									{...rest}
									{...props}
									userService={userService}
								/>
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
