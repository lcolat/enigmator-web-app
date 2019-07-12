import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

const Loader = ({ loaded, children }) =>
	loaded ? children : <LinearProgress color="primary" />

export default Loader
