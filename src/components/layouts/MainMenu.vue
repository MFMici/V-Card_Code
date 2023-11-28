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
        <HomeIcon :active="route.name ==='Dashboard'" class="main-menu__icon" />
        <span :class="route.name ==='Dashboard' ? 'main-menu__font--active' : 'main-menu__font'">Home</span>
      </li>
      <li class="main-menu__item">
        <TransactionsIcon :active="route.name ==='Transactions'" class="main-menu__icon" />
        <span :class="route.name ==='Transactions' ? 'main-menu__font--active' : 'main-menu__font'">Transacations</span>
      </li>
      <li class="main-menu__item">
        <ContactsIcon :active="route.name ==='Contacts'" class="main-menu__icon" />
        <span :class="route.name ==='Contacts' ? 'main-menu__font--active' : 'main-menu__font'">Contacts</span>
      </li>
      <li class="main-menu__item">
        <ProfileIcon :active="route.name ==='Profile'" class="main-menu__icon" />
        <span :class="route.name ==='Profile' ? 'main-menu__font--active' : 'main-menu__font'">Profile</span>
      </li>
    </ul>
  </div>
</template>