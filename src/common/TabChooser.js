import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Tabs, Tab } from '@material-ui/core'

const useStyles = makeStyles(theme => ({}))

function generateTab(list) {
	return list.map(item =>
		item.icon ? (
			<Tab key={item.text} icon={item.icon} label={item.text} />
		) : (
			<Tab key={item.text} label={item.text} />
		)
	)
}

function TabChooser(props) {
	const { eventChange, tabList } = props
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, value) => {
		setValue(value)
		if (eventChange) eventChange(value)
	}

	return (
		<Tabs
			value={value}
			onChange={handleChange}
			variant="fullWidth"
			indicatorColor="secondary"
			textColor="secondary">
			{generateTab(tabList)}
		</Tabs>
	)
}

TabChooser.propTypes = {}

export default TabChooser
