"use client"

import { useState } from "react"
import { ShoppingCart, X, Minus, Plus, Trash2, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCarrito } from "@/hooks/use-carrito"
import type { ProductoConPrecios } from "@/types"

interface CarritoModalProps {
  productos: ProductoConPrecios[]
}

export default function CarritoModal({ productos }: CarritoModalProps) {
  const { items, quitarItem, actualizarCantidad, limpiarCarrito, totalItems } = useCarrito()
  const [open, setOpen] = useState(false)

  // Calcular el supermercado más barato para cada item
  const calcularMejorOpcion = () => {
    const supermercados = new Set<string>()
    const totalesPorSupermercado: { [key: string]: number } = {}

    items.forEach((item) => {
      const producto = productos.find((p) => p.id === item.producto.id)
      if (producto) {
        producto.precios.forEach((precio) => {
          const nombreSuper = precio.supermercado.nombre
          supermercados.add(nombreSuper)

          if (!totalesPorSupermercado[nombreSuper]) {
            totalesPorSupermercado[nombreSuper] = 0
          }
          totalesPorSupermercado[nombreSuper] += precio.precio * item.cantidad
        })
      }
    })

    return Object.entries(totalesPorSupermercado)
      .map(([supermercado, total]) => ({ supermercado, total }))
      .sort((a, b) => a.total - b.total)
  }

  const mejoresOpciones = calcularMejorOpcion()
  const mejorOpcion = mejoresOpciones[0]

  if (items.length === 0) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="relative bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Carrito más barato
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-surface border border-border text-foreground max-w-2xl max-h-[80vh] overflow-y-auto shadow-dark-lg">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl font-bold">Carrito más barato</DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <div className="p-4 bg-muted/20 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-foreground text-lg font-medium mb-2">Tu carrito está vacío</p>
            <p className="text-muted-foreground">Agregá productos para ver dónde te conviene comprar</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Carrito más barato
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-glow-green">
              {totalItems}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-surface border border-border text-foreground max-w-2xl max-h-[80vh] overflow-y-auto shadow-dark-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold flex items-center justify-between">
            <span>Carrito más barato</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={limpiarCarrito} 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Items del carrito */}
          <div className="space-y-3">
            {items.map((item) => {
              const producto = productos.find((p) => p.id === item.producto.id)
              const precioMinimo = producto?.precioMinimo || 0

              return (
                <div
                  key={item.producto.id}
                  className="flex items-center justify-between p-4 bg-background rounded-xl border border-border shadow-dark hover:shadow-dark-lg transition-all duration-200"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg">{item.producto.nombre}</h4>
                    <p className="text-sm text-muted-foreground">${precioMinimo} c/u</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}
                      className="h-9 w-9 p-0 hover:bg-muted/20 transition-all duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-semibold text-foreground">{item.cantidad}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}
                      className="h-9 w-9 p-0 hover:bg-muted/20 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => quitarItem(item.producto.id)}
                      className="h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Comparación de supermercados */}
          <div className="border-t border-border pt-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">Comparación de totales</h3>
            </div>

            <div className="space-y-3">
              {mejoresOpciones.map((opcion, index) => (
                <div
                  key={opcion.supermercado}
                  className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-200 ${
                    index === 0 
                      ? "bg-secondary/20 border-secondary/50 shadow-glow-green" 
                      : "bg-background border-border hover:shadow-dark"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {index === 0 && <span className="text-2xl">🏆</span>}
                    <span className={`text-lg ${index === 0 ? "font-bold text-secondary" : "text-foreground font-medium"}`}>
                      {opcion.supermercado}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${index === 0 ? "text-secondary" : "text-foreground"}`}>
                      ${opcion.total.toFixed(2)}
                    </div>
                    {index > 0 && mejorOpcion && (
                      <div className="text-sm text-muted-foreground">+${(opcion.total - mejorOpcion.total).toFixed(2)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {mejorOpcion && mejoresOpciones.length > 1 && (
              <div className="mt-5 p-4 bg-primary/10 border border-primary/20 rounded-xl shadow-dark">
                <p className="text-foreground text-lg">
                  <span className="font-bold text-primary">Ahorro máximo:</span> $
                  {(mejoresOpciones[mejoresOpciones.length - 1].total - mejorOpcion.total).toFixed(2)} comprando en{" "}
                  <span className="font-semibold text-primary">{mejorOpcion.supermercado}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
