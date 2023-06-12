<template>
  <a-layout-content class="tw-p-10 tw-flex tw-items-start tw-justify-center">
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
