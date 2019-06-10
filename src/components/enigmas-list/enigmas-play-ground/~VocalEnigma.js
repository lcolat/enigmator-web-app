import React from 'react';
import PropType from "prop-types";

import {makeStyles} from "@material-ui/core";

import {Slider} from "@material-ui/lab";

import TemplateEnigma from "./Template";


const useStyles = makeStyles(theme => ({
	root: {
		width: 300,
	},
	sliderSound: {
		padding: '22px 0px',
	},
	sliderVolume: {
		padding: '22px 0px',
	},
}));


function VocalView(props) {
	const {soundDuration, volume} = props;
	const classes = useStyles();
	const [currentVolume, setCurrentVolume] = React.useState(volume);
	const [soundAdvancement, setSoundAdvancement] = React.useState(0);
	
	const handleChangeVolume = (event, newVolume) => {
		setCurrentVolume(newVolume);
	};
	const handleChangeSoundAdvancement = (event, newPosition) => {
		setSoundAdvancement(newPosition);
	};
	
	return (
		<div>
			<Slider className={classes.sliderSound}
			        value={soundAdvancement}
			        min
			        aria-labelledby="label"
			        onChange={handleChangeSoundAdvancement}/>
		</div>
	);
}


function VocalEnigma(props) {
	const {} = props;
	
	return (
		<div>
			<VocalView volume={0} soundDuration={10}/>
			{/*<TemplateEnigma enigmaView={}/>*/}
		</div>
	);
}

VocalEnigma.propTypes = {};


export default VocalEnigma