import { toRefs, reactive, ref, watch } from 'vue'
import type { Account, AccountType } from '@/api/domains/accounts/accountTypes'
import { parseLabel, stringifyLabel } from '@/api/domains/accounts/accountService'

export function useAccountForm(props: Account, onUpdate: (account: Account) => void) {
  const labelInput = ref(stringifyLabel(props.label))

  const validation = reactive({
    login: true,
    password: true
  })

  function validate(): boolean {
    let valid = true

    validation.login = !!props.login.trim() && props.login.trim().length <= 100
    validation.password = props.type === 'Local'
      ? !!props.password?.trim() && props.password.trim().length <= 100
      : true

    if (!validation.login || !validation.password) valid = false

    return valid
  }

  function trySave() {
    if (validate()) {
      onUpdate({
        ...props,
        label: parseLabel(labelInput.value)
      })
    }
  }

  watch(() => props.type, (newType) => {
    if (newType === 'LDAP') {
      props.password = null
    }
    trySave()
  })

  return {
    local: props,
    labelInput,
    validation,
    trySave
  }
}
