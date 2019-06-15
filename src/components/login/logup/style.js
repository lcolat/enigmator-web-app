const style = theme => ({
	textField: {
		width: '250px'
	},
	content: {
		// [theme.breakpoints.down('sm')]: {
		// 	marginTop: '15vh'
		// },
		// marginTop: '20vh'
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
})

export default style
