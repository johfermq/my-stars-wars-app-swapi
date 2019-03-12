import { extractData } from './../../helpers/functions';

export default {
    namespaced: true,
	  state: {
  		title: process.env.VUE_APP_TITLE,
  		endpoint: 'people',
    	query: '',
    	queryValid: false,
  		pagination: {
			  rowsPerPage: 10,
    	},
  	},
  	mutations: {
  		SET_ENDPOINT: (state, endpoint) => state.endpoint = endpoint,
  		SET_QUERY: (state, query) => state.query = query,
  		SET_QUERY_VALID: (state, queryValid) => state.queryValid = queryValid,
  	},
  	actions: {
	    async fetchData ({ commit, state, rootState }) {
      		if (state.endpoint === 'people' && rootState.people.people.length === 0) {

	      		const rowsPerPage = await state.pagination.rowsPerPage;
	      		const people = await extractData('people', rowsPerPage);
	      		const species = await extractData('species', rowsPerPage);
	      		const planets = await extractData('planets', rowsPerPage);
	      		const films = await extractData('films', rowsPerPage);

		        await commit(`species/SET_SPECIES`, species, { root: true });
		        await commit(`planets/SET_PLANETS`, planets, { root: true });
		        await commit(`people/SET_PEOPLE`, people, { root: true });
		        await commit(`films/SET_FILMS`, films, { root: true });
	      	}
	    },
  	},
  	getters: {
  		title: state => state.title,
  	},
}