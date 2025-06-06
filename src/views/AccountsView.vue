<template>
  <div class="container">
    <n-space horisontal align="center">
      <h3 class="title">
      Учётные записи
      </h3>
      <n-button ghost size="large" @click="store.addAccount">+</n-button>
      <AccountList />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/api/domains/accounts/accountStore'
import AccountList from '@/components/AccountList.vue'

const store = useAccountStore()
</script>

<style scoped>
.container {
  padding-top: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.title {
  margin: 0;
  font-size: 24px;
}
</style>