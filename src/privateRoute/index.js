import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Header from '../components/header'
import UserService from '../services/userService'
const userService = UserService.getInstance()
const PrivateRoute = ({
	component: Component,
	redirect: pathname,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props =>
				userService.isLogin ? (
					<>
						<Header />
						<Component {...rest} {...props} />
					</>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	)
}
export default PrivateRoute
