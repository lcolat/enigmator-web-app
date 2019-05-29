import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	typography: {
		useNextVariants: true,
		fontFamily: ['Nunito'].join(',')
	},
	palette: {
		primary: {
			main: '#ae75e9'
		},
		secondary: {
			main: '#ffffff'
		},
		thumbUpLiked: {
			main: "#beff69"
		}
	}
})
