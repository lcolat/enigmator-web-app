import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	// content: {
	// 	marginTop: theme.spacing(0),
	// 	marginLeft: theme.spacing(7) + 1,
	// 	width: `calc(100vw - ${theme.spacing(7) + 1}px)`,
	// 	[theme.breakpoints.up('sm')]: {
	// 		marginLeft: theme.spacing(9) + 1,
	// 		width: `calc(100% - ${theme.spacing(9) + 1}px)`
	// 	}
	// }
	content: {
		flexGrow: 1,
		// marginLeft: theme.spacing(7) + 1,
		width: `calc(100vw - ${theme.spacing(7) + theme.spacing(4) + 2}px)`
		// width: `calc(100vw - ${theme.spacing(2) + 160 + 2}px)`
		// [theme.breakpoints.up('sm')]: {
		// 	marginLeft: theme.spacing(9) + 1,
		// 	width: `calc(100% - ${theme.spacing(9) + 1}px)`
		// }
	},
	logout: {}
}))

export default useStyles
