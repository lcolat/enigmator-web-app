import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'center',
		width: '100%'
	}
}))

function AudioEnigma(props) {
	const { content } = props
	const classes = useStyles()
	return (
		<Grid container alignItems={'stretch'} direction={'column'}>
			<Grid item xl>
				<audio controls>
					<source src={content} />
				</audio>
			</Grid>
		</Grid>
	)
}

export default AudioEnigma
