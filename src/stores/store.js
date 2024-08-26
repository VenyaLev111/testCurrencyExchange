import { ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import convertDate from '@/utils/convertDate'

export const useCounterStore = defineStore('counter', () => {
  const currencies = ref([])
  const changedCurrencies = ref([])
  const selectedDateCurrencies = ref([])
  const fromChangedPage = ref('')
  const selectDate = ref('')
  function setCurrencies(data) {
    currencies.value = data
  }
  function getCurrency(id) {
    const obj = {
      changedCurrencies: changedCurrencies.value,
      searchRate: selectedDateCurrencies.value,
      main: currencies.value
    }
    const arr = obj[fromChangedPage.value] || currencies.value
    return toRaw(arr).find((item) => item.cc == id)
  }
  function setChangedCurrencies(data) {
    const changedList = toRaw(changedCurrencies.value)
    if (!changedList.length) {
      changedCurrencies.value.push(data)
    } else {
      const index = changedList.findIndex((item) => item.cc == data.cc)
      if (index !== -1) {
        changedCurrencies.value[index] = data
      } else {
        changedCurrencies.value.push(data)
      }
    }
  }
  function setFromChangedPage(flag) {
    fromChangedPage.value = flag
  }
  function setSelectedDateCurrencies(data) {
    selectedDateCurrencies.value = data
  }
  function setSelectedDate(dataOrigin) {
    const data = convertDate(dataOrigin)
    if (!selectDate.value || convertDate(selectDate.value) !== data) {
      selectDate.value = dataOrigin
      getCurrenciesWithDate(data)
    }
  }
  async function getCurrenciesWithDate(selectDate, ifMainPage) {
    const response = await fetch(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${selectDate}&json`
    )
    if (response.ok) {
      if (ifMainPage) {
        setCurrencies(await response.json())
      } else {
        setSelectedDateCurrencies(await response.json())
      }
    } else {
      console.error('Ошибка при выполнении запроса:', response.statusText)
    }
  }
  return {
    currencies,
    changedCurrencies,
    selectedDateCurrencies,
    fromChangedPage,
    selectDate,
    setCurrencies,
    getCurrency,
    setChangedCurrencies,
    setFromChangedPage,
    setSelectedDateCurrencies,
    getCurrenciesWithDate,
    setSelectedDate
  }
})
