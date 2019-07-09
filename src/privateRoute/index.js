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
	history,
	...rest
}) => {
	const classes = useStyles()
	return (
		<Route
			{...rest}
			render={props =>
				userService.isLogin() ? (
					<>
						<HeaderDrawer
							{...props}
							userService={userService}
							enigmaService={enigmaService}
						/>
						<main>
							<div className={classes.toolbar} />
							<Grid
								className={classes.content}
								container
								direction={'column'}
								justify={'space-around'}
								spacing={2}>
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
