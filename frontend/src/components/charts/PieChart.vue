<template>
  <a-row>
    <a-col>
      <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
        <template #title>
          <span class="tw-font-bold tw-text-[1.5rem] tw-block">Earning Report</span>
        </template>
        <DoughnutChart
          ref="doughnutRef"
          :chartData="testData"
          :options="options"
          class="tw-h-full md:tw-max-h-[300px]"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from 'vue'
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import filters from '@/services/filters'

Chart.register(...registerables)

const props = defineProps({
  data: Array
})

const doughnutRef = ref()

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: true
    },
    title: {
      display: false,
      text: 'Earning'
    }
  }
})

const testData = computed(() => ({
  labels: ['Commissions', 'Donation', 'Sales'],
  datasets: [
    {
      data: props.data as any,
      backgroundColor: ['#A9E4EF', '#81F495', '#96F550']
    }
  ]
}))

const {} = useDoughnutChart(testData)
</script>
