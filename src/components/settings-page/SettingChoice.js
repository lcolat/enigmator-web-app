import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	formControl: {
		margin: theme.spacing(3)
	},
	group: {
		margin: theme.spacing(1, 0)
	}
}))

function SettingChoice(props) {
	const { groupName, choices, getChange } = props
	const classes = useStyles()
	const [value, setValue] = React.useState(choices[0].value)

	function handleChange(event) {
		setValue(event.target.value)
		if (getChange) getChange(value)
	}

	return (
		<div className={classes.root}>
			<FormControl component="fieldset" className={classes.formControl}>
				<Grid container>
					<FormLabel>{groupName}</FormLabel>
				</Grid>
				<RadioGroup
					aria-label="groupName"
					name={groupName}
					className={classes.group}
					value={value}
					onChange={handleChange}
					row>
					{choices.map((choice, index) => (
						<FormControlLabel
							key={`${index}-${choice.value}-${choice.name}`}
							value={choice.value}
							checked={choice.value === value}
							control={<Radio color="primary" />}
							label={choice.name}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	)
}

SettingChoice.propTypes = {}

export default SettingChoice
