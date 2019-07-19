import React, { Component } from 'react'
import PrivacyPolicyContent from 'common/PrivacyPolicyContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const styles = theme => ({
	app: {
		textAlign: 'center',
		display: 'flex'
	}
})

class PrivacyPolicy extends Component {
	render() {
		const { onClose, validate, ...other } = this.props
		return (
			<Dialog
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth={true}
				maxWidth={'xl'}
				{...other}>
				<DialogContent>
					<PrivacyPolicyContent />
				</DialogContent>

				<DialogActions>
					En validant votre inscription vous acceptez ces conditions générales
					d'utilisation
					<Button variant="contained" onClick={validate} color="primary">
						Valider l'inscription
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default withStyles(styles, { withTheme: true })(PrivacyPolicy)
