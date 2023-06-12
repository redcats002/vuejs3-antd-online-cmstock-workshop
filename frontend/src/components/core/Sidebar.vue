<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="tw-bg-[url('@/assets/bg-menu-2.png')] tw-bg-no-repeat tw-bg-[#83fface5] tw-bg-cover"
  >
    <div>
      <img src="@/assets/05-banner-vuejs.png" alt="logo" style="width: 100%" />
    </div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @select="routeToPath"
      class="tw-rounded-b-lg tw-p-2"
    >
      <template v-for="(item, i) in menuList" :key="i">
        <a-menu-item v-if="!item.isSub" :key="item.to" class="tw-rounded-md">
          <template #icon> <StockOutlined v-if="i == 0" /> <DatabaseOutlined v-else /> </template>
          {{ item.name }}
        </a-menu-item>
        <template v-else>
          <a-sub-menu :key="`menu${i}`" class="tw-rounded-md">
            <template #icon>
              <CalendarOutlined />
            </template>
            <template #title>{{ item.name }} </template>
            <a-menu-item v-for="(sub, j) in item.options" :key="sub.to" class="tw-rounded-md">
              {{ sub.name }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import router from '@/router'
import {
  StockOutlined,
  DatabaseOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  components: {
    StockOutlined,
    DatabaseOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      selectedKeys: ['1'],
      openKeys: ['sub1']
    })

    const menuList = reactive([
      { name: 'Stock', to: '/stock', icon: 'StockOutlined', isSub: false },
      { name: 'Report', to: '/report', icon: 'StockOutlined', isSub: false },
      {
        name: 'Navigation 3',
        icon: '',
        options: [
          { name: 'Option 1', to: '/nav3-op-1', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav3-op-2', icon: 'StockOutlined' }
        ],
        isSub: true
      },
      {
        name: 'Navigation 4',
        icon: '',
        options: [
          { name: 'Option 1', to: '/nav4-op-1', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav4-op-2', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav4-op-3', icon: 'StockOutlined' }
        ],
        isSub: true
      },
      {
        name: 'Navigation 5',
        icon: '',
        options: [
          { name: 'Option 1', to: '/nav5-op-1', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav5-op-2', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav5-op-3', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav5-op-4', icon: 'StockOutlined' }
        ],
        isSub: true
      },
      {
        name: 'Navigation 6',
        icon: '',
        options: [
          { name: 'Option 1', to: '/nav6-op-1', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav6-op-2', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav6-op-3', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav6-op-4', icon: 'StockOutlined' }
        ],
        isSub: true
      },
      {
        name: 'Navigation 7',
        icon: '',
        options: [
          { name: 'Option 1', to: '/nav7-op-1', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav7-op-2', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav7-op-3', icon: 'StockOutlined' },
          { name: 'Option 2', to: '/nav7-op-4', icon: 'StockOutlined' }
        ],
        isSub: true
      }
    ])
    const routeToPath = () => {
      router.push(state.selectedKeys[0])
    }

    return {
      ...toRefs(state),
      state,
      menuList,
      routeToPath
    }
  }
})
</script>
