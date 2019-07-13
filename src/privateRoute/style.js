import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		width: `calc(100vw - ${theme.spacing(9) + 1}px)`,
		overflowY: 'auto'
	},
	logout: {}
}))

export default useStyles
