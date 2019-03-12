<template>
	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      	<div class="container">
	        <router-link
	          	class="navbar-brand"
	          	:to="{ name: 'home' }"
	          	tag="a"
	        >
	          	{{ title }}
	        </router-link>
	        <!-- <button
	          	class="navbar-toggler"
	          	type="button"
	          	data-toggle="collapse"
	          	data-target="#toolbar"
	          	aria-controls="toolbar"
	          	aria-expanded="false"
	          	aria-label="Toggle navigation"
	        >
	          	<span class="navbar-toggler-icon"></span>
	        </button>
	        <div class="collapse navbar-collapse" id="toolbar"> -->
	          	<div class="navbar-nav ml-auto">
		            <router-link
		              	v-for="(link, index) in links"
		              	:key="index"
		              	:to="link.url"
		              	class="nav-item nav-link"
		              	exact
		              	active-class="active"
		              	tag="a"
		            >
		              {{ link.name }}
		            </router-link>
	          	</div>
	        <!-- </div> -->
      	</div>
    </nav>
</template>

<script>
export default {
  	name: 'Navbar',
  	props: {
  		title: {
  			type: String,
  			required: true,
  		},
  		links: {
  			type: Array,
  			required: true,
  		}
  	},
}
</script>