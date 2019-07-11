import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import style from './style'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

class Authentication extends Component {
	state = {
		email: {
			value: '',
			error: false,
			helperText: ''
		},
		password: {
			value: '',
			error: false,
			helperText: ''
		}
	}
	validateForm = () => {
		let isValid = true
		Object.keys(this.state).forEach(key => {
			if (this.state[key].value === '') {
				let newValue = this.state[key]
				newValue.error = true
				newValue.helperText = 'Veuillez remplir ce champ'
				this.setState({ [key]: newValue })
				isValid = false
			} else {
				isValid = true
			}
		})
		return isValid
	}
	handleConnection = async () => {
		if (this.validateForm()) {
			const res = await this.props.userService.authenticate(
				this.state.email.value,
				this.state.password.value
			)
			if (res === true) {
				this.props.setValid(true)
				this.props.history.push({
					pathname: '/'
				})
			} else {
				createNotification({
					level: Level.ERROR,
					message: res
				})
			}
		}
	}

	handleLogUp = () => {
		this.props.history.push({
			pathname: '/logup'
		})
	}

	handleChange = event => {
		const { name, value } = event.target
		let newValue = this.state[name]
		newValue.value = value
		this.setState({ [name]: newValue })
	}

	render() {
		const classes = this.props.classes
		document.body.style.backgroundColor = '#ae75e9'
		return (
			<Grid container direction={'column'} justify={'center'}>
				<div className="main" style={{ background: '#ae75e9' }}>
					<Grid item xs>
						<img
							className={classes.enigmatorLogo}
							alt="Enigmator"
							src={process.env.PUBLIC_URL + '/img/logo_long.png'}
						/>
					</Grid>
					<Grid
						className={classes.content}
						container
						direction={'column'}
						justify={'center'}>
						<Grid item xs>
							<TextField
								className={classes.email}
								id="email"
								name="email"
								label="Email"
								placeholder="Saisissez votre email"
								margin="normal"
								required={true}
								helperText={this.state.email.helperText}
								error={this.state.email.error}
								value={this.state.email.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								className={classes.password}
								id="password"
								name="password"
								label="Mot de passe"
								type="password"
								placeholder="Saisissez votre mot de passe"
								margin="normal"
								required={true}
								helperText={this.state.password.helperText}
								error={this.state.password.error}
								value={this.state.password.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<div className="forgottenPassword">
								<RouterLink to="/forgotten-password">
									Mot de passe oublié :(?
								</RouterLink>
							</div>
						</Grid>
						<Grid item xs>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.handleConnection}>
								Connexion
							</Button>
						</Grid>
						<Grid item xs>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.handleLogUp}>
								Inscription
							</Button>
						</Grid>
					</Grid>
				</div>
			</Grid>
		)
	}
}

export default withStyles(style, { withTheme: true })(Authentication)
