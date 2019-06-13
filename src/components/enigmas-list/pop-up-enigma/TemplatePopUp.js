import React from 'react';
import PropType from "prop-types";

import {Grid, makeStyles} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {Button, Slide} from "@material-ui/core";

import {LocalPlay} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";


const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	image: {
		width: 300,
		height: 100
	}
}));


function TemplatePopUp(props) {
	const {score, image, isOpen} = props;
	const classes = useStyles();
	const [open, setOpen] = React.useState(isOpen ? true : false);
	
	function handleClose() {
		setOpen(false);
	}
	
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
				maxWidth={"md"}
			>
				<DialogTitle id="alert-dialog-slide-title">
					<Grid container alignItems={"stretch"} direction={"column"}>
						<img width={"100%"}
						     alt={"msg-pop-up"}
						     src={image}/>
					</Grid>
				</DialogTitle>
				{score && <DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<Grid container alignItems={"stretch"} justify={"center"} direction={"row"}>
							<Typography variant={"h5"}>
								NEW SCORE:
							</Typography>
							<Typography variant={"h5"} style={{marginLeft: 10}}>
								{score}
							</Typography>
							<LocalPlay color={"primary"}/>
						</Grid>
					</DialogContentText>
				</DialogContent>}
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Go Home
					</Button>
					<Button onClick={handleClose} color="primary">
						Go to Enigmas List
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

TemplatePopUp.propTypes = {
	score: PropType.number,
	isOpen: PropType.bool,
	image: PropType.string.isRequired
};


export default TemplatePopUp;