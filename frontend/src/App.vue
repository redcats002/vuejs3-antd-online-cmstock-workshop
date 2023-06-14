<template>
  <a-layout class="tw-min-h-screen tw-w-full">
    <Sidebar v-model:collapsed="collapsed" v-if="!isAuthLayout()"></Sidebar>
    <a-layout class="tw-relative tw-w-full tw-h-full">
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
    const selectedKeys = ref<string[]>(['1'])
    const collapsed = ref<boolean>(false)
    onMounted(() => {
      authStore.restoreSession()
    })

    const isAuthLayout = () => {
      return ['/login', '/register'].includes(route.path) ? true : false
    }

    return {
      isAuthLayout,
      selectedKeys,
      collapsed
    }
  }
})
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
