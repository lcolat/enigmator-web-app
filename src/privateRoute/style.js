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
		marginTop: theme.spacing(0),
		marginLeft: theme.spacing(7) + 1,
		width: `calc(100vw - ${theme.spacing(7) + 1}px)`,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(9) + 1,
			width: `calc(100% - ${theme.spacing(9) + 1}px)`
		}
	}
}))

export default useStyles
