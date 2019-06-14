import { NotificationManager } from 'react-notifications'

export const LEVEL_NOTIF = {
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error'
}
/**
 * [create a notification ]
 * @param [Object] {level,message,title}
 * @param [String] object.level [the level of importance of the notification]
 * @param [String] object.message [message displayed in the notification]
 * @param [String] object.title [title of notification]
 */

export const createNotification = ({
	level = LEVEL_NOTIF.INFO,
	message = 'No message',
	title = ''
} = {}) => {
	NotificationManager[level](message, title)
}
