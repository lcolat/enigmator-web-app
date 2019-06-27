import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { Grid, Box } from '@material-ui/core'

import InfoEnigma from './InfoEnigma'
import ListWordTry from './ListWordTry'
import EntryForResponse from './EntryForResponse'
import { LikeCount } from '../../../../common'
import { OpenInNew } from '@material-ui/icons'
import EnigmaService from 'services/enigmaService'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	button: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
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
		marginTop: theme.spacing(4)
	}
}))

function TemplateEnigma(props) {
	const { enigmaView: EnigmaView, hasChat, enigma } = props
	const classes = useStyles()
	const [content, setContent] = useState(undefined)
	const enigmaService = new EnigmaService()
	const fetchMedia = async () => {
		const res = await enigmaService.getEnigmaFileUrl(enigma.id)
		setContent(res)
	}
	useEffect(() => {
		fetchMedia(content)
	}, [content])
	return (
		<div className={classes.root}>
			<Grid
				item
				container
				direction={'row'}
				alignItems={'flex-start'}
				justify={'flex-start'}>
				<div style={{ width: '20%' }}>
					<Grid
						container
						item
						direction={'column'}
						justify={'space-between'}
						alignItems={'stretch'}
						className={classes.leftGrid}>
						<Grid item xs>
							<InfoEnigma enigma={enigma} />
						</Grid>
					</Grid>
				</div>
				<div style={{ width: '80%' }}>
					<Grid
						container
						item
						alignItems={'stretch'}
						direction={'column'}
						justify={'space-between'}
						className={classes.enigmaBox}>
						<Typography variant={'h4'} gutterBottom>
							{enigma.name}
						</Typography>
						<Grid item>
							{content !== undefined && <EnigmaView.type content={content} />}
						</Grid>
						<Grid
							item
							container
							direction={'row'}
							justify={'center'}
							alignItems={'stretch'}
							className={classes.enigmaBottom}>
							<Grid item>
								<EntryForResponse />
							</Grid>
							<Grid item container justify={'flex-end'} alignItems={'stretch'}>
								<LikeCount
									liked={enigma.isLikedByUser}
									likes={enigma.likeNumber}
								/>
								<Button
									variant="contained"
									color="primary"
									className={classes.button}>
									Forum
									<OpenInNew className={classes.rightIcon}>Forum</OpenInNew>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</div>
	)
}

TemplateEnigma.propTypes = {
	enigmaView: PropTypes.any.isRequired
}

export default TemplateEnigma
