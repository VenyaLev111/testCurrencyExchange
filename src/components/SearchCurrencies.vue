<template>
  <div class="searchWrapper">
    <input
      @keyup="onSearchHendler"
      class="search"
      placeholder="Пошук"
      v-model="search"
      type="text"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')
const emit = defineEmits(['searchHandler'])

function onSearchHendler() {
  emit('searchHandler', search)
}
</script>

<style scoped lang="scss">
.searchWrapper {
  position: relative;
  margin-bottom: 30px;
  .search {
    width: 640px;
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
</style>
