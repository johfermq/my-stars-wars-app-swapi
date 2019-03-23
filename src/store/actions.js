import { extractData } from './../helpers/functions';

export const actions = {
    async fetchData ({ state, dispatch }) {
    	const rowsPerPage = state.pagination.rowsPerPage;

    	await dispatch('fetchPeople', rowsPerPage);
    	await dispatch('fetchSpecies', rowsPerPage);
    	await dispatch('fetchPlanets', rowsPerPage);
    	await dispatch('fetchFilms', rowsPerPage);
    },
    async fetchPeople ({ commit, state }, rowsPerPage) {
    	if (state.people.length === 0) {
    		const people = await extractData('people', rowsPerPage);
        	await commit(`SET_PEOPLE`, people);
        }
    },
    async fetchSpecies ({ commit, state }, rowsPerPage) {
    	if (state.species.length === 0) {
    	    const species = await extractData('species', rowsPerPage);
    	    await commit(`SET_SPECIES`, species);
    	}
    },
    async fetchPlanets ({ commit, state }, rowsPerPage) {
    	if (state.planets.length === 0) {
    	    const planets = await extractData('planets', rowsPerPage);
    	    await commit(`SET_PLANETS`, planets);
    	}
    },
    async fetchFilms ({ commit, state }, rowsPerPage) {
    	if (state.films.length === 0) {
    	    const films = await extractData('films', rowsPerPage);
    	    await commit(`SET_FILMS`, films);
    	}
    },
}