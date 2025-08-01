export interface Producto {
  id: number
  nombre: string
  categoria: string
  marca?: string
  descripcion?: string
}

export interface Supermercado {
  id: number
  nombre: string
  ciudad: string
  direccion?: string
  telefono?: string
}

export interface Precio {
  productoId: number
  supermercadoId: number
  precio: number
  fechaActualizacion: string
}

export interface HistorialPrecio {
  fecha: string
  precio: number
}

export interface ProductoConPrecios extends Producto {
  precios: Array<{
    supermercado: Supermercado
    precio: number
    fechaActualizacion: string
    esMasBarato: boolean
  }>
  precioMinimo: number
  precioMaximo: number
  ahorroMaximo: number
}

export interface CarritoItem {
  producto: Producto
  cantidad: number
  supermercadoSeleccionado?: Supermercado
  precio?: number
}

export interface ProductoFavorito {
  productoId: number
  fechaAgregado: string
  alertaPrecio?: number
}

export interface NotificacionPrecio {
  id: string
  productoId: number
  precioAnterior: number
  precioNuevo: number
  supermercado: string
  fecha: string
  leida: boolean
}
