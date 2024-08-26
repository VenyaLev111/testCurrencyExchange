<template>
  <div class="Page">
    <SearchCurrencies @searchHandler="searchHandler" />

    <CurrenciesList isChanged="changedCurrencies" :filteredData="paginatedItems" />

    <vue-awesome-paginate
      :total-items="filteredData.length"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
      @click="onClickHandler"
    />
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/store'
import { ref, toRaw, computed } from 'vue'
import CurrenciesList from '@/components/CurrenciesList.vue'
import SearchCurrencies from '@/components/SearchCurrencies.vue'

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const store = useCounterStore()

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredData.value.slice(startIndex, endIndex)
})

const filteredData = computed(() => {
  return toRaw(store.changedCurrencies).filter((currency) =>
    currency.txt.toLowerCase().includes(search.value.toLowerCase())
  )
})

const searchHandler = (str) => {
  search.value = str.value
}

const onClickHandler = (page) => {
  currentPage.value = page
}
</script>
