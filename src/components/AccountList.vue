<template>
  <n-form>
    <n-space vertical>
      <AccountItem v-for="account in store.accounts" :key="account.id" :account="account" @update="store.updateAccount"
        @remove="store.removeAccount" />
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useAccountStore } from '@/api/domains/accounts/accountStore'
const AccountItem = defineAsyncComponent(() => import('./AccountItem.vue'))

const store = useAccountStore()
</script>
