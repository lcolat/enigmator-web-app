import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

const style = theme => ({
	input: {
		display: 'none'
	},
	button: {
		margin: theme.spacing(1),
		color: theme.palette.primary.main
	}
})
class FileSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fileName: ''
		}
		props.setMediaType(props.mediaType)
	}

	handleChange = selected => {
		this.setState({ fileName: selected[0].name })
		this.props.setFile(selected[0])
	}
	render() {
		const { classes } = this.props
		return (
			<Grid
				container
				direction={'row'}
				justify={'center'}
				alignItems={'center'}>
				<input
					accept={`${this.props.mediaType}/*`}
					className={classes.input}
					id="raised-button-file"
					onChange={event => this.handleChange(event.target.files)}
					type="file"
				/>
				<label htmlFor="raised-button-file">
					<Button
						variant="contained"
						color="secondary"
						component="span"
						className={classes.button}>
						Selectionner le fichier
					</Button>
				</label>
				<Typography>{this.state.fileName}</Typography>
			</Grid>
		)
	}
}

export default withStyles(style)(FileSelector)
