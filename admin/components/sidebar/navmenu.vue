<template>
  <div id="sidebar-menu">
    <ul
      class="sidebar-links custom-scrollbar"
      id="myDIV"
    >

      <li
        v-for="(menuItem, index) in menuItems"
        :key="index"
        class="sidebar-list"
      >
        <router-link
          :to="localPath(menuItem.path.replace('**', '').replace('/gateway', ''))"
          class="sidebar-link sidebar-title"
          v-on:click="hidesecondmenu()"
          @click="setNavActive(menuItem, index)"
          @mouseover="setNavActiveh(menuItem, index)"
        >
          <!-- <Icon :name="menuItem.icon" /> -->
          <span>
            {{ $t(menuItem.title) }}
          </span>
          <!-- <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i> -->
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { mapState } from "pinia";
  import { useLayoutStore } from "~~/store/layout";
  import { useMenuStore } from "~~/store/menu";
  import { layoutClasses } from "../../constants/layout";
  import { useWindowScroll } from "@vueuse/core";
  import { useWindowSize, useLocalStorage } from "@vueuse/core";
  import { useUserStore } from "~~/store/user";
  let localPath = useLocalePath();
  const userStore = useUserStore();
  const menuItems = ref([]);
  const getMenu = async () => {
    const data = await fetch("https://efree.cheakautomate.online/gateway/api/v1/auth/dashboard", {
      method: 'GET', // Specify the method as GET
      headers: {
          'Content-Type': 'application/json',
          Authorization: userStore.logged ? `Bearer ${userStore.token}` : "",
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    menuItems.value = data;
    console.log("menuItems",menuItems.value);
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
  });
    // menuItems.value = await ifetch("auth/dashboard",{},'json','GET');
    
    
  }
  onMounted(() => {
    getMenu();
  })
</script>
