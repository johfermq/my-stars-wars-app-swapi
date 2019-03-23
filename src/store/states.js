export const state = {
	title: process.env.VUE_APP_TITLE,
	endpoint: 'people',
  	query: '',
  	queryValid: false,
	people: [],
	personId: '',
	films: [],
  	filmId: '',
  	species: [],
  	planets: [],
	pagination: {
		rowsPerPage: 10,
  	},
}