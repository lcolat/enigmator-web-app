import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'

class Header extends Component {
	render() {
		return (
			<AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Enigmator
                    </Typography>
             </Toolbar>
			</AppBar>
		)
	}
}

export default Header
