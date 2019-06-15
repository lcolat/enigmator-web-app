import React from 'react';

import {makeStyles} from "@material-ui/core/index";
import {DialogTitle, DialogActions, DialogContent, Dialog} from '@material-ui/core/index';
import {Tab, Tabs, Button} from "@material-ui/core/index";
import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot, PlayCircleOutline} from "@material-ui/icons/index";
import Paper from "@material-ui/core/Paper/index";

import TableUserConnected from "./TableUserConnected"
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	message: {
		margin: theme.spacing(2)
	}
}));

function PlayModeDialogue(props) {
	
	const [toto, setToto] = React.useState();
	const classes = useStyles();
	const {onOpen, enigma, ...other} = props;
	const [value, setValue] = React.useState(0);
	const [message, setMessage] = React.useState("Choose the Game Type and if it's Grouped, your Friend too!");
	
	function handleClose() {
		onOpen(false);
	}
	
	function handleChange(event, newValue) {
		setValue(newValue);
	}
	
	function handleLaunchGame() {
		setMessage("Your Game will Begin Soon ...")
	}
	
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			maxWidth={"sm"}
			{...other}
		>
			<DialogTitle style={{alignSelf: "center"}} id="dialog-title">{enigma.name}</DialogTitle>
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
				<Typography className={classes.message} classes={"body1"}>
					{message}
				</Typography>
				<TableUserConnected/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleLaunchGame} color="primary">
					PLAY
					<PlayCircleOutline className={classes.rightIcon}/>
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PlayModeDialogue;