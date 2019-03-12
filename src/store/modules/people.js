import { splitId, takeNameOrTitle } from './../../helpers/functions';

export default {
    namespaced: true,
  	state: {
  		people: [],
		personId: '',
  	},
  	mutations: {
  		SET_PEOPLE: (state, items) => state.people = items,
		SET_PEOPLE_ID: (state, id) =>  state.personId = id,
  	},
  	getters: {
  		people: (state, rootState) => {
          	let people = [];

          	if (rootState.general.query && rootState.general.queryValid) {
          		people = state.people.filter(item => item.name.toLowerCase().indexOf(rootState.general.query) !== -1);
          	}
          	else {
          		people.push(...state.people);
          	}

		    if (people && people.length) {
		      	people = people.map(person => {
		        	return {
		        		id: splitId(person.url, 'people'),
		          		name: person.name,
		          		species: takeNameOrTitle(rootState.species.species, ...person.species, 'name'),
		          		homeworld: takeNameOrTitle(rootState.planets.planets, person.homeworld, 'name'),
		          		gender: person.gender,
		          		birth_year: person.birth_year,
		        	}
		      	});
		    }

	    	return people;
      	},
		person: (state, rootState) => {
			let person = state.people.find(person => person.url.indexOf(`/${state.personId}/`) !== -1);

			if (person) {
	      		person.species = takeNameOrTitle(rootState.species.species, ...person.species, 'name');
	        	person.homeworld = takeNameOrTitle(rootState.planets.planets, person.homeworld, 'name');
	        	person.films = person.films.map(url => takeNameOrTitle(rootState.films.films, url, 'title'));
	    	}

			return person;
      	},
  	},
};