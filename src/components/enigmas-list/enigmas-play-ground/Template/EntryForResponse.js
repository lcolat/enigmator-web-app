import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Gavel from '@material-ui/icons/Gavel'

const useStyles = makeStyles(theme => ({
	marginTextField: {
		margin: theme.spacing(1)
	}
}))

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'green'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red'
			},
			'&:hover fieldset': {
				borderColor: 'yellow'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green'
			}
		}
	}
})(TextField)

function EntryForWord() {
	const classes = useStyles()

	return (
		<div>
			<CssTextField
				className={classes.marginTextField}
				label="Response"
				variant="outlined"
				id="entry-response"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton aria-label="Submit" size="medium">
								<Gavel fontSize="inherit" />
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</div>
	)
}

export default EntryForWord
