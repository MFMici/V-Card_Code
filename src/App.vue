<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }" class="router-view">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>