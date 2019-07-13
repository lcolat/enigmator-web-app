const style = theme => ({
	root: {
		margin: theme.spacing(3)
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	enigmas: {
		minWidth: 500
	},
	// tableWrapper: {
	// 	overflowX: 'auto'
	// },
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	createEnigmaPaper: {
		marginTop: `calc(50vh - ${theme.spacing(7)}px)`,
		transform: 'translateY(-50%)',
		width: 'max-content',
		margin: 'auto'
	},
	createEnigma: {
		padding: theme.spacing(3)
	}
})

export default style
