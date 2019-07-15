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
import PlaylistAdd from '@material-ui/icons/PlaylistAdd'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import LikeCount from './../../../common/LikeCount'

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
				<Grid item className={classes.fullWidth}>
					<Grid container direction={'column'} alignItems={'flex-start'}>
						<Typography variant={'h4'}>{postData.title}</Typography>
						<Typography>{postData.date}</Typography>
					</Grid>
					<div>
						<Divider />
						<Divider />
					</div>
				</Grid>
				<Grid item className={classes.gridRootPostBody}>
					<Grid item className={classes.postBody}>
						<Grid container justify={'flex-start'}>
							{postData.body}
						</Grid>
					</Grid>
					<Divider />
					<Divider />
				</Grid>
				<Grid container direction={'column'}>
					<Grid item>
						<Grid container direction={'row'} justify={'space-between'}>
							<Grid item>
								<Grid container direction={'row'} alignItems={'flex-end'}>
									<Avatar
										alt={postData.creator.name}
										src={
											postData.creator.avatar
												? postData.creator.avatar
												: process.env.PUBLIC_URL +
												  '/img/default-profile-picture.jpg'
										}
									/>
									<Typography className={classes.creatorName}>
										{postData.creator.name}
									</Typography>
								</Grid>
							</Grid>
							<LikeCount
								likes={postData.like.number}
								liked={postData.like.byUser}
							/>
						</Grid>
					</Grid>
					<Divider style={{ marginTop: 10 }} />
					<Divider style={{ marginBottom: 3 }} />
				</Grid>
				<Grid
					container
					direction={'row'}
					justify={'space-between'}
					alignItems={'center'}>
					<Tooltip title="Add Comment" placement="right">
						<IconButton
							color="primary"
							className={classes.button}
							aria-label="Add Comment"
							onClick={onAddComment}>
							<PlaylistAdd />
						</IconButton>
					</Tooltip>
					<div>
						<Grid container direction={'row'} alignItems={'center'}>
							<Typography className={classes.typoComment}>Comments</Typography>
							<Typography>{'(' + postData.comment.length + ')'}</Typography>
						</Grid>
					</div>
					<IconButton
						color="primary"
						className={classes.button}
						aria-label="Drop Arrow"
						onClick={changeArrow}>
						{commentUp ? <ArrowDropUp /> : <ArrowDropDown />}
					</IconButton>
				</Grid>
				<Grid item className={classes.comments}>
					<Grid container direction={'column'}>
						{commentUp &&
							postData.comment.map(com => (
								<Grid
									item
									className={classes.comment}
									key={`${com.name}-${com.date}`}>
									<Grid container direction={'column'}>
										<Divider style={{ marginBottom: 3 }} />
										<Grid item>
											<Grid
												container
												direction={'row'}
												justify={'space-between'}>
												<Grid item>
													<Grid
														container
														direction={'row'}
														alignItems={'flex-end'}>
														<Typography variant={'body2'}>
															{com.name}
														</Typography>
														<Typography
															variant={'caption'}
															style={{ marginLeft: 7 }}>
															{com.date}
														</Typography>
													</Grid>
												</Grid>
												<LikeCount
													liked={com.like.byUser}
													likes={com.like.number}
												/>
											</Grid>
										</Grid>
										<Grid item style={{ marginBottom: 3 }}>
											<Grid container justify={'flex-start'}>
												<Typography variant={'body1'}>{com.body}</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							))}
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
