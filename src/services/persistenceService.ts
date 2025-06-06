const STORAGE_KEY = 'accounts-data';

export const persistenceService = {
  save(data: unknown) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  load<T = unknown>(): T | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
