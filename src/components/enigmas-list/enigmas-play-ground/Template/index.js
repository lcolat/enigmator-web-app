import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import InfoEnigma from './InfoEnigma'
import ListWordTry from './ListWordTry'
import { LikeCount } from '../../../../common'
import OpenInNew from '@material-ui/icons/OpenInNew'
import Done from '@material-ui/icons/Done'
import EnigmaService from 'services/enigmaService'
import PopUpYouWin from 'components/enigmas-list/pop-up-enigma'
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
	const { enigmaView: EnigmaView, hasChat, enigma, userService } = props
	const classes = useStyles()
	const enigmaService = new EnigmaService()
	const [content, setContent] = useState(undefined)
	const [open, setOpen] = useState(false)
	const [answer, setAnswer] = useState('')
	const [score, setScore] = useState(0)
	const [stackWords, setstackWords] = useState(
		enigmaService.getLastWords(enigma.id)
	)
	const fetchMedia = async () => {
		const res = await enigmaService.getEnigmaFileUrl(enigma.id)
		await enigmaService.setTriedEnigma(props.userService.id, enigma.id)
		setContent(res)
	}

	useEffect(() => {
		fetchMedia(content)
	}, [content])

	const handleGoodAnswer = async message => {
		createNotification({
			level: Level.SUCCESS,
			message: message
		})
		enigmaService.deleteLastWords(enigma.id)
		setOpen(true)
	}

	const handleResponse = async () => {
		if (answer !== '') {
			setstackWords(stackWords.concat([answer]))
			enigmaService.setLastWords(enigma.id, stackWords)
			const res = await enigmaService.answer(enigma.id, answer)
			if (res.data.message === 'bonne réponse ! ') {
				const res2 = await userService.get(userService.id)
				setScore(res2.score)
				handleGoodAnswer(res.data.message)
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
	}
	const handleChange = event => {
		setAnswer(event.target.value)
	}
	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			handleResponse()
		}
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
					{EnigmaView !== undefined && (
						<Grid item>
							{content !== undefined && <EnigmaView.type content={content} />}
						</Grid>
					)}
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
								onKeyPress={handleKeyPress}
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
			{open && (
				<PopUpYouWin history={props.history} isOpen={open} score={score} />
			)}
		</Paper>
	)
}

TemplateEnigma.propTypes = {
	// enigmaView: PropTypes.any.isRequired
}

export default TemplateEnigma
