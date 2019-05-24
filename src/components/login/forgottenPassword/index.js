import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class ForgottentPassword extends Component {
    state = {
		login: ''
	}
	handleClick = () => {
        this.props.history.push({
            pathname: '/home'
        })
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
				<div className="loginBtn">
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleClick}>
                        Envoyer
					</Button>
				</div>
			</div>
		)
	}
}

export default ForgottentPassword
