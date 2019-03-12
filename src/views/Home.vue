<template>
	<div>
		<HeadHome />
		<FormSearch />
		<DynamicComponent :dynamicComponent="dynamicComponent" :loading="loading"/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import HeadHome from './../components/home/Head.vue';
import FormSearch from './../components/home/FormSearch.vue';
import DynamicComponent from './../components/home/DynamicComponent.vue';

export default {
	name: 'Home',
	components: {
		HeadHome,
		FormSearch,
		DynamicComponent,
	},
  data: () => ({
    	loading: false,
  }),
  created () {
    this.loadData();
  },
  methods: {
    ...mapActions(['fetchData']),
    async loadData () {
      this.loading = true;
      await this.fetchData().finally(() => this.loading = false);
    },
  },
	computed: {
		...mapState(['endpoint']),
		dynamicComponent() {
      	return (this.endpoint === 'films') ? 'Films' : (
      		(this.endpoint === 'people') ? 'People' : ''
      	);
    },
	},
}
</script>
