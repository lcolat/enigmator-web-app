import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import {Button, Divider} from "@material-ui/core";

import {AddComment, Input} from "@material-ui/icons";

import HeaderThread from "./HeaderThread";
import Post from "./Post";


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
}));

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
}, {
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
}];

function Thread(props) {
	const {} = props;
	const classes = useStyles();
	
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
			<Button variant="contained" color="primary" className={classes.button}>
				Add Post
				<AddComment className={classes.rightIcon}/>
			</Button>
		</div>
	);
}

Thread.propTypes = {};


export default Thread;