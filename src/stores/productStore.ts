import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/models/product'
import { ProductService } from '@/services/productService'
import type { ProductDto } from '@/types/dto/productDto'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProducts() {
    loading.value = true
    error.value = null

    try {
      const result = await ProductService.fetchProducts()
      products.value = result
    } catch (e) {
      error.value = 'Ошибка загрузки данных'
    } finally {
      loading.value = false
    }
  }

  async function createProduct(product: ProductDto) {
    try {
      const created = await ProductService.createProduct(product)
      products.value.push(created)
    } catch (e) {
      console.error(e)
    }
  }

  async function refreshProducts() {
    await loadProducts()
  }

  return {
    products,
    loading,
    error,
    loadProducts,
    refreshProducts,
    createProduct
  }
})
