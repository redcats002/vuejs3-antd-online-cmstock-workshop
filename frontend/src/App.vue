<template>
  <a-layout class="tw-min-h-screen tw-w-full tw-relative" hasSider>
    <Sidebar v-model:collapsed="collapsed" v-if="!isAuthLayout()"></Sidebar>

    <a-layout class="tw-relative tw-w-full tw-h-full l tw-overflow-auto">
      <Header v-model:collapsed="collapsed" v-if="!isAuthLayout()"></Header>
      <Content></Content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Header from '@/components/core/Header.vue'
import Content from '@/components/core/Content.vue'
import Sidebar from '@/components/core/Sidebar.vue'
import { useAuthStore } from './stores/useAuthStore'
import { useRoute } from 'vue-router'
import useBreakpoint from 'ant-design-vue/lib/_util/hooks/useBreakpoint'
export default defineComponent({
  components: {
    Header,
    Content,
    Sidebar
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const collapsed = ref<boolean>(false)
    onMounted(() => {
      authStore.restoreSession()
    })

    const isAuthLayout = () => {
      return ['/login', '/register'].includes(route.path) ? true : false
    }

    return {
      isAuthLayout,

      collapsed
    }
  }
})
</script>
<style></style>
