"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import type { ProductoConPrecios } from "@/types"
import { useState } from "react"

interface ProductsGridProps {
  productos: ProductoConPrecios[]
  loading: boolean
}

export default function ProductsGrid({ productos, loading }: ProductsGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted/20 rounded-lg w-48 animate-pulse"></div>
          <div className="flex space-x-3">
            <div className="h-10 w-10 bg-muted/20 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-muted/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted/20 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Productos encontrados ({productos.length})</h2>
        <div className="flex space-x-3">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`p-3 transition-all duration-200 ${
              viewMode === "grid" 
                ? "bg-primary text-primary-foreground shadow-glow-blue" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`p-3 transition-all duration-200 ${
              viewMode === "list" 
                ? "bg-primary text-primary-foreground shadow-glow-blue" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {productos.length === 0 ? (
        <div className="text-center py-16">
          <div className="p-4 bg-muted/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <LayoutGrid className="h-10 w-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-3">No se encontraron productos</h3>
          <p className="text-muted-foreground">Probá ajustando los filtros de búsqueda</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
          }
        >
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}
