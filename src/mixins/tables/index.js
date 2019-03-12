import Loading from './../../components/partial/Loading.vue';

export const Mixins = {
  components: {
    Loading,
  },
  props: {
  	loading: {
    	type: Boolean,
    	required: true,
    	default: false,
  	},
  },
  methods: {
		rowClick ({ row }) {
      this.$refs.modal.findItem(row.id);
		},
	},
	computed: {
		endpoint () {
			return this.$store.state.endpoint;
		},
		query () {
			return this.$store.state.query;
		},
	},
};