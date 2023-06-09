<template>
  <a-layout-content class="tw-p-10 tw-flex tw-items-center tw-justify-center">
    <a-row
      align="center"
      justify="center"
      class="tw-h-full tw-w-full tw-items-center"
      v-if="['/login', '/register'].includes($route.path)"
    >
      <RouterView></RouterView>
    </a-row>
    <RouterView v-else></RouterView>
  </a-layout-content>
</template>
