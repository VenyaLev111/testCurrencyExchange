<template>
  <HeaderComponent />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'

import { onMounted } from 'vue'
import { useCounterStore } from '@/stores/store'
import HeaderComponent from './components/HeaderComponent.vue'
import convertDate from './utils/convertDate'

const store = useCounterStore()

onMounted(async () => {
  const now = new Date()
  const today = convertDate(now)
  store.getCurrenciesWithDate(today, true)
})
</script>
