import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
	TextField,
	MenuItem,
	Avatar,
	Typography,
	Grid,
	ButtonBase
} from '@material-ui/core'

import defaultProfilePicture from '../../media/default-profile-picture.jpg'

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		minWidth: '152px',
		maxWidth: '200px'
	},
	margin: {
		margin: 'normal'
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	},
	avatar: {
		margin: 10,
		width: 120,
		height: 120
	}
})

const statusList = [
	{ value: 'Connected', label: 'Connected' },
	{ value: 'Disconnected', label: 'Disconnected' },
	{ value: 'Absent', label: 'Absent' },
	{ value: 'Do not Disturb', label: 'Do not Disturb' }
]

class UserData extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userService: this.props.userService,
			username: '',
			firstName: '',
			lastName: '',
			creationDate: '',
			country: '',
			status: '',
			email: '',
			newPassword: '',
			newPasswordConfirmation: '',
			changes: false
		}
	}
	formatDate(date) {
		return date.slice(0, 10)
	}
	async componentDidMount() {
		const res = await this.state.userService.get(this.state.userService.getId())
		if (res) {
			this.setState({
				username: res.username,
				firstName: res.firstName,
				lastName: res.lastName,
				country: res.country,
				email: res.email,
				creationDate: this.formatDate(res.creationDate)
			})
		} else {
		}
	}
	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value, changes: true })
	}

	render() {
		const { classes } = this.props
		return (
			<form className={classes.container} noValidate autoComplete="off">
				<Grid container direction={'column'}>
					<Grid item>
						<Grid container direction={'row'} style={{ alignItems: 'center' }}>
							<Grid item>
								<ButtonBase className={classes.image}>
									<Avatar
										alt="Profile picture"
										src={defaultProfilePicture}
										className={classes.avatar}
									/>
								</ButtonBase>
							</Grid>
							<Grid item>
								<Grid container direction={'column'}>
									<Typography variant="subtitle1" gutterBottom>
										{`Inscript depuis le ${this.state.creationDate}`}
									</Typography>
									<TextField
										id="text-field-status"
										label="Status"
										select
										className={classNames(classes.margin, classes.textField)}
										value={this.state.status}
										onChange={this.handleChange('status')}
										SelectProps={{
											MenuProps: {
												className: classes.menu
											}
										}}
										margin="normal"
										variant="outlined">
										{statusList.map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction={'column'}>
							<TextField
								id="text-field-pseudo"
								label="Pseudo"
								className={classNames(classes.margin, classes.textField)}
								value={this.state.username}
								onChange={this.handleChange('pseudo')}
								margin="normal"
								variant="outlined"
							/>
							<Grid container direction={'row'}>
								<TextField
									id="text-field-firstName"
									label="Prénom"
									className={classNames(classes.margin, classes.textField)}
									value={this.state.firstName}
									onChange={this.handleChange('firstName')}
									margin="normal"
									variant="outlined"
								/>
								<TextField
									id="text-field-last-name"
									label="Nom"
									className={classNames(classes.margin, classes.textField)}
									value={this.state.lastName}
									onChange={this.handleChange('lastName')}
									margin="normal"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container direction={'column'}>
					<Grid container direction={'row'} justify={'space-between'}>
						<TextField
							id="text-field-state"
							label="Pays"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.country}
							onChange={this.handleChange('country')}
							margin="normal"
							variant="outlined"
						/>
					</Grid>
					<TextField
						id="text-field-email"
						label="Email"
						className={classNames(classes.margin, classes.textField)}
						value={this.state.email}
						onChange={this.handleChange('email')}
						margin="normal"
						variant="outlined"
					/>
				</Grid>
				<Grid container direction={'column'}>
					<Grid container direction={'row'}>
						<TextField
							id="text-field-new-password"
							label="Nouveau mot de passe"
							type="password"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.newPassword}
							onChange={this.handleChange('newPassword')}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="text-field-new-password-confirmation"
							label="Confirmation du nouveau mot de passe"
							type="password"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.newPasswordConfirmation}
							onChange={this.handleChange('newPasswordConfirmation')}
							margin="normal"
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</form>
		)
	}
}

export default withStyles(styles)(UserData)
