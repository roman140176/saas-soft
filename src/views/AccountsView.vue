<template>
  <div class="container">
    <n-space vertical>
      <h3>
      Учётные записи
      </h3>
      <n-button type="primary" @click="store.addAccount">Добавить аккаунт</n-button>
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
  max-width: 1200px;
  margin: 0 auto;
}
</style>