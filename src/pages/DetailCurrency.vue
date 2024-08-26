<template>
  <div class="detail">
    <div class="form">
      <div class="wrap">
        <input type="text" name="name" v-model="txt" />
      </div>
      <div class="wrap">
        <input type="text" name="rate" v-model="rate" />
      </div>
    </div>
    <div class="buttonWrapper">
      <input
        @click="saveCurrency"
        :disabled="!compare()"
        class="save"
        type="button"
        value="Зберігти"
      />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/store'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const txt = ref(null)
const rate = ref(null)

const store = useCounterStore()

const DetailCurrency = computed(() => {
  return store.getCurrency(route.params.id)
})
watchEffect(() => {
  txt.value = DetailCurrency?.value?.txt
  rate.value = DetailCurrency?.value?.rate
})

const compare = () => {
  return txt.value !== DetailCurrency?.value?.txt || rate.value !== DetailCurrency?.value?.rate
}

const saveCurrency = () => {
  const payload = {
    ...DetailCurrency.value,
    txt: txt.value,
    rate: rate.value
  }
  store.setChangedCurrencies(payload)
  router.push('/changed')
}
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  max-width: 640px;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  .buttonWrapper {
    display: flex;
    .save {
      margin-left: auto;
      display: flex;
      width: 100px;
      height: 35px;
      border: none;
      border-radius: 3px;
      background-color: rgb(0, 172, 114);
      color: white;
      &:disabled {
        background-color: lightgray;
      }
    }
  }

  .form {
    display: flex;
    justify-content: center;
    .wrap {
      position: relative;
      margin: 25px;
      input {
        font-size: 16px;
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
