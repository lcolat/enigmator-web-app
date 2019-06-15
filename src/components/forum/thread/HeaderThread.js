import React from 'react';
import PropType from "prop-types";

import {Grid, Avatar, Typography, makeStyles} from '@material-ui/core';


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
	}
}));

const subject = {name: "Toto", creator: "DamSaulGoodMan", date: "18/08/1997, 00:00", avatar: ""};

function HeaderThread(props) {
	const {} = props;
	const classes = useStyles();
	
	return (
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
							<Typography className={classes.creator} variant={"h5"}>{subject.creator}</Typography>
							<Typography>{subject.date}</Typography>
						</Grid>
					</div>
				</Grid>
			</div>
		</Grid>
	);
}

HeaderThread.propTypes = {};


export default HeaderThread;