<template>
	<div class="row">
		<div class="col-md-12">
			<hr />
			<keep-alive>
		      	<component
		      		:is="dynamicComponent"
		      		ref="resultComponent"
		      		:loading="loading"/>
		    </keep-alive>
		</div>
	</div>
</template>

<script>
import Films from './../films/Films.vue';
import People from './../people/People.vue';

export default {
	name: 'DynamicComponent',
	props: {
		dynamicComponent: {
			type: String,
			required: true,
			default: null,
		},
		loading: {
			type: Boolean,
			required: true,
		},
	},
  	components: {
  		Films,
  		People,
  	},
}
</script>