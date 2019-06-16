import React from 'react';
import PropType from "prop-types";

import {Grid, Avatar, Typography, Button, makeStyles, Paper} from '@material-ui/core';
import {Input} from "@material-ui/icons";



const useStyles = makeStyles(theme => ({
	
	avatar: {
		margin: theme.spacing(1),
		width: 100,
		height: 100,
	},
	gridInfo: {
		height: 100,
	},
	name: {
		fontStyle: 'bold',
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(1)
	},
	creator: {
		fontStyle: 'italic',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	rootPaper: {
		width: "100%",
	},
	paper: {
		minHeight: 150,
		padding: theme.spacing(1)
	}
}));

// const subject = {name: "Toto", creator: "DamSaulGoodMan", date: "18/08/1997, 00:00", avatar: "",
// body: "C'est moi le body !!!!!!!!!!!!!!!!!!!!!!"};

function HeaderThread(props) {
	const {isEnigmaThread, subject} = props;
	const classes = useStyles();
	
	return (
		<div>
			<Grid container direction={"row"} justify={"space-between"}>
				<Grid item>
					<Grid container direction={"row"} justify={"flex-start"}>
						<Avatar alt={subject.creator}
						        src={subject.avatar !== "" ? subject.avatar :
							        process.env.PUBLIC_URL + '/img/default-profile-picture.jpg'}
						        className={classes.avatar}/>
						<div>
							<Grid className={classes.gridInfo} container direction={"column"} alignItems={"flex-start"}
							      justify={"space-between"}>
								<Typography className={classes.name} variant={"h4"}>{subject.name}</Typography>
								<div>
									<Grid container direction={"row"} alignItems={"flex-end"}>
										<Typography className={classes.creator}
										            variant={"h5"}>{subject.creator}</Typography>
										<Typography>{subject.date}</Typography>
									</Grid>
								</div>
							</Grid>
						</div>
					</Grid>
				</Grid>
				{isEnigmaThread &&
				<Grid item>
					<Grid container alignItems={"flex-end"}>
						<Grid item>
							<Button variant="contained" color="primary" className={classes.button}>
								Enigma
								<Input className={classes.rightIcon}/>
							</Button>
						</Grid>
					</Grid>
				</Grid>}
			</Grid>
			<Grid container direction={"column"} justify={"flex-start"} alignItems={"center"}>
				<div className={classes.rootPaper}>
					<Paper className={classes.paper}>
						<Grid container justify={"flex-start"}>
							{subject.body}
						</Grid>
					</Paper>
				</div>
			</Grid>
		</div>
	);
}

HeaderThread.propTypes = {
	subject: PropType.object.isRequired,
	isEnigmaThread: PropType.bool
};


export default HeaderThread;