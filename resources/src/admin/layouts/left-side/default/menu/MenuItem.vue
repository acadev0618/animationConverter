<template>
	<div class="listbrdr">
		<template v-if="event === 'logout'">
			<a @click="logout" class="menu-item">
				<i class="leftmenu_icon" :class="icon"></i>
				<span class="name"><slot></slot></span>
			</a>
		</template>
		<template v-else>
			<router-link :to="link" exact class="menu-item">
				<i class="leftmenu_icon" :class="icon"></i>
				<span class="name"><slot></slot></span>
			</router-link>
		</template>
	</div>
</template>
<script>
	export default {
		props: ["link", "icon", "event"],
		methods: {
			logout() {
				window.location.href = '/login';
			}
		}
	}
</script>
