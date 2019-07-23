import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import {
	TextField,
	MenuItem,
	Avatar,
	Typography,
	Grid,
	ButtonBase,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
import userDataStyle from './userDataStyle'

import PictureSelector from 'common/PictureSelector'

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
			open: false,
			username: '',
			firstName: '',
			lastName: '',
			creationDate: '',
			country: '',
			status: '',
			email: '',
			password: '',
			newPassword: '',
			newPasswordConfirmation: '',
			changes: false,
			picture: this.props.userService.avatar,
			tempPicture: this.props.userService.avatar
		}
	}

	handleNewAvatar = newAvatar => {
		this.props.userService.avatar = window.URL.createObjectURL(newAvatar)
		this.setState({
			picture: newAvatar,
			changes: true,
			tempPicture: window.URL.createObjectURL(newAvatar)
		})
	}

	handleClose = () => {
		this.setState({ open: false })
	}
	formatDate(date) {
		return new Date(date).toLocaleDateString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
	async componentDidMount() {
		const res = await this.props.userService.get(this.props.userService.id)
		if (res) {
			this.setState({
				username: res.username,
				firstName: res.firstName,
				lastName: res.lastName,
				country: res.country,
				email: res.email,
				creationDate: this.formatDate(res.creationDate)
			})
			this.props.setUserDataLoaded(true)
		} else {
			createNotification({
				level: Level.ERROR,
				message: "Impossible de récupérer les informations de l'utilisateur"
			})
		}
	}
	validatePassword = () => {
		if (
			this.state.newPassword !== this.state.newPasswordConfirmation &&
			this.state.password !== ''
		) {
			return false
		}
		return true
	}
	prepareData = () => {
		let data = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			country: this.state.country,
			email: this.state.email
		}
		if (this.state.newPassword !== '') {
			data.password = this.state.newPassword
		}
		return data
	}
	updateProfile = async () => {
		this.setState({ open: false })
		if (this.validatePassword()) {
			const res = await this.props.userService.update(
				this.props.userService.id,
				this.prepareData()
			)
			await this.props.userService.addProfilePicture(this.state.picture)
			if (res === true) {
				this.setState({ changes: false })
				createNotification({
					level: Level.SUCCESS,
					message: 'Les données ont bien été mises à jour'
				})
			} else {
				createNotification({
					level: Level.ERROR,
					message: res.message || res.data.message
				})
			}
		} else {
			createNotification({
				level: Level.ERROR,
				message: 'Les deux mots de passe ne correspondent pas'
			})
		}
	}
	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value, changes: true })
	}

	getData = async () => {
		const res = await this.props.userService.getData()
		if (res === true) {
			createNotification({
				level: Level.SUCCESS,
				message: 'Vous recevrez par email vos données'
			})
		} else {
			createNotification({
				level: Level.ERROR,
				message: res.message || res.data.message
			})
		}
	}

	deleteAccount = async () => {
		const res = await this.props.userService.deleteAccount()
		if (res === true) {
			this.props.history.push({
				pathname: '/login'
			})
			createNotification({
				level: Level.SUCCESS,
				message: 'Votre compte a bien été supprimé'
			})
		} else {
			createNotification({
				level: Level.ERROR,
				message: res.message || res.data.message
			})
		}
	}
	render() {
		const { classes } = this.props
		return (
			<>
				<Grid container direction={'column'} justify={'center'}>
					<Grid item>
						<Grid
							container
							direction={'row'}
							justify={'center'}
							alignItems="center">
							<Grid item>
								<PictureSelector setAvatar={this.handleNewAvatar}>
									<ButtonBase
										variant="contained"
										color="secondary"
										component="span">
										<Avatar
											alt="Profile picture"
											src={
												this.state.tempPicture
													? this.state.tempPicture
													: process.env.PUBLIC_URL +
													  '/img/default-profile-picture.jpg'
											}
											className={classes.avatar}
										/>
									</ButtonBase>
								</PictureSelector>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1" gutterBottom>
									{`Inscrit depuis le ${this.state.creationDate}`}
								</Typography>
							</Grid>
							<Grid item style={{ marginLeft: '10px' }}>
								<Grid
									container
									direction={'column'}
									justify={'center'}
									alignItems="center">
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={this.getData}>
										Récupérer mes données
									</Button>
									<Button
										variant="contained"
										color="error"
										className={classes.buttonDel}
										onClick={this.deleteAccount}>
										Supprimer mon compte
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container direction={'column'} style={{ alignItems: 'center' }}>
						<TextField
							id="text-field-pseudo"
							label="Pseudo"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.username}
							onChange={this.handleChange('username')}
							margin="normal"
							variant="outlined"
						/>
						<Grid container direction={'row'} justify={'center'}>
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
				<Grid container direction={'column'} style={{ alignItems: 'center' }}>
					<TextField
						id="text-field-state"
						label="Pays"
						className={classNames(classes.margin, classes.textField)}
						value={this.state.country}
						onChange={this.handleChange('country')}
						margin="normal"
						variant="outlined"
					/>
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
				<Grid container direction={'row'} justify={'center'}>
					<Grid item>
						<TextField
							id="text-field-new-password"
							label="Nouveau mot de passe"
							type="password"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.newPassword}
							onChange={this.handleChange('newPassword')}
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true
							}}
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
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
				</Grid>
				<Grid container direction={'column'} justify={'center'}>
					{this.state.changes ? (
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={this.updateProfile}>
							Enregistrer les modifications
						</Button>
					) : (
						<Button
							variant="contained"
							color="primary"
							disabled
							className={classes.button}>
							Enregistrer les modifications
						</Button>
					)}
				</Grid>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Valider</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Pour valider vos modifications veuillez confirmer votre mot de
							passe
						</DialogContentText>
						<TextField
							autoFocus
							id="password"
							label="Mot de passe"
							type="password"
							value={this.state.password}
							onChange={this.handleChange('password')}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Annuler
						</Button>
						<Button onClick={this.updateProfile} color="primary">
							Confirmer
						</Button>
					</DialogActions>
				</Dialog>
			</>
		)
	}
}

export default withStyles(userDataStyle)(UserData)
