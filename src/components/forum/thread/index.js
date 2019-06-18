import React from 'react';
import PropType from "prop-types";

import {makeStyles, Paper} from '@material-ui/core';
import {Button, Divider, TextField, Grid} from "@material-ui/core";

import {AddComment, Input} from "@material-ui/icons";

import HeaderThread from "./HeaderThread";
import Post from "./Post";



const subject = {
	name: "Toto", creator: "DamSaulGoodMan", date: "18/08/1997, 00:00", avatar: "",
	body: "This is the description of the enigma"
};

const postsData = [{
	title: "Hello Word",
	date: "18/08/1997, 00:00",
	creator: {name: "DamSaulGoodMan", avatar: false},
	like: {number: 10, byUser: false},
	body: "Where can i...",
	comment: [{
		name: "DamSaulGoodMan",
		date: "18/08/1997, 00:01",
		like: {number: 10, byUser: false},
		body: "Hello i'm a comment"
	}, {
		name: "DamSaulGoodMan",
		date: "18/08/1997, 00:02",
		like: {number: 10, byUser: true},
		body: "Hello i'm a second comment"
	}]
}/*, {
	title: "Yolo",
	date: "19/08/1997, 10:01",
	creator: {name: "DamSaulGoodMan", avatar: false},
	like: {number: 10, byUser: false},
	body: "Go there and you will...",
	comment: [{
		name: "DamSaulGoodMan",
		date: "19/08/1997, 00:01",
		like: {number: 10, byUser: false},
		body: "Hello i'm a comment"
	}, {
		name: "DamSaulGoodMan",
		date: "19/08/1997, 00:02",
		like: {number: 10, byUser: true},
		body: "Hello i'm a second comment"
	}]
}, {
	title: "Swag",
	date: "19/08/1997, 10:02",
	creator: {name: "DamSaulGoodMan", avatar: false},
	like: {number: 10, byUser: false},
	body: "Go there and you will...",
	comment: [{
		name: "DamSaulGoodMan",
		date: "19/08/1997, 00:01",
		like: {number: 10, byUser: false},
		body: "Hello i'm a comment"
	}, {
		name: "DamSaulGoodMan",
		date: "19/08/1997, 00:02",
		like: {number: 10, byUser: true},
		body: "Hello i'm a second comment"
	}]
}*/];

const useStyles = makeStyles(theme => ({
	rootHeader: {
		margin: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	newPostRoot: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	textFieldNewPostBody: {
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	}
}));


function Thread(props) {
	const {} = props;
	const classes = useStyles();
	const [addNewPostView, setAddNewPostView] = React.useState(false);
	const [labelNewPost, setLabelNewPost] = React.useState("ADD POST");
	
	function handleShowNewPostView() {
		if (addNewPostView) {
			setAddNewPostView(false);
			setLabelNewPost("ADD POST");
		} else {
			setAddNewPostView(true);
			setLabelNewPost("SEND");
		}
	}
	
	return (
		<div>
			<div className={classes.rootHeader}>
				<HeaderThread subject={subject} isEnigmaThread/>
			</div>
			{postsData.map(post => (
				<div key={`${post.title}-${post.date}-${post.creator}`}>
					<Divider variant={"middle"}/>
					<Divider variant={"middle"}/>
					<Post postData={post}/>
				</div>
			))}
			{addNewPostView &&
			<Paper className={classes.newPostRoot}>
				<Grid container direction={"column"} alignItems={"stretch"} justify={"flex-start"}>
					<TextField
						id="title-post"
						label="Name"
						className={classes.textField}
						margin="normal"
					/>
					<TextField
						id="body-post"
						label="Post Body"
						className={classes.textFieldNewPostBody}
						multiline
						rows="4"
						margin="normal"
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</Paper>
			}
			<Button variant="contained" color="primary" className={classes.button} onClick={handleShowNewPostView}>
				{labelNewPost}
				<AddComment className={classes.rightIcon}/>
			</Button>
		</div>
	);
}

Thread.propTypes = {};


export default Thread;