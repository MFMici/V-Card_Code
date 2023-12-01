<script setup>
import { RouterView} from 'vue-router';
import HourglassLoader from '@/components/icons/HourglassLoader.vue'
import MainMenu from '@/components/layouts/MainMenu.vue'
import MainContainer from "@/components/containers/MainContainer.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const menuRoutes = ['Contacts', 'Dashboard', 'Transactions', 'SendMoney']

</script>

<template>
  <MainContainer>
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
    <MainMenu v-if="menuRoutes?.includes(route.name)"/>
  </MainContainer>
</template>
