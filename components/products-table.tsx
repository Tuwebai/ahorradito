"use client"

import { Trophy, Clock, TrendingUp } from "lucide-react"
import type { ProductoConPrecios } from "@/types"
import { Button } from "@/components/ui/button"

interface ProductsTableProps {
  productos: ProductoConPrecios[]
  loading: boolean
}

export default function ProductsTable({ productos, loading }: ProductsTableProps) {
  if (loading) {
    return (
      <div className="bg-surface p-8 rounded-xl border border-border animate-pulse shadow-dark">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/20 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (productos.length === 0) {
    return (
      <div className="bg-surface p-12 rounded-xl border border-border text-center shadow-dark">
        <div className="text-muted-foreground">
          <div className="p-4 bg-muted/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <TrendingUp className="h-10 w-10 opacity-50" />
          </div>
          <p className="text-xl font-medium text-foreground mb-2">No se encontraron productos</p>
          <p className="text-muted-foreground">Probá cambiando los filtros de búsqueda</p>
        </div>
      </div>
    )
  }

  // Obtener todos los supermercados únicos
  const supermercados = Array.from(
    new Set(productos.flatMap((p) => p.precios.map((precio) => precio.supermercado.nombre))),
  ).sort()

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden animate-slide-up shadow-dark-lg">
      <div className="p-6 border-b border-border bg-background/50">
        <h2 className="text-xl font-bold text-foreground">Comparación de precios ({productos.length} productos)</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background/80">
            <tr>
              <th className="text-left p-5 text-foreground font-semibold min-w-[200px]">Producto</th>
              {supermercados.map((supermercado) => (
                <th key={supermercado} className="text-center p-5 text-foreground font-semibold min-w-[120px]">
                  {supermercado}
                </th>
              ))}
              <th className="text-center p-5 text-foreground font-semibold min-w-[100px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr
                key={producto.id}
                className={`border-b border-border hover:bg-background/50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-background/20" : ""
                }`}
              >
                <td className="p-5">
                  <div>
                    <p className="font-semibold text-foreground text-lg">{producto.nombre}</p>
                    <p className="text-sm text-muted-foreground font-medium">{producto.categoria}</p>
                  </div>
                </td>
                {supermercados.map((supermercadoNombre) => {
                  const precio = producto.precios.find((p) => p.supermercado.nombre === supermercadoNombre)

                  return (
                    <td key={supermercadoNombre} className="p-5 text-center">
                      {precio ? (
                        <div className="space-y-2">
                          <div
                            className={`font-bold text-xl ${
                              precio.esMasBarato
                                ? "text-secondary flex items-center justify-center space-x-2"
                                : "text-foreground"
                            }`}
                          >
                            {precio.esMasBarato && <Trophy className="h-5 w-5 shadow-glow-green" />}
                            <span>${precio.precio}</span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">{new Date(precio.fechaActualizacion).toLocaleDateString("es-AR")}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-medium">-</span>
                      )}
                    </td>
                  )
                })}
                <td className="p-5 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-200 font-medium"
                    disabled
                  >
                    Ver historial
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
