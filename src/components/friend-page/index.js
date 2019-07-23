import React from 'react'

import TabChooser from './TabChooser'
import TableFriends from './TableFriends'
import TableWaitingFriends from './TabWaitingFriends'

class FriendsView extends React.Component {
	state = {
		friends: [],
		waitingFriends: []
	}
	fetchFriends = async () => {
		const friends = await this.props.userService.getFriends()
		if (friends.length !== undefined) {
			this.setState({ friends: friends })
		}
	}
	fetchWaitingFriends = async () => {
		const waitingFriends = await this.props.userService.getFriendRequest()
		if (waitingFriends.length !== undefined) {
			this.setState({ waitingFriends: waitingFriends })
		}
	}
	componentDidMount = async () => {
		this.fetchFriends()
		this.fetchWaitingFriends()
	}

	render() {
		return (
			<>
				<TabChooser userService={this.props.userService} />
				{this.state.friends.length > 0 && (
					<TableFriends
						history={this.props.history}
						friends={this.state.friends}
					/>
				)}
				{this.state.waitingFriends.length > 0 && (
					<TableWaitingFriends
						waitingFriends={this.state.waitingFriends}
						userService={this.props.userService}
						fetchWaitingFriends={this.fetchWaitingFriends}
						fetchFriends={this.fetchFriends}
					/>
				)}
			</>
		)
	}
}

export default FriendsView
