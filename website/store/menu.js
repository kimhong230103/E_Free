import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => {
    return {
      data: [],
      searchData: [],
      togglesidebar: true,
      activeoverlay: false,
      searchOpen: false,
      customizer: "",
      hideRightArrowRTL: false,
      hideLeftArrowRTL: true,
      hideRightArrow: true,
      hideLeftArrow: true,
      width: 0,
      height: 0,
      margin: 0,
      menuWidth: 0,
    };
  },
  actions: {
    opensidebar() {
      if (process.client) {
        this.togglesidebar = !this.togglesidebar;
        if (window.innerWidth < 991) {
          this.activeoverlay = true;
        } else {
          this.activeoverlay = false;
        }
      }
    },
    resizetoggle() {
      if (process.client) {
        if (window.innerWidth < 1199) {
          this.togglesidebar = false;
          // this.activeoverlay = true
        } else {
          this.togglesidebar = true;
          // this.activeoverlay = false
        }
      }
    },

    setNavActive(item) {
      if (!item.active) {
        this.data.forEach((a) => {
          if (this.data.includes(item)) a.active = false;
          if (!a.children) return false;
          a.children.forEach((b) => {
            if (a.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
        });
      }
      item.active = !item.active;
    },
    setActiveRoute(item) {
      this.data.filter((menuItem) => {
        if (menuItem !== item) menuItem.active = false;
        if (menuItem.children && menuItem.children.includes(item)) {
          item.active = true;
          menuItem.active = true;
        }
        if (menuItem.children) {
          menuItem.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              item.active = true;
              menuItem.active = true;
              submenuItems.active = true;
            }
          });
        }
      });
    },
    setRoleModuleMenu(state) {
      this.data = [
        {
          "title": "Bundesliga",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        },
        {
          "title": "Laliga",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        },
        {
          "title": "Premier League",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        },
        {
          "title": "UEFA Champion League",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        },
        {
          "title": "UEFA Europa League",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        },
        {
          "title": "Cambodian League",
          "icon": "solar:users-group-rounded-line-duotone",
          "iconf": "fill-user",
          "type": "sub",
          "children": [
            {
              "path": "/users/user_list",
              "key": "Bayon 04 Leverkusen",
              "title": "Bayon 04 Leverkusen",
              "type": "link"
            },
            {
              "path": "/users/user_role",
              "title": "VFB Stuttgart",
              "key": "VFB Stuttgart",
              "type": "link"
            },
            {
              "path": "/users/user_log",
              "title": "FC Bayern Munich",
              "key": "FC Bayern Munich",
              "type": "link"
            },
            {
              "path": "/users/ip-address",
              "title": "RB Leipzig",
              "key": "RB Leipzig",
              "type": "link"
            }
          ]
        }
      ]
    },
  },
});
