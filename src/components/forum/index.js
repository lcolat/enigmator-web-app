import React from 'react'
import {
	Grid,
	makeStyles,
	TableCell,
	TableRow,
	Typography
} from '@material-ui/core'
import { SortableTable, LikeCount, SearchPick, FormatDate } from '../../common'
import Topic from '../../model/Topic'
import ForumService from '../../services/forumService'

const header = [
	{ id: 'name', align: 'center', disablePadding: true, label: 'Nom' },
	{
		id: 'creation',
		align: 'left',
		disablePadding: false,
		label: 'Date de création'
	},
	{
		id: 'lastUpdate',
		align: 'left',
		disablePadding: false,
		label: 'Date de dernière édition'
	},
	{ id: 'like', align: 'left', disablePadding: false, label: 'Like' }
]

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(3)
	},
	rootMenu: {
		marginBottom: theme.spacing(1)
	},
	search: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(2),
		width: '20%',
		align: 'left'
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	button: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
}))

function ListThreads(props) {
	const classes = useStyles()
	const service = new ForumService()
	const [body, setBody] = React.useState([[], []])

	const getTopics = async () => {
		const res = await service.getTopics()
		let newBody = []
		if (res) {
			res.forEach(topic => {
				newBody.push(
					new Topic(
						topic.id,
						topic.title,
						FormatDate(topic.creationDate),
						FormatDate(topic.lastEditDate),
						topic.description,
						topic.likes,
						false,
						true,
						topic.isAutomatic,
						topic.userEnigmatorsId,
						topic.creator
					)
				)
			})
		}
		setBody(newBody)
	}

	React.useEffect(() => {
		getTopics()
	}, [])

	function handleClick(event, topic) {
		props.history.push({
			pathname: '/topic',
			state: {
				topic: topic
			}
		})
	}

	function formBody(bodyRow, labelId) {
		return (
			<TableRow
				hover
				onClick={event => handleClick(event, bodyRow)}
				tabIndex={-1}
				key={bodyRow.title + '-' + bodyRow.ownerId}>
				<TableCell
					component="th"
					id={labelId}
					scope="row"
					padding="none"
					align="center">
					{bodyRow.title}
				</TableCell>
				<TableCell align="left">{bodyRow.creationDate}</TableCell>
				<TableCell align="left">{bodyRow.lastEditDate}</TableCell>
				<TableCell align="left">
					<LikeCount
						liked={bodyRow.like && bodyRow.like.byUser}
						likes={bodyRow.like && bodyRow.like.number}
					/>
				</TableCell>
			</TableRow>
		)
	}

	return (
		<div className={classes.root}>
			<Grid container direction={'row'} className={classes.rootMenu}>
				<Grid item xs={8}>
					<Typography>Topics</Typography>
				</Grid>
				<Grid item xs className={classes.search}>
					<SearchPick
						suggestions={body.map(thread => {
							return { label: thread.title }
						})}
						topic={body.map(topic => {
							return topic
						})}
					/>
				</Grid>
			</Grid>
			<SortableTable
				columnsHeader={header}
				rowFormGenerator={formBody}
				rows={body}
			/>
		</div>
	)
}

export default ListThreads
