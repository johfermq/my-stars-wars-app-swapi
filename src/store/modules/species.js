export default {
	namespaced: true,
	state: {
		species: [],
	},
	mutations: {
  		SET_SPECIES: (state, items) => state.species = items,
	},
}