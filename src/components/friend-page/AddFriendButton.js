import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'

const styles = theme => ({
	button: {
		margin: theme.spacing()
	},
	buttonRightIcon: {
		marginLeft: theme.spacing()
	}
})

function AddFriendButton(classes) {
	const [open, setOpen] = React.useState(false)

	function handleClickOpen() {
		setOpen(true)
	}

	function handleClose() {
		setOpen(false)
	}

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				onClick={handleClickOpen}>
				<PersonAdd className={classes.buttonRightIcon} />
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth={true}
				maxWidth={'sm'}>
				<DialogTitle id="form-dialog-title">Add Friend</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Write the name of your friend down
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="email"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						<PersonAdd className={classes.buttonRightIcon} />
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default withStyles(styles)(AddFriendButton)
