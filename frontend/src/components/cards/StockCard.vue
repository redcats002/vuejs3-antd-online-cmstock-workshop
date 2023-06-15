<template>
  <a-card hoverable class="tw-rounded-md tw-drop-shadow-sm tw-transition-all">
    <a-row align="center" justify="center" class="tw-h-full">
      <a-col :span="16">
        <a-card-meta :title="props.title?.toUpperCase()">
          <template #description>{{ filters.currency(props.amount) }}</template>
        </a-card-meta>
      </a-col>
      <a-col :span="8">
        <a-tag :color="props.color" class="tw-text-4xl tw-p-2 tw-py-4 tw-w-full">
          <a-row justify="center">
            <Icon :component="props.icon"> </Icon>
          </a-row>
        </a-tag>
      </a-col>
    </a-row>
  </a-card>
</template>
<script lang="ts" setup>
import filters from '@/services/filters'
import Icon from '@ant-design/icons-vue'
import { type Component, type FunctionalComponent, type PropType } from 'vue'
import type { IconType } from '@ant-design/icons-vue/lib/components/Icon'
import { any } from 'vue-types'

const props = defineProps({
  title: String,
  amount: Number,
  icon: Function as PropType<FunctionalComponent<IconType>>,
  color: String
})
</script>
