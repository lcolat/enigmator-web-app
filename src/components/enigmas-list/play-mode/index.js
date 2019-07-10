import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Button from '@material-ui/core/Button'
import Rowing from '@material-ui/icons/Rowing'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import Whatshot from '@material-ui/icons/Whatshot'
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import Paper from '@material-ui/core/Paper'
import TableUserConnected from './TableUserConnected'
import Typography from '@material-ui/core/Typography'
import Enigma from '../enigmas-play-ground'

const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	message: {
		margin: theme.spacing(2)
	}
}))

function PlayModeDialogue(props) {
	const [toto, setToto] = React.useState()
	const classes = useStyles()
	const { onOpen, enigma, ...other } = props
	const [value, setValue] = React.useState(0)
	const [message, setMessage] = React.useState(
		"Choose the Game Type and if it's Grouped, your Friend too!"
	)
	const [isLaunch, setIsLaunch] = React.useState(false)
	function handleClose() {
		onOpen(false)
	}

	function handleChange(event, newValue) {
		setValue(newValue)
	}

	function handleLaunchGame() {
		props.history.push({
			pathname: '/enigma',
			state: { type: enigma.type, enigma: enigma }
		})
	}

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			maxWidth={'sm'}
			{...other}>
			<DialogTitle style={{ alignSelf: 'center' }} id="dialog-title">
				{enigma.name}
			</DialogTitle>
			<DialogContent>
				{!isLaunch ? (
					<>
						<Paper>
							<Tabs
								value={value}
								onChange={handleChange}
								variant="fullWidth"
								indicatorColor="primary"
								textColor="primary">
								<Tab icon={<Rowing />} label={'Solo'} />
								<Tab icon={<SupervisedUserCircle />} label={'Multi'} />
								<Tab icon={<Whatshot />} label={'PvP'} />
							</Tabs>
						</Paper>

						<Typography className={classes.message} classes={'body1'}>
							{message}
						</Typography>
						<TableUserConnected />
					</>
				) : (
					<Enigma enigma={enigma} type={enigma.type} />
				)}
			</DialogContent>
			{!isLaunch && (
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleLaunchGame}
						color="primary">
						PLAY
						<PlayCircleOutline className={classes.rightIcon} />
					</Button>
				</DialogActions>
			)}
		</Dialog>
	)
}

export default PlayModeDialogue
