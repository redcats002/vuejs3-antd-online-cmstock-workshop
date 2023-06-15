<template>
  <a-layout-content class="tw-p-5 tw-w-full tw-h-full">
    <a-row
      align="center"
      justify="center"
      class="tw-h-full tw-w-full"
      v-if="['/login', '/register'].includes($route.path)"
    >
      <RouterView></RouterView>
    </a-row>
    <RouterView v-else></RouterView>
  </a-layout-content>
</template>
