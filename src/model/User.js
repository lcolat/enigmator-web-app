export const listUserStatus = [
	"online",
	"offline",
	"absent",
	"dot not disturb"
];

export const mapUserStatusColor = new Map([
	[listUserStatus[0], "green"],
	[listUserStatus[1], "red"],
	[listUserStatus[2], "orange"],
	[listUserStatus[3], "purple"]
]);

var avatar = undefined

export class AvatarPicture {
	static set(newAvatar) {
		avatar = newAvatar
	}
	
	static get() {
		return avatar
	}
}
