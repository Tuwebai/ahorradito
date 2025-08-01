import type { Producto, Supermercado, Precio, ProductoConPrecios } from "@/types"
import productosData from "@/data/productos.json"
import supermercadosData from "@/data/supermercados.json"
import preciosData from "@/data/precios.json"

// Cache para mejorar performance
const cache = new Map<string, any>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

interface CacheItem {
  data: any
  timestamp: number
}

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key)
  if (!cached) return null

  const now = Date.now()
  if (now - cached.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }

  return cached.data
}

function setCachedData(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export class DataService {
  private static productos: Producto[] = productosData
  private static supermercados: Supermercado[] = supermercadosData
  private static precios: Precio[] = preciosData

  static async getProductos(): Promise<Producto[]> {
    const cacheKey = "productos"
    const cached = getCachedData<Producto[]>(cacheKey)
    if (cached) return cached

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 100))
      setCachedData(cacheKey, this.productos)
      return this.productos
    } catch (error) {
      console.error("Error obteniendo productos:", error)
      throw new Error("No se pudieron cargar los productos")
    }
  }

  static async getSupermercados(): Promise<Supermercado[]> {
    const cacheKey = "supermercados"
    const cached = getCachedData<Supermercado[]>(cacheKey)
    if (cached) return cached

    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setCachedData(cacheKey, this.supermercados)
      return this.supermercados
    } catch (error) {
      console.error("Error obteniendo supermercados:", error)
      throw new Error("No se pudieron cargar los supermercados")
    }
  }

  static async getCiudades(): Promise<string[]> {
    const cacheKey = "ciudades"
    const cached = getCachedData<string[]>(cacheKey)
    if (cached) return cached

    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const ciudades = [...new Set(this.supermercados.map((s) => s.ciudad))]
      const sortedCiudades = ciudades.sort()
      setCachedData(cacheKey, sortedCiudades)
      return sortedCiudades
    } catch (error) {
      console.error("Error obteniendo ciudades:", error)
      throw new Error("No se pudieron cargar las ciudades")
    }
  }

  static async getCategorias(): Promise<string[]> {
    const cacheKey = "categorias"
    const cached = getCachedData<string[]>(cacheKey)
    if (cached) return cached

    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const categorias = [...new Set(this.productos.map((p) => p.categoria))]
      const sortedCategorias = categorias.sort()
      setCachedData(cacheKey, sortedCategorias)
      return sortedCategorias
    } catch (error) {
      console.error("Error obteniendo categorías:", error)
      throw new Error("No se pudieron cargar las categorías")
    }
  }

  static async getProductosConPrecios(
    ciudad?: string,
    categoria?: string,
    busqueda?: string,
  ): Promise<ProductoConPrecios[]> {
    const cacheKey = `productos-${ciudad || 'todas'}-${categoria || 'todas'}-${busqueda || 'sin-busqueda'}`
    const cached = getCachedData<ProductoConPrecios[]>(cacheKey)
    if (cached) return cached

    try {
      await new Promise((resolve) => setTimeout(resolve, 200))

      let productos = this.productos
      let supermercados = this.supermercados

      // Filtrar por ciudad
      if (ciudad) {
        supermercados = supermercados.filter((s) => s.ciudad === ciudad)
      }

      // Filtrar por categoría
      if (categoria) {
        productos = productos.filter((p) => p.categoria === categoria)
      }

      // Filtrar por búsqueda
      if (busqueda) {
        const busquedaLower = busqueda.toLowerCase().trim()
        productos = productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(busquedaLower) ||
            p.categoria.toLowerCase().includes(busquedaLower) ||
            (p.marca && p.marca.toLowerCase().includes(busquedaLower)),
        )
      }

      const productosConPrecios: ProductoConPrecios[] = productos
        .map((producto) => {
          const preciosProducto = this.precios
            .filter((p) => p.productoId === producto.id)
            .map((precio) => {
              const supermercado = supermercados.find((s) => s.id === precio.supermercadoId)
              return supermercado
                ? {
                    supermercado,
                    precio: precio.precio,
                    fechaActualizacion: precio.fechaActualizacion,
                    esMasBarato: false,
                  }
                : null
            })
            .filter(Boolean) as any[]

          if (preciosProducto.length === 0) {
            return null
          }

          // Encontrar el precio mínimo y máximo
          const precios = preciosProducto.map((p) => p.precio)
          const precioMinimo = Math.min(...precios)
          const precioMaximo = Math.max(...precios)
          const ahorroMaximo = precioMaximo - precioMinimo

          // Marcar los precios más baratos
          preciosProducto.forEach((p) => {
            p.esMasBarato = p.precio === precioMinimo
          })

          return {
            ...producto,
            precios: preciosProducto,
            precioMinimo,
            precioMaximo,
            ahorroMaximo,
          }
        })
        .filter(Boolean) as ProductoConPrecios[]

      setCachedData(cacheKey, productosConPrecios)
      return productosConPrecios
    } catch (error) {
      console.error("Error obteniendo productos con precios:", error)
      throw new Error("No se pudieron cargar los productos con precios")
    }
  }

  static async getProductoPorId(id: number): Promise<ProductoConPrecios | null> {
    try {
      const productos = await this.getProductosConPrecios()
      return productos.find((p) => p.id === id) || null
    } catch (error) {
      console.error("Error obteniendo producto por ID:", error)
      throw new Error("No se pudo cargar el producto")
    }
  }

  static async buscarProductos(query: string): Promise<ProductoConPrecios[]> {
    if (!query.trim()) {
      return []
    }

    try {
      return await this.getProductosConPrecios(undefined, undefined, query)
    } catch (error) {
      console.error("Error buscando productos:", error)
      throw new Error("No se pudo realizar la búsqueda")
    }
  }

  // Método para limpiar cache (útil para testing o cuando se actualizan datos)
  static clearCache(): void {
    cache.clear()
  }
}
