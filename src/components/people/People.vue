<template>
	<div class="row">
	  <div class="col-md-12">
		  <h2 class="h2 font-weight-bold text-capitalize mb-3">Personajes</h2>
			<div v-if="people">
				<Loading v-if="loading"/>
        <div v-else>
          <FormSearch :form="form" />
		      	<v-client-table
		      		name="table"
		      		:columns="columns"
		      		:data="peopleFiltered"
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

import { Mixins } from './../../mixins/tables/index';
import { Options } from './../../mixins/tables/options';

import Modal from './Modal.vue';
import FormSearch from './Form.vue';

export default {
  	name: 'People',
  	mixins: [Mixins],
  	components: {
      FormSearch,
      Modal,
  	},
  	data: () => ({
  		columns: [
  			'name', 'species', 'homeworld', 'gender', 'birth_year'
  		],
      options: {
      	sortable: [
      		'name', 'species', 'homeworld', 'gender', 'birth_year'
      	],
      	orderBy: {
      		column: 'name',
      		ascendent: true,
      	},
      	headings: {
          name: 'Nombre',
          species: 'Especie',
          homeworld: 'Planeta de origen',
          gender: 'Género',
          birth_year: 'Año de nacimiento',
      	},
      	...Options,
      },
      form: {
        name: '',
        homeworld: [],
        gender: '',
        birth_year: '',
        isValid: false,
      },
  	}),
  	computed: {
      ...mapGetters(['people']),
      peopleFiltered () {

        if (this.form.isValid) {
          return this.people.filter(person => {

            const findName = (
              person.name.toLowerCase().indexOf(this.form.name) !== -1 ||
              person.species.toLowerCase().indexOf(this.form.name) !== -1
            );

            const findHomeworld = this.form.homeworld.length ? this.form.homeworld.includes(person.homeworld) : true;

            const findGender = this.form.gender ? (person.gender === this.form.gender) : true;

            let splitBirthYear = this.form.birth_year.split(' - ');
            let findBirthYear = true;

            if (splitBirthYear.length === 1) {
              findBirthYear = person.birth_year.indexOf(this.form.birth_year) !== -1;
            }
            else if (splitBirthYear.length === 2) {
              let splitPersonBirthYear = parseFloat(person.birth_year.split('BBY')[0]);
              let startBirthYear = parseFloat(splitBirthYear[0]);
              let endBirthYear = parseFloat(splitBirthYear[1]);

              if (splitPersonBirthYear !== "NAN") {
                findBirthYear = splitPersonBirthYear >= startBirthYear && splitPersonBirthYear <= endBirthYear;
              }
            }

            return findName && findHomeworld && findGender && findBirthYear;
          });
        }

        return this.people;
      },
    },
}
</script>