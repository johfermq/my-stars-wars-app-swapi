<template>
	<div>
		<transition name="modal" v-if="showModal && film">
		    <div class="modal-mask" role="dialog">
		        <div class="modal-wrapper">
			        <div class="modal-dialog modal-dialog-scrollable" role="document">
			            <div class="modal-content">
			                <div class="modal-header">
			                    <h5 class="modal-title" v-text="film.title"></h5>
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
			                    	<strong>Episodio: </strong>{{ film.episode_id }}
			                    </p>
			                    <p>
			                    	<strong>Sinopsis: </strong>{{ film.opening_crawl }}
			                    </p>
			                    <p>
			                    	<strong>Director: </strong>{{ film.director }}
			                    </p>
			                    <p>
			                    	<strong>Productor: </strong>{{ film.producer }}
			                    </p>
			                    <p>
			                    	<strong>Fecha de estreno: </strong>{{ film.release_date }}
			                    </p>
			                    <p>
			                    	<strong>Personajes: </strong>
			                    	<ul class="list-group">
			                    		<li
			                    			class="list-group-item"
			                    			v-for="(character, index) in film.characters"
			                    			:key="index"
			                    		>
			                    			<a class="btn-link" @click="showCharacter(character.url)">
			                    				{{ character.name }}
			                    			</a>
			                    		</li>
			                    	</ul>
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
		<ModalPerson ref="modalPerson"/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Mixins } from './../../mixins/modal/index';
import { splitId } from './../../helpers/functions';

import ModalPerson from './../people/Modal.vue';

export default {
	name: 'Modal',
	mixins: [Mixins],
	components: {
		ModalPerson
	},
	data: () => ({
		showModal: false,
	}),
  	computed: {
  		...mapGetters(['film']),
  	},
  	methods: {
  		showCharacter (url) {
        	this.$refs.modalPerson.findCharacter(splitId(url, this.endpoint));
  		},
  	},
}
</script>