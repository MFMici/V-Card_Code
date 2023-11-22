<script setup>
import { RouterView} from 'vue-router';
import HourglassLoader from '@/components/icons/HourglassLoader.vue'

</script>

<template>
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
        <Suspense>
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback>
          <HourglassLoader />
          </template>
        </Suspense>
    </Transition>
  </template>
</RouterView>
</template>
