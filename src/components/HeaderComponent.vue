<template>
  <header>
    <nav>
      <RouterLink to="/">Головна</RouterLink>
      <RouterLink to="/changed">Змінені курси</RouterLink>
      <RouterLink to="/course">Пошук курсу</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  display: block;
  height: 50px;
  color: black;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

nav a.router-link-exact-active {
  color: rgb(103, 158, 103);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
  border-left: 1px solid var(--color-border);
  color: black;
}

nav a:first-of-type {
  border: 0;
}
</style>
