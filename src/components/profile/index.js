import React from 'react'

import UserData from './UserData'
import { StatsTable } from '../../common'
import TableListEnigmasTried from './TableListEnigmasTried'
import TableListOwnEnigmas from './TableListOwnEnigmas'
import { Paper } from '@material-ui/core'

class Profile extends React.Component {
	render() {
		const userService = this.props.userService
		return (
			<>
				<Paper>
					<UserData {...this.props} />
				</Paper>
				{/* <Paper>
					<StatsTable />
				</Paper> */}
				{/*<div>*/}
				{/*<hr />*/}
				{/*</div>*/}
				{/*<Paper>*/}
				{/*<TableListOwnEnigmas />*/}
				{/*<TableListEnigmasTried />*/}
				{/*</Paper>*/}
			</>
		)
	}
}

export default Profile
