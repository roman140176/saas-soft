<template>
  <n-card class="account-item">
    <n-grid item-responsive x-gap="12" y-gap="8" :cols="12">
      <n-gi span="3">
        <n-input
          v-model:value="labelInput"
          placeholder="Метки через ;"
          @blur="trySave"
        />
      </n-gi>
      <n-gi span="2">
      <n-select
        v-model:value="local.type"
        :options="typeOptions"
        class="select-box"
      />
    </n-gi>
    <n-gi :span="loginSpan">
      <n-input
        v-model:value="local.login"
        placeholder="Логин"
        :status="validation.login ? 'success' : 'error'"
        @blur="trySave"
      />
    </n-gi>
    <n-gi v-if="local.type === 'Local'" span="3">
      <n-input        
        v-model:value="local.password"
        type="password"
        show-password
        placeholder="Пароль"
        :status="validation.password ? 'success' : 'error'"
        @blur="trySave"
      />
    </n-gi>


      <n-gi span="1">
        <n-button type="error" @click="emitRemove">Удалить</n-button>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { useAccountForm } from '@/composables/useAccountForm'
import type { Account } from '@/api/domains/accounts/accountTypes'
import { computed } from 'vue'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update', account: Account): void
  (e: 'remove', id: string): void
}>()

const { local, labelInput, validation, trySave } = useAccountForm(
  props.account,
  (account) => emit('update', account)
)

function emitRemove() {
  emit('remove', local.id)
}

const typeOptions: { label: string; value: Account['type'] }[] = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Local', value: 'Local' }
]
const loginSpan = computed(() => local.type === 'LDAP' ? 6 : 3)
</script>
<style scoped>

.n-card.account-item .n-card__content{
  display: grid!important;
  grid-template-columns: minmax(200px,1fr)!important;
}
</style>