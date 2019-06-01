import React from 'react';
import {DialogTitle, DialogActions, DialogContent, Dialog} from '@material-ui/core';
import {Tab, Tabs, Button} from "@material-ui/core";
import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";

function SelectPlayMode(props) {
	const {onOpen, ...other} = props;
	const [value, setValue] = React.useState(0);
	
	function handleClose() {
		onOpen(false);
	}
	
	function handleClickOpen() {
		onOpen(true);
	}
	
	function handleChange(event, newValue) {
		setValue(newValue);
	}
	
	
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			{...other}
		>
			<DialogTitle id="dialog-title">{"Choose The Play Mode"}</DialogTitle>
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
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Disagree
				</Button>
				<Button onClick={handleClose} color="primary" autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SelectPlayMode;