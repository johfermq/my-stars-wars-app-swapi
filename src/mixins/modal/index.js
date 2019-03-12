import { uppercase } from './../../helpers/functions';

export const Mixins = {
	methods: {
		findItem (id) {
      		this.$store.commit(`SET_${uppercase(this.endpoint)}_ID`, id);
			this.showModal = true;
		},
	},
	computed: {
		endpoint () {
			return this.$store.state.endpoint;
		},
	},
}