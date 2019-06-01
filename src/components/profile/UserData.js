import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {withStyles} from '@material-ui/core/styles';
import {TextField, MenuItem, Avatar, Typography, Grid} from "@material-ui/core";


const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	margin: {
		margin: "normal",
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
	avatar: {
		margin: 10,
		width: 120,
		height: 120
	}
});

const statusList = [
	{value: "Connected", label: "Connected"},
	{value: "Disconnected", label: "Disconnected"},
	{value: "Absent", label: "Absent"},
	{value: "Do not Disturb", label: "Do not Disturb"}
];


class UserData extends React.Component {
	
	state = {
		pseudo: "DamSaulGoodMan",
		firstName: "Damien",
		lastName: "Capron",
		birthday: "18/08/1997",
		state: "French",
		status: "Connected",
		email: "capron.damien@laposte.net",
		oldPassword: "",
		newPassword: ""
	};
	
	handleChange = prop => event => {
		this.setState({[prop]: event.target.value});
	};
	
	render() {
		const {classes} = this.props;
		
		return (
			<form className={classes.container} noValidate autoComplete="off">
				<Grid container direction={"row"}>
					<Grid item>
						<Grid container direction={"column"}>
							<Typography variant="h6" align={"left"}>
								PSEUDO
							</Typography>
							<TextField
								id="text-field-pseudo"
								label="Pseudo"
								className={classNames(classes.margin, classes.textField)}
								value={this.state.pseudo}
								onChange={this.handleChange("pseudo")}
								margin="normal"
								variant="outlined"
							/>
							<Typography variant="h6" align={"left"}>
								NAME
							</Typography>
							<Grid container direction={"row"}>
								<TextField
									id="text-field-firstName"
									label="First Name"
									className={classNames(classes.margin, classes.textField)}
									value={this.state.firstName}
									onChange={this.handleChange("firstName")}
									margin="normal"
									variant="outlined"
								/>
								<TextField
									id="text-field-last-name"
									label="Last Name"
									className={classNames(classes.margin, classes.textField)}
									value={this.state.lastName}
									onChange={this.handleChange("lastName")}
									margin="normal"
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</Grid>
					<Avatar alt="Remy Sharp"
					        src={process.env.PUBLIC_URL + '/img/default-profile-picture.png'}
					        className={classes.avatar}/>
				</Grid>
				<Grid container direction={"column"}>
					<Grid item xl>
						<Typography variant="h6" align={"left"}>
							INFOS
						</Typography>
					</Grid>
					<Grid container direction={"row"} justify={"space-between"}>
						<TextField
							id="text-field-birthday"
							label="Birthday"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.birthday}
							onChange={this.handleChange("birthday")}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="text-field-state"
							label="State"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.state}
							onChange={this.handleChange("state")}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="text-field-status"
							label="Status"
							select
							className={classNames(classes.margin, classes.textField)}
							value={this.state.status}
							onChange={this.handleChange("status")}
							SelectProps={{
								MenuProps: {
									className: classes.menu
								}
							}}
							margin="normal"
							variant="outlined"
						>
							{statusList.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<TextField
						id="text-field-email"
						label="Email"
						className={classNames(classes.margin, classes.textField)}
						value={this.state.email}
						onChange={this.handleChange("email")}
						margin="normal"
						variant="outlined"
					/>
				</Grid>
				<Grid container direction={"column"}>
					<Typography variant="h6" align={"left"}>
						PASSWORD
					</Typography>
					<Grid container direction={"row"}>
						<TextField
							id="text-field-old-password"
							label="Old Password"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.oldPassword}
							onChange={this.handleChange("oldPassword")}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							id="text-field-new-password"
							label="New password"
							className={classNames(classes.margin, classes.textField)}
							value={this.state.newPassword}
							onChange={this.handleChange("newPassword")}
							margin="normal"
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default withStyles(styles)(UserData);