import React from 'react'
import PropType from 'prop-types'
import {
	Paper,
	Typography,
	Divider,
	IconButton,
	TextField,
	Tooltip,
	Avatar,
	Grid,
	makeStyles
} from '@material-ui/core'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import FormatDate from 'common/FormatDate'
import LikeCount from 'common/LikeCount'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1),
		margin: theme.spacing(1)
	},
	gridRootPostBody: {
		width: '100%',
		marginBottom: theme.spacing(1)
	},
	button: {
		//margin: theme.spacing(1),
	},
	typoComment: {
		marginRight: theme.spacing(1)
	},
	fullWidth: {
		width: '100%'
	},
	postBody: {
		minHeight: 75,
		marginTop: theme.spacing(1)
	},
	creatorName: {
		marginLeft: theme.spacing(1)
	},
	comments: {
		width: '100%'
	},
	comment: {
		width: '100%'
	}
}))

function Post(props) {
	const { postData } = props
	const classes = useStyles()
	const [commentUp, setCommentUp] = React.useState(false)
	const [addComment, setAddComment] = React.useState(false)

	function changeArrow() {
		setCommentUp(!commentUp)
	}

	function onAddComment() {
		setAddComment(true)
	}

	function onSendComment() {
		setAddComment(false)
	}

	return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid container direction={'column'}>
					<Grid item>
						<Grid container direction={'row'} justify={'space-between'}>
							<Grid item>
								<Grid container direction={'row'} alignItems={'flex-end'}>
									<Avatar
										alt={postData.creator.username}
										src={
											postData.creator.avatar
												? postData.creator.avatar
												: process.env.PUBLIC_URL +
												  '/img/default-profile-picture.jpg'
										}
									/>
									<Typography className={classes.creatorName}>
										{postData.creator.username}
									</Typography>
									<Typography className={classes.creatorName}>
										{'le ' + FormatDate(postData.creationDate)}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Divider style={{ marginTop: 10 }} />
					<Divider style={{ marginBottom: 3 }} />
				</Grid>
				<Grid item className={classes.gridRootPostBody}>
					<Grid item className={classes.postBody}>
						<Grid container justify={'flex-start'}>
							{postData.content}
						</Grid>
					</Grid>
					<Divider />
					<Divider />
				</Grid>

				<Grid item className={classes.comments}>
					<Grid container direction={'column'}>
						{addComment && (
							<Grid item>
								<Divider style={{ marginBottom: 3 }} />
								<TextField
									id="add-comment"
									label="Comment"
									// style={{margin: 8}}
									placeholder="Write your Comment Here"
									fullWidth
									margin="normal"
									InputLabelProps={{
										shrink: true
									}}
								/>
								<Tooltip title="Send Comment">
									<IconButton
										color="primary"
										className={classes.button}
										aria-label="Add to shopping cart"
										onClick={onSendComment}>
										<PlaylistAddCheck />
									</IconButton>
								</Tooltip>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

Post.propTypes = {
	postData: PropType.object.isRequired
}

export default Post
