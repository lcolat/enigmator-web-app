import React from 'react';

import {makeStyles, TextField, withStyles} from "@material-ui/core";

import {InputAdornment, IconButton} from "@material-ui/core";

import {Gavel} from "@material-ui/icons";



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
								<Gavel fontSize="inherit"/>
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
}

export default EntryForWord;