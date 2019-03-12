<template>
	<transition name="modal" v-if="showModal && person">
	    <div class="modal-mask" role="dialog">
	        <div class="modal-wrapper">
		        <div class="modal-dialog modal-dialog-scrollable" role="document">
		            <div class="modal-content">
		                <div class="modal-header">
		                    <h5 class="modal-title" v-text="person.name"></h5>
		                    <button
		                    	type="button"
		                    	class="close"
		                    	data-dismiss="modal"
		                    	aria-label="Close"
		                    >
		                    <span
		                    	aria-hidden="true"
		                    	@click="showModal = false"
		                    >
		                    	&times;
		                    </span>
		                    </button>
		                </div>
		                <div class="modal-body">
		                	<p>
		                    	<strong>Altura: </strong>{{ person.height }}
		                    </p>
		                	<p>
		                    	<strong>Masa: </strong>{{ person.mass }}
		                    </p>
		                    <p>
		                    	<strong>Color de cabello: </strong>{{ person.hair_color }}
		                    </p>
		                    <p>
		                    	<strong>Color de piel: </strong>{{ person.skin_color }}
		                    </p>
		                    <p>
		                    	<strong>Color de ojos: </strong>{{ person.eye_color }}
		                    </p>
		                    <p>
		                    	<strong>Especie: </strong>{{ person.species }}
		                    </p>
		                    <p>
		                    	<strong>Planeta de origen: </strong>{{ person.homeworld }}
		                    </p>
		                    <p>
		                    	<strong>Género: </strong>{{ person.gender }}
		                    </p>
		                    <p>
		                    	<strong>Año de nacimiento: </strong>{{ person.birth_year }}
		                    </p>
		                    <p>
		                    	<strong>Películas: </strong>
		                    	<ul class="list-group">
		                    		<li
		                    			class="list-group-item"
		                    			v-for="(film, index) in person.films"
		                    			:key="index"
		                    		>
		                    			{{ film }}
		                    		</li>
		                    	</ul>
		                    </p>
		                    <p>
		                    	<strong>Vehículos: </strong>
		                    	<ul class="list-group" v-if="person.vehicles.length">
		                    		<li
		                    			class="list-group-item"
		                    			v-for="vehicle in person.vehicles"
		                    			:key="vehicle"
		                    		>
		                    			{{ vehicle }}
		                    		</li>
		                    	</ul>
		                    	<template v-else>
			                    	<div class="alert alert-info">
			                    		¡No tiene vehículos!
			                    	</div>
		                    	</template>
		                    </p>
		                    <p>
		                    	<strong>Naves: </strong>
		                    	<ul class="list-group" v-if="person.starships.length">
		                    		<li
		                    			class="list-group-item"
		                    			v-for="starship in person.starships"
		                    			:key="starship"
		                    		>
		                    			{{ starship }}
		                    		</li>
		                    	</ul>
		                    	<template v-else>
			                    	<div class="alert alert-info">
			                    		¡No tiene naves!
			                    	</div>
		                    	</template>
		                    </p>
		                </div>
		                <div class="modal-footer">
		                    <button
		                    	type="button"
		                    	class="btn btn-dark"
		                    	@click="showModal = false"
		                    >
		                		Cerrar
		                	</button>
		                </div>
		            </div>
		        </div>
	        </div>
	    </div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex';

import { Mixins } from './../../mixins/modal/index';

export default {
	name: 'Modal',
	mixins: [Mixins],
	data: () => ({
		showModal: false,
	}),
  	computed: {
  		...mapGetters(['person']),
	},
	methods: {
		findCharacter (id) {
      		this.$store.commit('SET_PEOPLE_ID', id);
			this.showModal = true;
		},
	},
}
</script>

<style scoped>
	.modal-mask {
    	z-index: 2060 !important;
    }
</style>