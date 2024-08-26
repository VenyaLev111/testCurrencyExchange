<template>
  <div class="wrapper">
    <h2>Курс валют</h2>
    <RouterLink
      v-for="currency in filteredData"
      :to="`/detail/${currency.cc}`"
      @click="setFromPage"
      :key="currency.r030"
      class="currencies"
    >
      <p>{{ currency.txt }}</p>
      <p>{{ currency.rate }}</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/store'
const props = defineProps(['filteredData', 'isChanged'])
const store = useCounterStore()

const setFromPage = () => {
  store.setFromChangedPage(props.isChanged)
}
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  min-height: 650px;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
}
.currencies {
  margin: 5px;
  width: 640px;
  display: flex;
  padding: 12px 10px;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: black;
  text-decoration: none;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.09),
    0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}
</style>
