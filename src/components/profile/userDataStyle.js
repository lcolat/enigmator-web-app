const style = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(),
		marginRight: theme.spacing(),
		minWidth: '152px'
	},
	margin: {
		margin: 'normal'
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	},
	avatar: {
		margin: 10,
		width: 120,
		height: 120,
		maxWidth: '100%',
		maxHeight: '100%'
	},
	buttonDel: {
		marginTop: theme.spacing(1),
		color: 'white',
		background: '#c62828'
	}
})
export default style
