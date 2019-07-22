import React, { PureComponent } from 'react'
import PrivacyPolicyContent from 'common/PrivacyPolicyContent'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
class PrivacyPolicy extends PureComponent {
	render() {
		const { classes } = this.props
		return (
			<Paper className={classes.content}>
				<PrivacyPolicyContent />
			</Paper>
		)
	}
}

export default withStyles(style, { withTheme: true })(PrivacyPolicy)
