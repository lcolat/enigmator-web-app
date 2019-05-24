import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'
import style from './style'

class Authentication extends Component {
	state = {
		login: {
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
	handleConnection = () => {
		if (this.validateForm()) {
			if (/*loginfunction*/ false) {
				this.props.history.push({
					pathname: '/home'
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
			<div className="main">
				<div className="login">
					<TextField
						id="login"
						name="login"
						label="Email"
						placeholder="Saisissez votre email"
						margin="normal"
						required={true}
						helperText={this.state.login.helperText}
						error={this.state.login.error}
						value={this.state.login.value}
						onChange={this.handleChange}
					/>
				</div>
				<div className="password">
					<TextField
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
				</div>
				<div className="forgottenPassword">
				    <Link to="/forgotten-password">
						Mot de passe oublié :(?
					</Link>
				</div>
				<div className="loginBtn">
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={this.handleConnection}>
						Connexion
					</Button>
				</div>
				<div className="signUpBtn">
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={this.handleInscription}>
						Inscription
					</Button>
				</div>
			</div>
		)
	}
}

export default withStyles(style, { withTheme: true })(Authentication)

