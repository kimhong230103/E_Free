import { useRoleModuleStore } from "~/store/role_module";
import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware((to, from, route) => {
	const moduleKey = to.matched[0].meta.moduleKey;
	const viewKey = to.matched[0].meta.viewKey;

	const roleModuleStore = useRoleModuleStore();
	const userStore = useUserStore();
	const view_key =
		viewKey == undefined || viewKey == null || viewKey == "" ? "view" : viewKey;
	if (userStore.isSuperUser) {
		return true;
	} else {
		let userAuthorized = false;
		roleModuleStore.getList.forEach((obj) => {
			if (obj?.module_key == moduleKey) {
				let viewPermission = obj.permissions.find(
					(ele) => ele.permission_name == view_key
				);
				for (var key in viewPermission) {
					if (obj.hasOwnProperty(key)) userAuthorized = true;
				}
			}
		});
		if (!userAuthorized) {
			return navigateTo("/error/403");
		} else {
			return true;
		}
	}
});
