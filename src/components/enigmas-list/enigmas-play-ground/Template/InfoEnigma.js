import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
	ListSubheader,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core'
import { Divider, Tooltip, Paper } from '@material-ui/core'

import {
	FitnessCenter,
	LocalActivity,
	EventSeat,
	Create
} from '@material-ui/icons'
import { Difficulties } from 'model/Enigma'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}))

function InfoEnigma(props) {
	const { enigma } = props
	const classes = useStyles()
	const formatDate = date => {
		return new Date(date).toLocaleDateString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	return (
		<Paper className={classes.root}>
			<List
				dense={true}
				component="nav"
				subheader={
					<ListSubheader component="div" color={'primary'}>
						Enigma's Specificity
					</ListSubheader>
				}
				className={classes.root}>
				<Divider />
				<Tooltip title={'Créateur'} placement={'right'}>
					<ListItem alignItems={'center'}>
						<ListItemIcon>
							<EventSeat />
						</ListItemIcon>
						<ListItemText primary={enigma.Enigme_User.username} />
					</ListItem>
				</Tooltip>
				<Divider />
				<Tooltip title={'Date de création'} placement={'right'}>
					<ListItem alignItems={'center'}>
						<ListItemIcon>
							<Create />
						</ListItemIcon>
						<ListItemText primary={formatDate(enigma.creationDate)} />
					</ListItem>
				</Tooltip>
				<Divider />
				<Tooltip title={'Difficulté'} placement={'right'}>
					<ListItem alignItems={'center'}>
						<ListItemIcon>
							<FitnessCenter />
						</ListItemIcon>
						<ListItemText primary={Difficulties(enigma.scoreReward)} />
					</ListItem>
				</Tooltip>
				<Divider />
				<Tooltip title={'Score'} placement={'right'}>
					<ListItem alignItems={'center'}>
						<ListItemIcon>
							<LocalActivity />
						</ListItemIcon>
						<ListItemText primary={enigma.scoreReward} />
					</ListItem>
				</Tooltip>
			</List>
		</Paper>
	)
}

InfoEnigma.propTypes = {
	enigma: PropTypes.object.isRequired
}

export default InfoEnigma
