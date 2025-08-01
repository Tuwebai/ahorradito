"use client"

import { useState, useEffect } from "react"
import type { CarritoItem, ProductoConPrecios } from "@/types"

const STORAGE_KEY = "ahorradito-carrito"

export function useCarrito() {
  const [items, setItems] = useState<CarritoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedCarrito = localStorage.getItem(STORAGE_KEY)
      if (savedCarrito) {
        const parsedCarrito = JSON.parse(savedCarrito)
        setItems(parsedCarrito)
      }
    } catch (error) {
      console.error("Error cargando carrito desde localStorage:", error)
      // Si hay error, limpiar localStorage corrupto
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error("Error guardando carrito en localStorage:", error)
      }
    }
  }, [items, isLoading])

  const agregarItem = (producto: ProductoConPrecios, cantidad: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.producto.id === producto.id)
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevItems.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      } else {
        // Si no existe, agregar nuevo item
        const nuevoItem: CarritoItem = {
          producto: {
            id: producto.id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            marca: producto.marca,
            descripcion: producto.descripcion,
          },
          cantidad,
          precio: producto.precioMinimo,
        }
        return [...prevItems, nuevoItem]
      }
    })
  }

  const quitarItem = (productoId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.producto.id !== productoId))
  }

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      quitarItem(productoId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  const limpiarCarrito = () => {
    setItems([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error limpiando carrito:", error)
    }
  }

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0)

  const totalPrecio = items.reduce((total, item) => {
    const precio = item.precio || 0
    return total + precio * item.cantidad
  }, 0)

  return {
    items,
    totalItems,
    totalPrecio,
    isLoading,
    agregarItem,
    quitarItem,
    actualizarCantidad,
    limpiarCarrito,
  }
}
