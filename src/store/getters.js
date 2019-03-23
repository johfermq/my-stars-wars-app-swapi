import { splitId, takeNameOrTitle } from './../helpers/functions';

export const getters = {
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
}