<template>
  <div>
    <div class="card sidebar max-992-none">
      <div class="box-head-profile text-center">
        <img width="70px" height="70px" class="rounded-circle"src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt=""/>
        <p>Mr. Admin</p>
      </div>
      <div class="border"></div>
      <div class="sidebar-menu p-2">
        <p class="fw-bold" style="font-size: 17px;">{{ $t('general') }}</p>
        <ul class="w-100 mt-2">
          <li class="w-100 mb-2 rounded-2 p-2" >
            <NuxtLink to="/">
              <Icon name="ic:baseline-manage-history" size="20" style="color: var(--theme-default);" />
              {{ $t('my_history') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  const listMenu = [
    {
      icon: "ic:baseline-manage-history",
      title: "my_history",
      isActive: false,
    },
    {
      icon: "ic:baseline-manage-history",
      title: "my_profile",
      isActive: false,
    },
    {
      icon: "ic:baseline-manage-history",
      title: "my_history",
      isActive: false,
    },
  ]
</script>

<style>
  .sidebar-menu{
    list-style-type: none;
  }
  .sidebar-menu li{
    background-color: #D3DBE9;
  }
  .sidebar-menu li a{
    text-decoration: none;
    color: black;
    background: none;
    display: block;
    width: 100%;
  }
</style>
