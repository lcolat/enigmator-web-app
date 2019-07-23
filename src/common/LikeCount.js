import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import ThumbUp from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1),
		color: '#ae75e9'
	}
}))

function LikeCount(props) {
	const classes = useStyles()
	const { liked, likes } = props

	return (
		<Button
			onClick={props.likeEnigma}
			variant="contained"
			color="secondary"
			style={{ color: '#ae75e9' }}>
			{likes}
			<ThumbUp className={classes.rightIcon}>like</ThumbUp>
		</Button>
	)
}

LikeCount.propTypes = {
	liked: PropTypes.bool.isRequired,
	likes: PropTypes.number.isRequired
}

export default LikeCount
