<template>
	<div class="row justify-content-center">
		<div class="col-md-7">
        	<div class="justify-content-center">
        		<div class="form-group row">
        			<div class="col-md-5">
        				<label class="col-form-label">Tipo de búsqueda</label>
        				<select
        					class="form-control"
        					v-model.trim="endpoint"
        					:class="{ ' is-invalid': $v.endpoint.$error }"
        				>
        					<option
        						v-for="item in items"
        						:key="item.value"
        						:value="item.value"
        					>
        						{{ item.text }}
        					</option>
        				</select>
    					<span
    						v-if="!$v.endpoint.required"
    						class="invalid-feedback" role="alert">
                            <strong>El tipo de búsqueda es requerido.</strong>
                        </span>
        			</div>
        			<div class="col-md-7">
        				<label class="col-form-label">Búscar</label>
						<input
    						type="text"
    						class="form-control"
    						v-model.trim="query"
    						aria-describedby="buscar"
    						:placeholder="placeholder"
    						:class="{ ' is-invalid': $v.query.$error }"
    					>
    					<span
    						v-if="!$v.query.alphaNum"
    						class="invalid-feedback" role="alert">
                            <strong>Sólo puede digitar valores alfanuméricos.</strong>
                        </span>
        			</div>
        		</div>
        	</div>
		</div>
	</div>
</template>

<script>
import { required, alphaNum } from 'vuelidate/lib/validators';

export default {
	name: 'FormSearch',
	data: () => ({
    	items: [
    		{ text: 'Personajes', value: 'people' },
      		{ text: 'Películas', value: 'films' }
      	],
    }),
	validations: {
	    endpoint: {
	      	required
	    },
	    query: {
	      	alphaNum
	    },
	},
  	computed: {
	    endpoint: {
	    	get () {
	    		return this.$store.state.endpoint;
	    	},
	    	set (value) {
	    		this.$store.commit('SET_ENDPOINT', value);
	    	}
	    },
	    query: {
	    	get () {
	    		return this.$store.state.query;
	    	},
	    	set (value) {
	    		this.$v.$touch();
	    		this.$store.commit('SET_QUERY_VALID', ! this.$v.$invalid);
	    		this.$store.commit('SET_QUERY', value.toLowerCase());
	    	}
	    },
	    placeholder () {
	    	return (this.endpoint === 'films') ? 'Título...' : (
	      		(this.endpoint === 'people') ? 'Nombre...' : 'Búscar...'
	      	);
	    },
	},
}
</script>