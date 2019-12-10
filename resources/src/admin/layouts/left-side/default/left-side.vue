<template>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="left-aside sidebar-offcanvas">
		<!-- sidebar: style can be found in sidebar-->
		<section class="sidebar">
			<div id="menu" role="navigation">
				<div class="nav_profile mb-md-2"></div>
				<vmenu>
					<template v-for="item in menuitems">
						<li class="divider mt-2" v-if="item.title">
							<span>{{item.name}}</span>
						</li>
						<vsub-menu v-if="item.child" :title="item.name" :icon="item.icon">
							<vmenu-item v-for="child in item.child" :link="child.link" :icon="child.icon" :key="child.name">{{child.name}}</vmenu-item>
						</vsub-menu>
						<vmenu-item v-if="item.link" :link="item.link" :icon="item.icon" :event="item.event">{{ item.name}}</vmenu-item>
					</template>
				</vmenu>
				<!-- / .navigation -->
			</div>
			<!-- menu -->
		</section>
		<!-- /.sidebar -->
	</aside>
</template>
<script>
	import {vmenu, vmenuItem, vsubMenu} from './menu';
	import menu_items from "admin/menu.js";
	
	export default {
		name: "left-side",
		components: {
			vmenu,
			vsubMenu,
			vmenuItem
		},
		data() {
			return {
				menuitems: menu_items
			}
		}
	}
</script>
