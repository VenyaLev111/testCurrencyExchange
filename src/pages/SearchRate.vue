<template>
  <div class="Page">
    <SearchCurrencies @searchHandler="searchHandler" />

    <div class="calendar">
      <p>Виберіть дату за який ви хочете побачити курс валют</p>
      <Datepicker v-model="picked" />
      <input class="input" type="text" ref="calendarRef" />
    </div>

    <CurrenciesList isChanged="searchRate" :filteredData="paginatedItems" />

    <vue-awesome-paginate
      :total-items="filteredData.length"
      :items-per-page="itemsPerPage"
      v-model="currentPage"
      @click="onClickHandler"
    />
  </div>
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import { useCounterStore } from '@/stores/store'
import { ref, toRaw, computed, watchEffect } from 'vue'
import CurrenciesList from '@/components/CurrenciesList.vue'
import SearchCurrencies from '@/components/SearchCurrencies.vue'

const store = useCounterStore()
const date = store.selectDate ? store.selectDate : new Date()

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const picked = ref(date)
const calendarRef = ref(null)

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredData.value.slice(startIndex, endIndex)
})

const filteredData = computed(() => {
  return toRaw(store.selectedDateCurrencies).filter((currency) =>
    currency.txt.toLowerCase().includes(search.value.toLowerCase())
  )
})

const searchHandler = (str) => {
  search.value = str.value
}

const onClickHandler = (page) => {
  currentPage.value = page
}

watchEffect(() => {
  calendarRef?.value?.focus()
  store.setSelectedDate(picked.value)
})
</script>

<style lang="scss">
.Page {
  .calendar {
    display: flex;
    align-self: center;
    width: 640px;
    margin-bottom: 30px;
    .input {
      display: block;
      width: 0px;
      height: 0px;
      opacity: 0;
      pointer-events: none;
    }
    .v3dp__datepicker {
      margin-left: auto;
      position: relative;
      input {
        border: 0;
        height: 1.1876em;
        margin: 0;
        display: block;
        padding: 6px 0 7px;
        min-width: 0;
        background: none;
        box-sizing: content-box;
        animation-name: mui-auto-fill-cancel;
        letter-spacing: inherit;
        animation-duration: 10ms;
      }
      &:before {
        left: 0;
        right: 0;
        bottom: 0;
        content: '\00a0';
        position: absolute;
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        pointer-events: none;
      }
    }
  }
}
</style>
