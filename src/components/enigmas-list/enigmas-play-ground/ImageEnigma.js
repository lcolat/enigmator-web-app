import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'

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
				<img alt={'enigma'} src={content} />
			</Grid>
		</Grid>
	)
}

export default ImageEnigma
