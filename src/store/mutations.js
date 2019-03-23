export const mutations = {
	SET_ENDPOINT: (state, endpoint) => state.endpoint = endpoint,
	SET_QUERY: (state, query) => state.query = query,
	SET_QUERY_VALID: (state, queryValid) => state.queryValid = queryValid,
	SET_PEOPLE: (state, items) => state.people = items,
	SET_PEOPLE_ID: (state, id) => state.personId = id,
	SET_FILMS: (state, items) => state.films = items,
	SET_FILMS_ID: (state, id) => state.filmId = id,
	SET_SPECIES: (state, items) => state.species = items,
	SET_PLANETS: (state, items) => state.planets = items,
}