export default function FormatDate(date) {
	return new Date(date).toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}
