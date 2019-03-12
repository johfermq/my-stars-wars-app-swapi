<template>
  	<div class="row">
	  	<div class="col-md-12">
		    <h2 class="h2 font-weight-bold text-capitalize mb-3">Películas</h2>
			<div v-if="films">
				<Loading v-if="loading"/>
        <div v-else>
          <FormSearch :form="form" />
          <v-client-table
            name="table"
            :columns="columns"
            :data="filmsFiltered"
            :options="options"
            @row-click="rowClick"
          >
          </v-client-table>
          <Modal ref="modal"/>
        </div>
		  </div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

import { Mixins } from './../../mixins/tables/index';
import { Options } from './../../mixins/tables/options';

import Modal from './Modal.vue';
import FormSearch from './Form.vue';

export default {
  	name: 'Films',
  	mixins: [Mixins],
  	components: {
      FormSearch,
      Modal,
  	},
  	data: () => ({
  		columns: [
  			'title', 'episode_id', 'director', 'release_date'
  		],
        options: {
          	sortable: [
          		'title', 'episode_id', 'director', 'release_date'
          	],
          	orderBy: {
          		column: 'title',
          		ascendent: true,
          	},
          	headings: {
          		title: 'Título',
          		episode_id: 'Episodio',
          		director: 'Director',
          		release_date: 'Fecha de estreno',
          	},
          	...Options,
        },
        form: {
          title: '',
          episode: [1, 7],
          director: '',
          date: [],
          isValid: false,
        },
  	}),
  	computed: {
      ...mapGetters(['films']),
      filmsFiltered () {

        if (this.form.isValid) {
          return this.films.filter(film => {
            let release, start, end;

            release = moment(film.release_date);

            if (this.form.date.length && this.form.date[0] !== null && this.form.date[1] !== null) {
              start = moment(this.form.date[0]);
              end = moment(this.form.date[1]);
            }

            const findTitle = film.title.toLowerCase().indexOf(this.form.title) !== -1;
            const findEpisode = film.episode_id >= this.form.episode[0] && film.episode_id <= this.form.episode[1];
            const findDirector = film.director.indexOf(this.form.director) !== -1;
            const findDate = (start && end) ? release.isBetween(start, end) : true;

            return findTitle && findEpisode && findDirector && findDate;
          });
        }

        return this.films;
      },
    },
}
</script>