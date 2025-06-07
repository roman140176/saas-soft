import { defineAsyncComponent, type AsyncComponentLoader, type Component } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

interface AsyncOptions {
  loadingComponent?: Component
  delay?: number
  timeout?: number
  maxRetries?: number
}

export const loadAsyncComponent = <T extends Component>(
  loader: AsyncComponentLoader<T>,
  options: AsyncOptions = {}
) => {
  const {
    loadingComponent = LoadingSpinner,
    delay = 200,
    timeout = 5000,
    maxRetries = 3,
  } = options

  return defineAsyncComponent({
    loader,
    delay,
    timeout,
    loadingComponent,
    suspensible: false,
    onError(error, retry, fail, attempts) {
      if (attempts <= maxRetries) {
        console.warn(`[AsyncComponent] Ошибка загрузки, попытка ${attempts}. Ретрай...`, error)
        retry()
      } else {
        console.error(`[AsyncComponent] Не удалось загрузить компонент после ${attempts} попыток.`, error)
        fail()
      }
    }
  })
}
