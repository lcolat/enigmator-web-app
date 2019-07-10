import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'center',
		width: '100%'
	}
}))

function ImageEnigma(props) {
	const { content } = props
	const classes = useStyles()
	return (
		<Grid container alignItems={'stretch'} direction={'column'}>
			<Grid item xl>
				<img alt={'enigma'} src={content} height="360" />
			</Grid>
		</Grid>
	)
}

export default ImageEnigma
