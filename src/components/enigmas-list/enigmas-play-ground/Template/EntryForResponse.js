import React from 'react';

import {makeStyles, TextField, withStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
	marginTextField: {
		margin: theme.spacing(1)
	}
}));

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'green',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'green',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'red',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green',
			},
		},
	},
})(TextField);

function EntryForWord() {
	const classes = useStyles();
	
	return (
		<CssTextField
			className={classes.marginTextField}
			label="Response"
			variant="outlined"
			id="entry-response"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton aria-label="Submit" size="medium">
							<Gavel fontSize="inherit"/>
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}

export default EntryForWord;