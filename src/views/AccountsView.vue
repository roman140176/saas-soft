<template>
  <div class="container">
    <n-space horisontal align="center">
      <h3 class="title">
      Учётные записи
      </h3>
      <n-button ghost size="large" @click="store.addAccount">+</n-button>
    </n-space>
    <n-card :bordered="false">
     <n-grid item-responsive x-gap="12" y-gap="8" :cols="12">
      <n-gi span="3">
        Метки
      </n-gi>
      <n-gi span="2">
        Тип Записи
      </n-gi>
      <n-gi span="3">
        Логин
      </n-gi>
      <n-gi span="4">
        Пароль
      </n-gi>
    </n-grid>
    </n-card>
      <AccountList />
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