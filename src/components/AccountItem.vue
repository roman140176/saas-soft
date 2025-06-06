<template>
  <n-card>
    <n-space class="account-item">
      <n-input v-model:value="labelInput" placeholder="Метки через ;" />
      <n-select v-model:value="local.type" :options="typeOptions" class="select-"/>
      <n-input v-model:value="local.login" placeholder="Login" />
      <n-input v-if="local.type === 'Local'" v-model:value="local.password" type="password" show-password
        placeholder="Пароль" />

      <n-space>
        <n-button type="primary" @click="emitUpdate">Сохранить</n-button>
        <n-button type="error" @click="emitRemove">Удалить</n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Account } from '@/api/domains/accounts/accountTypes'
import { parseLabel, stringifyLabel } from '@/api/domains/accounts/accountService'
import { NCard, NInput, NSelect, NSpace, NButton } from 'naive-ui'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update', account: Account): void
  (e: 'remove', id: string): void
}>()

const local = reactive({
  id: props.account.id,
  login: props.account.login,
  password: props.account.password,
  type: props.account.type
})

const labelInput = ref(stringifyLabel(props.account.label))

function normalizePassword() {
  if (local.type === 'LDAP') {
    local.password = null
  }
}

watch(
  () => props.account,
  (newVal) => {
    Object.assign(local, newVal)
    labelInput.value = stringifyLabel(newVal.label)
    normalizePassword()
  }
)

const typeOptions = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Local', value: 'Local' }
]


function emitUpdate() {
  emit('update', {
    ...local,
    label: parseLabel(labelInput.value)
  })
}

function emitRemove() {
  emit('remove', local.id)
}
</script>

<style scoped>

</style>