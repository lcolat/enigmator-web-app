import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'center',
		width: '100%'
	}
}))

function VideoEnigma(props) {
	const { content } = props
	const classes = useStyles()
	return (
		<Grid container alignItems={'stretch'} direction={'column'}>
			<Grid item xl>
				<video controls width="640" height="360">
					<source src={content} />
				</video>
			</Grid>
		</Grid>
	)
}

export default VideoEnigma
