import React from 'react'
import {
	Button,
	Divider,
	TextField,
	Grid,
	makeStyles,
	Paper
} from '@material-ui/core'
import AddComment from '@material-ui/icons/AddComment'
import HeaderThread from './HeaderThread'
import Post from './Post'
import FormatDate from 'common/'
import ForumService from 'services/forumService'

const useStyles = makeStyles(theme => ({
	rootHeader: {
		margin: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1)
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},
	newPostRoot: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	textFieldNewPostBody: {
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
}))

function Thread(rest) {
	const topic = rest.location.state.topic
	const classes = useStyles()
	const [addNewPostView, setAddNewPostView] = React.useState(false)
	const [labelNewPost, setLabelNewPost] = React.useState('Ajouter un post')
	const [posts, setPosts] = React.useState([])
	const [newPostContent, setNewPostContent] = React.useState('')
	const service = new ForumService()
	const getPosts = async () => {
		const res = await service.getPosts(topic.id)
		if (res.length !== undefined) {
			setPosts(res)
		}
	}
	const addPost = async newPost => {
		await service.addPost(topic.id, newPost)
		getPosts()
	}
	React.useEffect(() => {
		getPosts()
	}, [])
	async function handleShowNewPostView() {
		if (addNewPostView) {
			await addPost(newPostContent)
			setAddNewPostView(false)
			setLabelNewPost('Ajouter un post')
		} else {
			setAddNewPostView(true)
			setLabelNewPost('Envoyer')
		}
	}
	return (
		<div>
			<div className={classes.rootHeader}>
				<HeaderThread
					avatar={topic.creator.avatar}
					username={topic.creator.username}
					subject={topic}
					isEnigmaThread
				/>
			</div>
			{posts.map(post => (
				<div key={`${post.title}-${post.date}-${post.creator}`}>
					<Divider variant={'middle'} />
					<Divider variant={'middle'} />
					<Post postData={post} />
				</div>
			))}
			{addNewPostView && (
				<Paper className={classes.newPostRoot}>
					<Grid
						container
						direction={'column'}
						alignItems={'stretch'}
						justify={'flex-start'}>
						<TextField
							id="body-post"
							label="Post"
							className={classes.textFieldNewPostBody}
							multiline
							rows="4"
							margin="normal"
							variant="outlined"
							value={newPostContent}
							onChange={event => {
								const value = event.target.value
								setNewPostContent(value)
							}}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
				</Paper>
			)}
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				onClick={handleShowNewPostView}>
				{labelNewPost}
				<AddComment className={classes.rightIcon} />
			</Button>
		</div>
	)
}

Thread.propTypes = {}

export default Thread
