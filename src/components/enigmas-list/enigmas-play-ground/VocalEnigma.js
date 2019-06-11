import React from 'react';
import PropType from "prop-types";

import {withStyles} from '@material-ui/core';
import {Grid} from '@material-ui/core';

import {Slider} from "@material-ui/lab";

import {MusicNoteRounded, VolumeDown, VolumeUp} from "@material-ui/icons";


const styles = theme => ({
	root: {
		display: 'flex',
		//width: "80%",
		//height: 300
	},
	rootSliderSound: {
		//display: 'flex',
		width: "80%",
		//height: 100,
	},
	sliderSound: {
		padding: '5px 0px',
		margin: theme.spacing.unit * 0.5,
		marginRight: 0
	},
	rootSliderVolume: {
		display: 'flex',
		width: "100%",
		height: 80,
	},
	sliderVolume: {
		padding: '0px 10px',
		width: 0,
		margin: theme.spacing.unit * 0.5,
		marginBottom: 0
	},
	iconsVolume: {
		display: 'flex',
		height: 80
	}
});

class VocalEnigma extends React.Component {
	state = {
		currentVolume: this.props.volume,
		soundAdvancement: 0,
	};
	
	render() {
		const maxVolume = 17;
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
				<Grid container direction={"column"}>
					<div className={classes.rootSliderSound}>
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
					</div>
					<div className={classes.rootSliderVolume}>
						<Grid container direction={"row"} justify={"flex-end"}>
							<Slider className={classes.sliderVolume}
							        vertical
							        value={currentVolume}
							        min={0}
							        max={maxVolume}
							        step={1}
							        onChange={handleChangeVolume}/>
							<div className={classes.iconsVolume}>
								<Grid item container justify={"space-between"} direction={"column"}>
									<Grid item>
										<VolumeUp/>
									</Grid>
									<Grid item>
										{currentVolume}
									</Grid>
									<Grid item>
										<VolumeDown/>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</div>
				</Grid>
			</div>
		);
	};
}

VocalEnigma.propTypes = {
	volume: PropType.number.isRequired,
	soundDuration: PropType.number.isRequired
};


export default withStyles(styles)(VocalEnigma)