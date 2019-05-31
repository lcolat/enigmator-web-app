const style = theme => ({
	content: {
		[theme.breakpoints.down('sm')]: {
			marginTop: 'calc((100vh - 15vh)/2)',
			transform: 'translateY(-70%)'
		},
		marginTop: 'calc(40vh)',
		transform: 'translateY(-70%)'
	},
	textField: {
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
})

export default style
