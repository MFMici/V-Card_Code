<script setup>
import HomeIcon from "@/components/icons/HomeIcon.vue";
import TransactionsIcon from "@/components/icons/TransactionsIcon.vue";
import ContactsIcon from "@/components/icons/ContactsIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="main-menu__container">
    <ul class="main-menu__items">
      <li class="main-menu__item">
        <router-link :to="{name: 'Dashboard'}" class="main-menu__item-link">
        <HomeIcon :active="route.name ==='Dashboard'" class="main-menu__icon" />
        <span :class="route.name ==='Dashboard' ? 'main-menu__font--active' : 'main-menu__font'">Home</span>
      </router-link>
      </li>
      <li class="main-menu__item">
        <router-link :to="{name: 'Transactions'}" class="main-menu__item-link">
        <TransactionsIcon :active="route.name ==='Transactions'" class="main-menu__icon" />
       <span :class="route.name ==='Transactions' ? 'main-menu__font--active' : 'main-menu__font'">Transacations</span>
      </router-link>
      </li>
      <li class="main-menu__item">
        <router-link :to="{name: 'Contacts'}" class="main-menu__item-link">
        <ContactsIcon :active="route.name ==='Contacts'" class="main-menu__icon" />
        <span :class="route.name ==='Contacts' ? 'main-menu__font--active' : 'main-menu__font'">Contacts</span>
      </router-link>
      </li>
      <li class="main-menu__item">
        <router-link :to="{name: 'Settings'}" class="main-menu__item-link">
        <ProfileIcon :active="route.name ==='Settings'" class="main-menu__icon" />
        <span :class="route.name ==='Settings' ? 'main-menu__font--active' : 'main-menu__font'">Settings</span>
      </router-link>
      </li>
    </ul>
  </div>
</template>