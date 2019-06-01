import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {Link} from 'react-router-dom'

class NewAccount extends Component {
	state = {
		pseudo: '',
		firstname: '',
		lastname: '',
		email: '',
		birthdate: '',
		password: '',
		passwordConfirmation: ''
	};
	handleClick = () => {
		if (this.props.isLoggedIn(this.state.login, this.state.password)) {
			this.props.history.push({
				pathname: '/home'
			})
		}
	};
	
	handleChange = event => {
		const {name, value} = event.target;
		this.setState({[name]: value})
	};
	
	render() {
		return (
			<FormControl>
				<img
					alt="Enigmator"
					src={process.env.PUBLIC_URL + '/img/logo_long.png'}
					style={{width: '30vw'}}
				/>
				<FormLabel component="legend">Inscription</FormLabel>
				<div className="main">
					<div className="pseudo">
						<TextField
							id="pseudo"
							name="pseudo"
							label="Pseudo"
							placeholder="Saisissez votre pseudo"
							margin="normal"
							value={this.state.pseudo}
							onChange={this.handleChange}
						/>
					</div>
					<div className="firstname">
						<TextField
							id="firstname"
							name="firstname"
							label="Prénom"
							placeholder="Saisissez votre prénom"
							margin="normal"
							value={this.state.firstname}
							onChange={this.handleChange}
						/>
					</div>
					<div className="lastname">
						<TextField
							id="lastname"
							name="lastname"
							label="Nom"
							placeholder="Saisissez votre nom"
							margin="normal"
							value={this.state.lastname}
							onChange={this.handleChange}
						/>
					</div>
					<div className="birthdate">
						<TextField
							id="birthdate"
							name="birthdate"
							label="Date de naissance"
							type="date"
							margin="normal"
							value={this.state.birthdate}
							onChange={this.handleChange}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</div>
					
					<div className="email">
						<TextField
							id="email"
							name="email"
							label="Email"
							type="email"
							placeholder="Saisissez votre email"
							margin="normal"
							value={this.state.email}
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
					<div className="password">
						<TextField
							id="passwordConfirmation"
							name="passwordConfirmation"
							label="Confirmation du mot de passe"
							type="password"
							placeholder="Confirmez votre mot de passe"
							margin="normal"
							value={this.state.passwordConfirmation}
							onChange={this.handleChange}
						/>
					</div>
					<div className="loginBtn">
						<Button variant="contained" color="primary" type="submit">
							Enregistrer
						</Button>
					</div>
				</div>
			</FormControl>
		)
	}
}

export default NewAccount
