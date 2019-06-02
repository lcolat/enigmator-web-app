import React from 'react';

import {makeStyles} from "@material-ui/core/index";
import {DialogTitle, DialogActions, DialogContent, Dialog} from '@material-ui/core/index';
import {Tab, Tabs, Button} from "@material-ui/core/index";
import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot, PlayCircleOutline} from "@material-ui/icons/index";
import Paper from "@material-ui/core/Paper/index";

import TableUserConnected from "./TableUserConnected"


const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1),
	}
}));

function PlayModeDialogue(props) {
	const classes = useStyles();
	const {onOpen, enigma, ...other} = props;
	const [value, setValue] = React.useState(0);
	
	function handleClose() {
		onOpen(false);
	}
	
	
	function handleChange(event, newValue) {
		setValue(newValue);
	}
	
	
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			maxWidth={"md"}
			{...other}
		>
			<DialogTitle id="dialog-title">{"Choose the Play Mode for: " + enigma.name}</DialogTitle>
			<DialogContent>
				<Paper>
					<Tabs
						value={value}
						onChange={handleChange}
						variant="fullWidth"
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab icon={<Rowing/>} label={"Solo"}/>
						<Tab icon={<SupervisedUserCircle/>} label={"Multi"}/>
						<Tab icon={<Whatshot/>} label={"PvP"}/>
					</Tabs>
				</Paper>
				<TableUserConnected/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleClose} color="primary">
					PLAY
					<PlayCircleOutline className={classes.rightIcon}/>
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PlayModeDialogue;