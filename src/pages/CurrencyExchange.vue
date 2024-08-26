<template>
  <div class="Page">
    <SearchCurrencies @searchHandler="searchHandler" />

    <CurrenciesList isChanged="main" :filteredData="paginatedItems" />

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

const data = useCounterStore()

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredData.value.slice(startIndex, endIndex)
})

const filteredData = computed(() => {
  return toRaw(data.currencies).filter((currency) =>
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

<style lang="scss">
.Page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 0;
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }

  .paginate-buttons {
    height: 35px;
    width: 35px;
    cursor: pointer;
    background-color: white;
    border: none;
    color: black;
    border-radius: 3px;
  }

  .paginate-buttons:hover {
    background-color: #f3f3f3;
  }

  .active-page,
  .active-page:hover {
    background-color: #f3f3f3;
  }

  .back-button,
  .next-button {
    background-color: black !important;
    color: white;
  }
}
</style>
