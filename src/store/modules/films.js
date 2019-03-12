import { splitId, takeNameOrTitle } from './../../helpers/functions';

export default {
  	namespaced: true,
	state: {
		films: [],
    	filmId: '',
	},
	mutations: {
  		SET_FILMS: (state, items) => state.films = items,
  		SET_FILMS_ID: (state, id) => state.filmId = id,
	},
	getters: {
		films: (state, rootState) => {
	  		let films = [];

			if (rootState.general.query && rootState.general.queryValid) {
	      		films = state.films.filter(item => item.title.toLowerCase().indexOf(rootState.general.query) !== -1);
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
	  	film: (state, rootState) => {
			let film = state.films.find(film => film.url.indexOf(`/${state.filmId}/`) !== -1);

			if (film) {
				film.characters = film.characters.map(url => {
					return {
						name: takeNameOrTitle(rootState.people.people, url, 'name'),
						url: url,
					}
				});
		    }

			return film;
	    },
	},
}