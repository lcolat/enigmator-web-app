import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
	Button,
	makeStyles,
	Paper,
	Typography,
	TextField
} from '@material-ui/core'
import { Grid, Box } from '@material-ui/core'

import InfoEnigma from './InfoEnigma'
import ListWordTry from './ListWordTry'
import { LikeCount } from '../../../../common'
import { OpenInNew, Done } from '@material-ui/icons'
import EnigmaService from 'services/enigmaService'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(3)
	},
	button: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		color: '#ae75e9'
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	leftGrid: {
		//marginLeft: theme.spacing(1),
		//marginRight: theme.spacing(1)
	},
	descriptionPaper: {
		maxWidth: 250,
		height: 200,
		overflow: 'hidden',
		wordWrap: 'break-word',
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	enigmaBottom: {
		// marginTop: theme.spacing(4)
	}
}))

function TemplateEnigma(props) {
	const { enigmaView: EnigmaView, hasChat, enigma } = props
	const classes = useStyles()
	const enigmaService = new EnigmaService()
	const [content, setContent] = useState(undefined)
	const [answer, setAnswer] = useState('')
	const [stackWords, setstackWords] = useState(
		enigmaService.getLastWords(enigma.id)
	)

	const fetchMedia = async () => {
		const res = await enigmaService.getEnigmaFileUrl(enigma.id)
		setContent(res)
	}

	useEffect(() => {
		fetchMedia(content)
	}, [content])

	const handleResponse = async () => {
		setstackWords(stackWords.concat([answer]))
		enigmaService.setLastWords(enigma.id, stackWords)
		const res = await enigmaService.answer(enigma.id, answer)
		if (res.data.message === 'bonne réponse ! ') {
			enigmaService.deleteLastWords(enigma.id)
			createNotification({
				level: Level.SUCCESS,
				message: res.data.message
			})
		} else if (res.data.message === 'mauvaise réponse ! ') {
			createNotification({
				level: Level.INFO,
				message: res.data.message
			})
		} else {
			createNotification({
				level: Level.ERROR,
				message: res.message || res.data.message
			})
		}
	}
	const handleChange = event => {
		setAnswer(event.target.value)
	}
	return (
		<Paper className={classes.root}>
			<Grid
				container
				item
				direction={'row'}
				alignItems={'flex-start'}
				justify={'flex-start'}>
				<Grid
					container
					item
					xs={2}
					direction={'column'}
					justify={'space-between'}
					alignItems={'stretch'}
					className={classes.leftGrid}>
					<Grid item xs>
						<InfoEnigma enigma={enigma} />
					</Grid>
					<Grid item xs>
						<ListWordTry stackWords={stackWords} />
					</Grid>
				</Grid>

				<Grid
					container
					item
					xs={10}
					alignItems={'stretch'}
					direction={'column'}
					justify={'space-between'}
					className={classes.enigmaBox}>
					<Grid item>
						<Typography variant={'h4'} gutterBottom>
							{enigma.name}
						</Typography>
					</Grid>
					<Grid item>
						{content !== undefined && <EnigmaView.type content={content} />}
					</Grid>
					<Grid item>
						<Typography variant={'h4'} gutterBottom>
							{enigma.question}
						</Typography>
					</Grid>
					<Grid
						item
						container
						direction={'row'}
						justify={'center'}
						alignItems={'stretch'}
						className={classes.enigmaBottom}>
						<Grid item>
							<TextField
								id="enigma-scoreReward"
								label="Réponse"
								name="answer"
								className={classes.textField}
								value={answer}
								onChange={handleChange}
								margin="normal"
							/>
						</Grid>
						<Grid item container justify={'flex-end'} alignItems={'stretch'}>
							<LikeCount liked={enigma.isLikedByUser} likes={enigma.likes} />
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}>
								Forum
								<OpenInNew className={classes.rightIcon}>Forum</OpenInNew>
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								onClick={handleResponse}>
								Valider
								<Done className={classes.rightIcon}>Valider</Done>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	)
}

TemplateEnigma.propTypes = {
	enigmaView: PropTypes.any.isRequired
}

export default TemplateEnigma
