export default {
    all (endpoint, page = 1) {
    	return axios.get(`${endpoint}/?page=${page}`);
    },
	find (endpoint, id) {
    	return axios.get(`${endpoint}/${id}`);
    },
}