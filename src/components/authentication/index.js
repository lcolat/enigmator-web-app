import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link';

class Authentication extends Component {
	state = {
		login: '',
		password: ''
	}
	handleClick = () => {
		if (this.props.isLoggedIn(this.state.login, this.state.password)) {
			this.props.history.push({
				pathname: '/home'
			})
		}
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className="main">
				<div className="login">
					<TextField
						id="login"
						name="login"
						label="Email"
						placeholder="Saisissez votre email"
						margin="normal"
						value={this.state.login}
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
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</div>
                <div className="forgottenPassword">
                    <Link>
                        Mot de passe oublié ?
                    </Link>
                </div>
				<div className="loginBtn">
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleClick}>
						Connexion
					</Button>
				</div>
                <div className="signUpBtn">
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleClick}>
						Inscription
					</Button>
				</div>
			</div>
		)
	}
}

export default Authentication
