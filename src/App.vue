<script setup>
import { RouterView} from 'vue-router';
import HourglassLoader from '@/components/icons/HourglassLoader.vue'
import MainMenu from '@/components/layouts/MainMenu.vue'
import MainContainer from "@/components/containers/MainContainer.vue";
import { useRoute } from 'vue-router';
import {computed} from "vue";

const route = useRoute();
const isMenuEnabled = computed(() => {
  return route.name === 'Contacts';
});

</script>

<template>
  <MainContainer v-if="isMenuEnabled">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="in-out">
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
    <MainMenu />
  </MainContainer>

  <RouterView v-else v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="in-out">
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
