import Vue from "vue";
import Vuex from "vuex";

import general from './modules/general';
import people from './modules/people';
import films from './modules/films';
import species from './modules/species';
import planets from './modules/planets';

Vue.use(Vuex);

export default new Vuex.Store({
  	modules: {
   		general,
   		people,
   		films,
   		species,
   		planets,
  	}
});
