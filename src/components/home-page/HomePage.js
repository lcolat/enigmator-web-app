import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from '@material-ui/icons';


const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};
	
	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};
	
	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};
	
	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
		);
	};
	
	render() {
		const {classes, count, page, rowsPerPage, theme} = this.props;
		
		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page"
				>
					{theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page"
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page"
				>
					{theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
	TablePaginationActions,
);

let counter = 0;

function createData(nameEnigma, dateLastTry) {
	counter += 1;
	return {id: counter, name: nameEnigma, date: dateLastTry};
}

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

class CustomPaginationActionsTable extends React.Component {
	
	formatDate = "HH:mm DD-MM-YY";
	state = {
		rows: [
			createData('SuperEnigma', /*Moment(*/"23:36 10/05/19"/*, this.formatDate)*/), /*"23:36 10/05/19"*/
			// createData('GuessHerName', "10:01 10/04/19"),
			// createData('Who have 4-2-3 paws?', "02:59 02/05/19"),
			// createData('What did the third Dwarf take?', "23:10 10/05/19"),
			// createData('hihihi', "01:59 07/05/18"),
			// createData('Yolooo', "20:46 10/01/19"),
			// createData('Palindromatique', "23:59 31/12/18"),
			// createData('<><<><<>>>>', "09:00 11/11/17"),
			// createData('Cachochachat', "03:33 03/03/19"),
			// createData('Lollipop', "07:11 26/08/19"),
			// createData('<^>v><<<^^v', "04:26 10/05/19"),
			// createData('MIAM', "20:36 10/08/17"),
			// createData('Thanos has erase the half of this sentence...', "00:01 01/02/17"),
		].sort((a, b) => (a.date < b.date ? -1 : 1)),
		page: 0,
		rowsPerPage: 5,
	};
	
	handleChangePage = (event, page) => {
		this.setState({page});
	};
	
	handleChangeRowsPerPage = event => {
		this.setState({page: 0, rowsPerPage: event.target.value});
	};
	
	render() {
		const {classes} = this.props;
		const {rows, rowsPerPage, page} = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
		
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.date}</TableCell>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow style={{height: 48 * emptyRows}}>
									<TableCell colSpan={6}/>
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										native: true,
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		);
	}
}

CustomPaginationActionsTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);