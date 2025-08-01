"use client"

import { useState, useEffect } from "react"
import type { ProductoFavorito } from "@/types"

const STORAGE_KEY = "ahorradito-favoritos"

export function useFavorites() {
  const [favoritos, setFavoritos] = useState<ProductoFavorito[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar favoritos desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedFavoritos = localStorage.getItem(STORAGE_KEY)
      if (savedFavoritos) {
        const parsedFavoritos = JSON.parse(savedFavoritos)
        setFavoritos(parsedFavoritos)
      }
    } catch (error) {
      console.error("Error cargando favoritos desde localStorage:", error)
      // Si hay error, limpiar localStorage corrupto
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar favoritos en localStorage cuando cambie
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
      } catch (error) {
        console.error("Error guardando favoritos en localStorage:", error)
      }
    }
  }, [favoritos, isLoading])

  const esFavorito = (productoId: number): boolean => {
    return favoritos.some((fav) => fav.productoId === productoId)
  }

  const agregarFavorito = (productoId: number, alertaPrecio?: number) => {
    if (esFavorito(productoId)) {
      return // Ya es favorito
    }

    const nuevoFavorito: ProductoFavorito = {
      productoId,
      fechaAgregado: new Date().toISOString(),
      alertaPrecio,
    }

    setFavoritos((prev) => [...prev, nuevoFavorito])
  }

  const quitarFavorito = (productoId: number) => {
    setFavoritos((prev) => prev.filter((fav) => fav.productoId !== productoId))
  }

  const toggleFavorito = (productoId: number, alertaPrecio?: number) => {
    if (esFavorito(productoId)) {
      quitarFavorito(productoId)
    } else {
      agregarFavorito(productoId, alertaPrecio)
    }
  }

  const actualizarAlertaPrecio = (productoId: number, alertaPrecio: number) => {
    setFavoritos((prev) =>
      prev.map((fav) =>
        fav.productoId === productoId ? { ...fav, alertaPrecio } : fav
      )
    )
  }

  const limpiarFavoritos = () => {
    setFavoritos([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error limpiando favoritos:", error)
    }
  }

  const totalFavoritos = favoritos.length

  return {
    favoritos,
    totalFavoritos,
    isLoading,
    esFavorito,
    agregarFavorito,
    quitarFavorito,
    toggleFavorito,
    actualizarAlertaPrecio,
    limpiarFavoritos,
  }
}
