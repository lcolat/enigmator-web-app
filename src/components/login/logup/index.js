import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import style from './style'
import Loader from 'components/loader'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
class LogUp extends Component {
	state = {
		username: {
			value: '',
			error: false,
			helperText: ''
		},
		firstname: {
			value: '',
			error: false,
			helperText: ''
		},
		lastname: {
			value: '',
			error: false,
			helperText: ''
		},
		country: {
			value: '',
			error: false,
			helperText: ''
		},
		email: {
			value: '',
			error: false,
			helperText: ''
		},
		birthdate: {
			value: '',
			error: false,
			helperText: ''
		},
		password: {
			value: '',
			error: false,
			helperText: ''
		},
		passwordConfirmation: {
			value: '',
			error: false,
			helperText: ''
		},
		loaded: true
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
		return isValid && this.validatePassword()
	}
	validatePassword = () => {
		if (this.state.password.value !== this.state.passwordConfirmation.value) {
			let newPassword = this.state.password
			newPassword.error = true
			newPassword.helperText = 'Les deux mots de passe ne correspondent pas'
			let newPasswordConfirmation = this.state.passwordConfirmation
			newPasswordConfirmation.error = true
			newPasswordConfirmation.helperText =
				'Les deux mots de passe ne correspondent pas'
			this.setState({ password: newPassword })
			this.setState({ passwordConfirmation: newPasswordConfirmation })
			return false
		}
		return true
	}
	handleClick = async () => {
		if (this.validateForm()) {
			this.setState({ loaded: false })
			const res = await this.props.userService.logup(
				this.state.username.value,
				this.state.firstname.value,
				this.state.lastname.value,
				this.state.country,
				this.state.email.value,
				this.state.password.value
			)
			this.setState({ loaded: true })
			if (res === true) {
				createNotification({
					level: Level.SUCCESS,
					message: 'Votre compte a bien été créé'
				})
				this.props.history.push({
					pathname: '/login'
				})
			} else {
				createNotification({
					level: Level.ERROR,
					message: res.message || res.data.message
				})
			}
		}
	}

	handleChange = event => {
		const { name, value } = event.target
		let newValue = this.state[name]
		newValue.value = value
		this.setState({ [name]: newValue })
	}

	render() {
		const classes = this.props.classes
		return (
			<Loader loaded={this.state.loaded}>
				<Grid container direction="column" justify="center" alignItems="center">
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
								className={classes.textField}
								id="username"
								name="username"
								label="Pseudo"
								placeholder="Saisissez votre pseudo"
								margin="normal"
								required={true}
								helperText={this.state.username.helperText}
								error={this.state.username.error}
								value={this.state.username.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								className={classes.textField}
								id="firstname"
								name="firstname"
								label="Prénom"
								placeholder="Saisissez votre prénom"
								margin="normal"
								required={true}
								helperText={this.state.firstname.helperText}
								error={this.state.firstname.error}
								value={this.state.firstname.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								className={classes.textField}
								id="lastname"
								name="lastname"
								label="Nom"
								placeholder="Saisissez votre nom"
								margin="normal"
								required={true}
								helperText={this.state.lastname.helperText}
								error={this.state.lastname.error}
								value={this.state.lastname.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								className={classes.textField}
								id="country"
								name="country"
								label="Pays"
								margin="normal"
								required={true}
								helperText={this.state.country.helperText}
								error={this.state.country.error}
								value={this.state.country.value}
								onChange={this.handleChange}
							/>
						</Grid>

						<Grid item xs>
							<TextField
								className={classes.textField}
								id="email"
								name="email"
								label="Email"
								type="email"
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
								className={classes.textField}
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
							<TextField
								className={classes.textField}
								id="passwordConfirmation"
								name="passwordConfirmation"
								label="Confirmation du mot de passe"
								type="password"
								placeholder="Confirmez votre mot de passe"
								margin="normal"
								required={true}
								helperText={this.state.passwordConfirmation.helperText}
								error={this.state.passwordConfirmation.error}
								value={this.state.passwordConfirmation.value}
								onChange={this.handleChange}
							/>
						</Grid>
						<Grid item xs>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								type="button"
								onClick={this.handleClick}>
								Enregistrer
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Loader>
		)
	}
}
export default withStyles(style, { withTheme: true })(LogUp)
