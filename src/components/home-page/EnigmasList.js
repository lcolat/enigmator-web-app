import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {LocalActivity} from "@material-ui/icons"

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {toolTipsStyles} from "./ToolTipsStyles"

let counter = 0;

function createData(nameEnigma, creatorName, kind, difficulty, dateOfCreation, pointValue, description) {
	counter += 1;
	return {
		id: counter,
		name: nameEnigma,
		author: creatorName,
		type: kind,
		level: difficulty,
		date: dateOfCreation,
		score: pointValue,
		info: description
	};
}

const styles = theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
});

class AlignItemsList extends React.Component {

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };
	
	state = {
        arrowRef: null,

		rows: [
			createData('SuperEnigma',
				"DamSaulGoodMan",
				"audio",
				"easy",
				"23:36, 10/05/19",
				25,
				"A free one :)"),
			createData('Who have 4-2-3 paws?',
				"The Sphinx",
				"text",
				"hard",
				"02:59, 02/05/19",
				75,
				"Œdipe solve it"),
			createData('What did the third Dwarf take?',
				"Dora",
				"text",
				"medium",
				"23:10, 10/05/19",
				50,
				"Brain f*ck*ng enigma"),
			createData("v<^<^>v<^^<><<>>v>",
				"Saïtama",
				"picture",
				"demon",
				"09:00, 11/11/17",
				100,
				"All the enigma is in the title ;), i hope you will follow the right way !")
		].sort((a, b) => (a.date < b.date ? -1 : 1)),
	};
	
	// const { classes } = props;
	render() {
		const {classes} = this.props;
		const {rows} = this.state;
		
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableCell align="left" style={{height: 26}}>Name</TableCell>
							<TableCell align="left" style={{height: 26}}>Author</TableCell>
							<TableCell align="left" style={{height: 26}}>Kind</TableCell>
							<TableCell align="left" style={{height: 26}}>Level</TableCell>
							<TableCell align="left" style={{height: 26}}>Date</TableCell>
							<TableCell align="left" style={{height: 26}}>
								<LocalActivity/>
							</TableCell>
						</TableHead>
						<TableBody>
							{rows.map(row => (
                                <Tooltip
                                    classes={{
                                        popper: classes.htmlPopper,
                                        tooltip: classes.htmlTooltip,
                                    }}
                                    PopperProps={{
                                        popperOptions: {
                                            modifiers: {
                                                arrow: {
                                                    enabled: Boolean(this.state.arrowRef),
                                                    element: this.state.arrowRef,
                                                },
                                            },
                                        },
                                    }}
                                    title={
                                        <React.Fragment>
                                            <Typography color="inherit">Tooltip with HTML</Typography>
                                            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                            {"It's very engaging. Right?"}
                                            <span className={classes.arrow} ref={this.handleArrowRef}/>
                                        </React.Fragment>
                                    }
                                >
                                    <TableRow key={row.id}
                                              style={{height: 36, cursor: "pointer"}}
                                              onClick={() => {
                                                  alert("Soon able to go to the enigma :)")
                                              }}
                                              hover
                                    >
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="left" scope="row">{row.author}</TableCell>
                                        <TableCell align="left">{row.type}</TableCell>
                                        <TableCell align="left">{row.level}</TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left">{row.score}</TableCell>
                                    </TableRow>
                                </Tooltip>
							))}
						</TableBody>
					</Table>
				</div>
			</Paper>
		);
	}
}

AlignItemsList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles, toolTipsStyles)(AlignItemsList);