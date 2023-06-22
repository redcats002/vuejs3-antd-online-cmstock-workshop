import { FetchingStatus } from '@/models/fetchingStatus'
import type { Product } from '@/models/product.model'
import api from '@/services/api'
import filters from '@/services/filters'
import { debounce } from 'lodash'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useStockStore = defineStore('stock', () => {
  const autocompleteOptions = ref([])
  const stocks = ref<Product[]>([])
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init)

  const getColorTagByStock = (stock: number) => {
    if (stock >= 20) {
      return 'success'
    } else if (stock >= 10) {
      return 'warning'
    }
    return 'error'
  }

  const loadProducts = async () => {
    setLoading(FetchingStatus.fetching)
    try {
      const res = await api.getProducts()
      return res.data // Assign value to stocks using .value property
    } catch (error) {
      return []
    } finally {
      setLoading(FetchingStatus.success)
    }
  }

  const setLoading = (value: FetchingStatus) => {
    fetchingStatus.value = value
  }

  const getProductImage = (image: any) => {
    return filters.fullImageUrl(image)
  }

  const isLoading = () => {
    return fetchingStatus.value == FetchingStatus.fetching
  }

  const createDebounceSearches = async (value: string) => {
    await debouncedSearch(value)
  }

  const debouncedSearch = debounce(async (value: string) => {
    setLoading(FetchingStatus.fetching)
    try {
      if (value) {
        const result = await api.getProductByKeyword(value)
        stocks.value = result.data
        autocompleteOptions.value = result.data.map((product: any) => ({
          value: product.name
        }))
      } else {
        stocks.value = await loadProducts()
      }
    } finally {
      setTimeout(() => {
        setLoading(FetchingStatus.success)
      }, 1000)
    }
  }, 500) // Adjust the debounce delay as needed

  const onSelect = async (value: any) => {
    setLoading(FetchingStatus.fetching)
    try {
      if (value) {
        const result = await api.getProductByKeyword(value)
        stocks.value = result.data
      } else {
        stocks.value = await loadProducts()
      }
    } finally {
      setTimeout(() => {
        setLoading(FetchingStatus.success)
      }, 1000)
    }
  }

  const onConfirmDelete = async (id: any) => {
    await api.deleteProduct(id)
    stocks.value = await loadProducts()
  }

  watch(
    stocks,
    () => {
      // Update autocomplete options when stocks change
      autocompleteOptions.value = stocks.value.map((product: Product) => ({
        value: product.name
      })) as any
    },
    { deep: true }
  )

  return {
    loadProducts,
    fetchingStatus,
    getColorTagByStock,
    setLoading,
    getProductImage,
    isLoading,
    stocks,
    onSelect,
    createDebounceSearches,
    onConfirmDelete,
    autocompleteOptions
  }
})
