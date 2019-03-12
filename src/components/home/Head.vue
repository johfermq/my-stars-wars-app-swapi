<template>
	<div class="row">
		<div class="col-md-12">
			<div class="my-4 text-center">
				<img
					:src="require('../../assets/img/stars-wars.png')"
					class="mx-auto d-block"
					alt="logo" />
			</div>
        	<h1 class="h2 text-capitalize my-3 text-center" v-text="title"></h1>
        </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  	name: 'HeadHome',
  	computed: {
  		...mapGetters(['title']),
  	},
}
</script>