import Vue from "vue";
import Vuex from "vuex";
import to from 'await-to-js';

import { splitId, takeNameOrTitle, extractData } from './helpers/functions';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
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
	},
	mutations: {
		SET_ENDPOINT: (state, endpoint) => state.endpoint = endpoint,
		SET_QUERY: (state, query) => state.query = query,
		SET_QUERY_VALID: (state, queryValid) => state.queryValid = queryValid,
		SET_PEOPLE: (state, items) => state.people = items,
		SET_PEOPLE_ID: (state, id) => state.personId = id,
		SET_FILMS: (state, items) => state.films = items,
		SET_FILMS_ID: (state, id) => state.filmId = id,
		SET_SPECIES: (state, items) => state.species = items,
		SET_PLANETS: (state, items) => state.planets = items,
	},
	actions: {
	    async fetchData ({ commit, state }) {
	    	if (state.endpoint === 'people' && state.people.length === 0) {
	    		const rowsPerPage = state.pagination.rowsPerPage;
	    		const people = await extractData('people', rowsPerPage);
	    		const species = await extractData('species', rowsPerPage);
	    		const planets = await extractData('planets', rowsPerPage);
	    		const films = await extractData('films', rowsPerPage);

		        await commit(`SET_SPECIES`, species);
		        await commit(`SET_PLANETS`, planets);
		        await commit(`SET_PEOPLE`, people);
		        await commit(`SET_FILMS`, films);
		    }
	    },
	},
	getters: {
		title: state => state.title,
		people: state => {
	      	let people = [];

	      	if (state.query && state.queryValid) {
	      		people = state.people.filter(item => item.name.toLowerCase().indexOf(state.query) !== -1);
	      	}
	      	else {
	      		people.push(...state.people);
	      	}

		    if (people && people.length) {
	      		people = people.map(person => {
		        	return {
		        		id: splitId(person.url, 'people'),
		          		name: person.name,
		          		species: takeNameOrTitle(state.species, ...person.species, 'name'),
		          		homeworld: takeNameOrTitle(state.planets, person.homeworld, 'name'),
		          		gender: person.gender,
		          		birth_year: person.birth_year,
		        	}
		      	});
		    }

	    	return people;
    	},
		person: state => {
			let person = state.people.find(person => person.url.indexOf(`/${state.personId}/`) !== -1);

			if (person) {
	      		person.species = takeNameOrTitle(state.species, ...person.species, 'name');
	        	person.homeworld = takeNameOrTitle(state.planets, person.homeworld, 'name');
	        	person.films = person.films.map(url => takeNameOrTitle(state.films, url, 'title'));
		    }

			return person;
    	},
		films: state => {
			let films = [];

			if (state.query && state.queryValid) {
        		films = state.films.filter(item => item.title.toLowerCase().indexOf(state.query) !== -1);
		    }
		    else {
		        films.push(...state.films);
		    }

	    	if (films && films.length) {
		      	films = films.map(film => {
		        	return {
		        		id: splitId(film.url, 'films'),
		          		title: film.title,
		          		episode_id: film.episode_id,
		          		director: film.director,
		          		release_date: film.release_date,
		        	};
		      	});
	    	}

	    	return films;
    	},
		film: state => {
			let film = state.films.find(film => film.url.indexOf(`/${state.filmId}/`) !== -1);

			if (film) {
				film.characters = film.characters.map(url => {
					return {
						name: takeNameOrTitle(state.people, url, 'name'),
						url: url,
					}
				});
	    	}

			return film;
    	},
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
});
