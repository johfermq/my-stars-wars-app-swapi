export default {
	namespaced: true,
	state: {
		planets: [],
	},
	mutations: {
		SET_PLANETS: (state, items) => state.planets = items,
	},
	getters: {
		planets: state => {
  			let planets = [];

		    if (state.planets && state.planets.length) {
		      	state.planets.map(planet => {
		        	planets.push(planet.name);
		      	});
		    }

		    return planets.sort();
        },
	},
}