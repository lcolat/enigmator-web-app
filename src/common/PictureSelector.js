import React from 'react'
import PropType from 'prop-types'

import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'


const styles = {
	input: {
		display: 'none'
	}
}

class PictureSelector extends React.Component {
	state = {
		fileName: ''
	}
	
	handleChange = selected => {
		this.setState({ fileName: selected[0].name })
		this.props.setFile(selected[0])
	}
	
	render() {
		const { classes, children } = this.props
		const {} = this.state
		
		return (
			<Grid>
				<input
					accept={`image/*`}
					className={classes.input}
					id="file-explorer-button"
					onChange={event => this.handleChange(event.target.files)}
					type="file"
				/>
				<label htmlFor="file-explorer-button">{children}</label>
			</Grid>
		)
	}
}

PictureSelector.propTypes = {}


export default withStyles(styles)(PictureSelector)