<template>
  <a-row justify="space-around" align="center" :gutter="[20]">
    <a-col :span="12" :lg="6" v-for="(item, i) in stockCardList" :key="i" class="tw-mb-2">
      <StockCard :title="item.title" :amount="item.amount" :color="item.color" :icon="item.icon">
      </StockCard>
    </a-col>
    <a-col col :span="24" class="tw-mt-4">
      <a-row class="tw-mb-4 tw-flex tw-flex-row">
        <a-col class="tw-flex-1 tw-mr-3">
          <a-auto-complete
            class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all"
            placeholder="Input search text"
            :options="stockStore.autocompleteOptions"
            @search="stockStore.createDebounceSearches"
            @select="stockStore.onSelect"
            :default-active-first-option="false"
            :filter-option="false"
            :loading="stockStore.isLoading"
          />
        </a-col>
        <a-col>
          <a-button
            class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all"
            type="primary"
            @click="$router.push('/stock-create')"
          >
            <a-row justify="center" class="tw-items-center">
              <PlusCircleFilled class="tw-pr-2 tw-hidden lg:tw-block" /><span class="tw-pr-1"
                >NEW</span
              >
              <span class="tw-hidden lg:tw-block">PRODUCT</span>
            </a-row>
          </a-button>
        </a-col>
      </a-row>
      <a-skeleton active avatar v-if="stockStore.isLoading()"> </a-skeleton>
      <a-card
        v-else
        class="tw-rounded-md tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all"
      >
        <a-table
          :columns="columns"
          :data-source="stockStore.stocks"
          :pagination="{ position: ['topRight'] }"
        >
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span class="tw-font-medium"> Name </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="tw-block tw-truncate tw-overflow-ellipsis">
                <a @click="routeToEdit(record.id)">
                  {{ record.name }}
                </a>
              </div>
            </template>
            <template v-else-if="column.key === 'image'">
              <img
                @click="routeToEdit(record.id)"
                :src="stockStore.getProductImage(record.image)"
                lazy-src="https://picsum.photos/id/11/10/6"
                aspect-ratio="1"
                class="tw-object-contain tw-cursor-pointer tw-transition-all hover:tw-scale-[1.1]"
                width="50"
                height="50"
              />
            </template>
            <template v-else-if="column.key === 'price'">
              <span>{{ filters.currency(record.price) }}</span>
            </template>
            <template v-else-if="column.key === 'stock'">
              <a-tag :color="stockStore.getColorTagByStock(record.stock)"
                >{{ filters.thousand(record.stock) }} pcs</a-tag
              >
            </template>
            <template v-else-if="column.key === 'createdAt'">
              <span class="tw-text-gray-600">{{ filters.formatTime(record.createdAt) }}</span>
            </template>
            <template v-else-if="column.key === 'updatedAt'">
              <span class="tw-text-gray-600">{{ filters.formatTime(record.updatedAt) }}</span>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-row align="center">
                <a-button
                  class="tw-bg-[#ffd155ff] tw-border-[#ffd155ff] tw-text-white"
                  @click="$router.push(`/stock-edit/${record.id}`)"
                >
                  <EditFilled class="tw-pb-2" />
                </a-button>

                <a-popconfirm
                  title="Are you sure？"
                  @confirm="stockStore.onConfirmDelete(record.id)"
                >
                  <template #icon><QuestionCircleOutlined /></template>
                  <a-button type="danger"> <DeleteFilled class="tw-pb-2" /></a-button>
                </a-popconfirm>
              </a-row>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import StockCard from '@/components/cards/StockCard.vue'
import {
  PlusCircleFilled,
  EditFilled,
  DeleteFilled,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import filters from '@/services/filters'
import { useRouter } from 'vue-router'
import { useStockStore } from '@/stores/useStockStore'
import type { StockCardInterface } from '@/models/product.model'

export default defineComponent({
  components: {
    PlusCircleFilled,
    EditFilled,
    DeleteFilled,
    StockCard,
    QuestionCircleOutlined,
    DeleteOutlined
  },
  setup() {
    const router = useRouter()
    const stockStore = useStockStore()

    const stockCardList = reactive<StockCardInterface[]>([
      { title: 'Total', amount: 1800, icon: 'ShoppingCartOutlined', color: '#039C52' },
      { title: 'Sold-out', amount: 12, icon: 'ExperimentOutlined', color: '#F18F15' },
      { title: 'Return', amount: 2, icon: 'RollbackOutlined', color: '#D94231' },
      { title: 'Discount', amount: 101, icon: 'GiftOutlined', color: '#03B8EA' }
    ])
    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image'
      },
      {
        name: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Stock',
        key: 'stock',
        dataIndex: 'stock'
      },
      {
        title: 'Created At',
        key: 'createdAt',
        dataIndex: 'createdAt'
      },
      {
        title: 'Updated At',
        key: 'updatedAt',
        dataIndex: 'updatedAt'
      },
      {
        title: 'Action',
        key: 'action'
      }
    ]

    const routeToEdit = (id: string) => {
      router.push(`/stock-edit/${id}`)
    }

    onMounted(async () => {
      stockStore.stocks = await stockStore.loadProducts()
    })

    return {
      filters,
      stockStore,
      columns,
      stockCardList,
      routeToEdit
    }
  }
})
</script>
