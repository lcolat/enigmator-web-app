const style = theme => ({
	content: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '15vh'
		},
		marginTop: '20vh'
	},
	email: {
		minWidth: '250px'
	},
	password: {
		minWidth: '250px'
	},
	button: {
		minWidth: '125px',
		marginTop: '1.5vh',
		marginBottom: '1.5vh'
	},
	enigmatorLogo: {
		[theme.breakpoints.down('sm')]: {
			height: '15vh'
		},
		height: '20vh'
	}
});

export default style
