<template>
	<header class="header no-header">
		<div class="float-left">
			<a href="javascript:void(0)" class="sidebar-toggle" @click="toggle_menu" title="toggle button"> <i class="fas fa-bars"></i>
			</a>
		</div>
	</header>
</template>
<script>
	export default {
		name: "vueadmin_header",
		methods: {
			toggle_menu() {
				this.$store.commit('left_menu', "toggle");
			}
		}
	}
</script>
<style lang="scss" scoped>
	.sidebar-toggle {
		position: fixed;
		top: 9px;
		right: 18px;
		color: #fff;
		font-size: 23px;
		z-index: 999;
		background-color: #6595fb;
		border-radius: 3px;
		padding: 2px 7px;
	}
</style>
