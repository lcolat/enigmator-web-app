import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import {AutoSizer, Column, Table} from 'react-virtualized';

import {Check, Close, Send, WatchLater} from "@material-ui/icons";
import ListUserStatus from "../../../model/User"
import Button from "@material-ui/core/Button";


const styles = theme => ({
	flexContainer: {
		display: 'flex',
		alignContent: "center",
		boxSizing: 'border-box',
	},
	tableRow: {
		cursor: 'pointer',
	},
	tableRowHover: {
		'&:hover': {
			backgroundColor: theme.palette.grey[200],
		},
	},
	tableCell: {
		flex: 1,
	},
	noClick: {
		cursor: 'initial',
	},
});

class MuiVirtualizedTable extends React.PureComponent {
	static defaultProps = {
		headerHeight: 48,
		rowHeight: 48,
	};
	
	static switchInvitStatus(status) {
		
		switch (status) {
			case "waitingResponse":
				return <WatchLater/>;
			case "accepted":
				return <Check/>;
			case "refused":
				return <Close/>;
			default :
				return "NONE";
		}
	};
	
	static formatCellData(index, data) {
		switch (index) {
			case 1:
				return MuiVirtualizedTable.switchInvitStatus(data);
			
			case 2:
				return <Button><Send color={"primary"}/></Button>;
			
			case 0:
			default:
				return data;
		}
	};
	
	getRowClassName = ({index}) => {
		const {classes} = this.props;
		
		return clsx(classes.tableRow, classes.flexContainer, classes.tableRowHover);
	};
	
	cellRenderer = ({cellData, columnIndex}) => {
		const {columns, classes, rowHeight} = this.props;
		return (
			<TableCell
				component="div"
				classes={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
				style={{height: rowHeight}}
				variant="body"
				align={columns[columnIndex].align}
			>
				{MuiVirtualizedTable.formatCellData(columnIndex, cellData)}
			</TableCell>
		);
	};
	
	headerRenderer = ({label, columnIndex}) => {
		const {headerHeight, columns, classes} = this.props;
		
		return (
			<TableCell
				component="div"
				className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
				variant="head"
				style={{height: headerHeight}}
				align={columns[columnIndex].align}
			>
				<span>{label}</span>
			</TableCell>
		);
	};
	
	render() {
		const {classes, columns, ...tableProps} = this.props;
		return (
			<AutoSizer>
				{({height, width}) => (
					<Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
						{columns.map(({dataKey, ...other}, index) => {
							return (
								<Column
									key={dataKey}
									headerRenderer={headerProps =>
										this.headerRenderer({
											...headerProps,
											columnIndex: index,
										})
									}
									className={classes.flexContainer}
									cellRenderer={this.cellRenderer}
									dataKey={dataKey}
									{...other}
								/>
							);
						})}
					</Table>
				)}
			</AutoSizer>
		);
	}
}

MuiVirtualizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	headerHeight: PropTypes.number,
	onRowClick: PropTypes.func,
	rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = ['DamSaulGoodMan', 'Saïtama', 'LaMereARaynal', 'LaSoeurARaynal', 'Kalfa'];

//const rows = [sample.map(row => createData(row))];
const rows = sample.map(pseudo => {
	return {pseudo};
});

/*rows.push(createData(i, ...randomSelection));*/

function TableUserConnected() {
	return (
		<Paper style={{height: 300, width: '100%'}}>
			<VirtualizedTable
				rowCount={rows.length}
				rowGetter={({index}) => rows[index]}
				columns={[
					{
						width: 200,
						label: 'Pseudo',
						dataKey: 'pseudo',
						align: "left"
					},
					{
						width: 200,
						label: 'Status Request',
						dataKey: 'statusRequest',
						align: "center"
					},
					{
						width: 200,
						label: 'Send Invitation',
						dataKey: 'add',
						align: "right"
					}
				]}
			/>
		</Paper>
	);
}

export default TableUserConnected;