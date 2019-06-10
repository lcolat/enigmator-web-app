import React from 'react';
import PropType from "prop-types";

import {withStyles} from '@material-ui/core';
import {Grid} from '@material-ui/core';

import {Slider} from "@material-ui/lab";

import {MusicNoteRounded} from "@material-ui/icons";


const styles = theme => ({
	root: {
		width: "80%",
		height: 300
	},
	sliderSound: {
		padding: '22px 0px',
		margin: theme.spacing.unit,
	},
	rootSliderVolume: {
		display: 'flex',
		height: 300,
	},
	sliderVolume: {
		padding: '0px 22px',
		// margin: theme.spacing.unit,
	}
});

class VocalEnigma extends React.Component {
	state = {
		currentVolume: this.props.volume,
		soundAdvancement: 0,
	};
	
	render() {
		const {classes, soundDuration} = this.props;
		const {currentVolume, soundAdvancement} = this.state;
		
		const handleChangeVolume = (event, currentVolume) => {
			this.setState({currentVolume});
		};
		const handleChangeSoundAdvancement = (event, soundAdvancement) => {
			this.setState({soundAdvancement});
		};
		
		return (
			<div className={classes.root}>
				<Grid container>
					<Slider className={classes.sliderSound}
					        value={soundAdvancement}
					        min={0}
					        max={soundDuration}
					        thumb={<MusicNoteRounded/>}
					        onChange={handleChangeSoundAdvancement}/>
					<Grid item container justify="space-between">
						<Grid item>
							{soundAdvancement}
						</Grid>
						<Grid item>
							{soundDuration}
						</Grid>
					</Grid>
					<div>
						<Slider className={classes.sliderVolume}
						        vertical
						        value={currentVolume}
						        min={0}
						        max={17}
						        onChange={handleChangeVolume}/>
					</div>
					<Grid item container justify="space-between" direction={"row"}>
						{currentVolume}
						{"17"}
					</Grid>
				</Grid>
			</div>
		);
	};
}

VocalEnigma.propTypes = {};


export default withStyles(styles)(VocalEnigma)