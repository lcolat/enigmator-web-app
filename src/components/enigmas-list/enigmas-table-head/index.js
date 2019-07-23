import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import ThumbUp from '@material-ui/icons/ThumbUp'
import LocalActivity from '@material-ui/icons/LocalActivity'

const headRows = [
	{ id: 'likes', align: 'center', disablePadding: false, label: 'Likes' },
	{ id: 'name', align: 'left', disablePadding: true, label: 'Nom' },
	{
		id: 'username',
		align: 'left',
		disablePadding: false,
		label: 'Créateur'
	},
	{ id: 'type', align: 'left', disablePadding: false, label: 'Type' },
	{ id: 'difficulty', align: 'left', disablePadding: false, label: 'Niveau' },
	{ id: 'creationDate', align: 'left', disablePadding: false, label: 'Date' },
	{ id: 'scoreReward', align: 'left', disablePadding: false, label: 'Points' }
]

function EnigmasTableHead(props) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headRows.map(row => (
					<TableCell
						key={row.id}
						align={row.align}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}>
							{(function() {
								switch (row.label) {
									case 'Likes':
										return <ThumbUp fontSize={'small'} />
									case 'Points':
										return <LocalActivity fontSize={'small'} />
									default:
										return row.label
								}
							})()}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnigmasTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
}

export default EnigmasTableHead
