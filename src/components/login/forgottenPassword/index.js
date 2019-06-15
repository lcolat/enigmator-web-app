import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import style from './style'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

class ForgottentPassword extends Component {
	state = {
		email: {
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

	handleClick = () => {
		if (this.validateForm()) {
			createNotification({
				level: Level.INFO,
				message: 'Un email pour redéfinir votre mot de passe vous a été envoyé'
			})
			this.props.history.push({
				pathname: '/login'
			})
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
			<Grid container direction={'column'} justify={'center'}>
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
						<Button
							className={classes.button}
							variant="contained"
							color="secondary"
							onClick={this.handleClick}>
							Envoyer
						</Button>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}
export default withStyles(style, { withTheme: true })(ForgottentPassword)
