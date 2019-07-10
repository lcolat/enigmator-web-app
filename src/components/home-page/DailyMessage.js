import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import Report from '@material-ui/icons/Report'

function DailyMessage(props) {
	const { message } = props

	return (
		<Paper>
			<div align={'left'}>
				<Report fontSize="large" />
			</div>
			<Typography variant={'h6'}>{message}</Typography>
		</Paper>
	)
}

DailyMessage.defaultProps = {
	message: 'No Daily Message'
}

DailyMessage.propType = {
	message: PropTypes.string
}

export default DailyMessage
