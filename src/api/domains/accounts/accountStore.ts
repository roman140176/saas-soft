import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from './accountTypes';
import { persistenceService } from '@/services/persistenceService';
import { v4 as uuidv4 } from 'uuid';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>(persistenceService.load() ?? []);

  function addAccount() {
    accounts.value.push({
      id: uuidv4(),
      label: [],
      type: 'LDAP',
      login: '',
      password: null,
    });
    persistenceService.save(accounts.value);
  }

  function removeAccount(id: string) {
    accounts.value = accounts.value.filter(acc => acc.id !== id);
    persistenceService.save(accounts.value);
  }

  function updateAccount(updated: Account) {
    const idx = accounts.value.findIndex(acc => acc.id === updated.id);
    if (idx !== -1) {
      accounts.value[idx] = updated;
      persistenceService.save(accounts.value);
    }
  }

  return { accounts, addAccount, removeAccount, updateAccount };
});
