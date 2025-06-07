import { reactive, ref, watch } from 'vue'
import type { Account} from '@/api/domains/accounts/accountTypes'
import { parseLabel, stringifyLabel } from '@/api/domains/accounts/accountService'

export const useAccountForm = (props: Account, onUpdate: (account: Account) => void) => {
  const labelInput = ref(stringifyLabel(props.label))

  const validation = reactive({
    login: true,
    password: true
  })

  const validate = (): boolean => {
    let valid = true

    const loginLength = props.login.trim().length
    validation.login = loginLength >= 3 && loginLength <= 100

    if (props.type === 'Local') {
      const passwordLength = props.password?.trim().length ?? 0
      validation.password = passwordLength >= 3 && passwordLength <= 100
    } else {
      validation.password = true
    }

    if (!validation.login || !validation.password) valid = false

    return valid
  }


  const trySave = () => {
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
