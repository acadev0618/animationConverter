<template>
	<header class="header fixed-top">
		<nav>
			<router-link to="/" class="logo">
<!--				<img src="~img/logo_black.png" alt="logo"/>-->
                <div class="h2">{{ $store.state.site_name }}</div>
			</router-link>
			<!-- Sidebar toggle button-->
			<div class="float-left">
				<a href="javascript:void(0)" class="sidebar-toggle" @click="toggle_menu">
					<i class="fas fa-bars"></i>
				</a>
			</div>
			<div class="navbar-right">
				<!--drop downs-->
				<div>
					<div class="dropdown hidden-xs-down btn-group fullscreen" v-if="fullscreen">
						<a href="javascript:void(0)" @click="fullscreen">
							<i class="fas fa-arrows-alt"></i>
						</a>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>
<script>
	import screenfull from "screenfull"
	
	export default {
		name: "vueadmin_header",
		
		methods: {
			toggle_menu() {
				this.$store.commit('left_menu', "toggle");
			},
			fullscreen() {
				if (screenfull.enabled) {
					screenfull.toggle();
				}
			}
		}
	}
</script>
