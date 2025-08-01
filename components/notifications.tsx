"use client"

import { useState, useEffect } from "react"
import { Bell, X, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { NotificacionPrecio } from "@/types"

export default function Notifications() {
  const [notificaciones, setNotificaciones] = useState<NotificacionPrecio[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Simular notificaciones
    const notificacionesSimuladas: NotificacionPrecio[] = [
      {
        id: "1",
        productoId: 1,
        precioAnterior: 480,
        precioNuevo: 450,
        supermercado: "Coto",
        fecha: "2024-01-15",
        leida: false,
      },
      {
        id: "2",
        productoId: 4,
        precioAnterior: 1300,
        precioNuevo: 1180,
        supermercado: "Carrefour",
        fecha: "2024-01-14",
        leida: false,
      },
    ]
    setNotificaciones(notificacionesSimuladas)
  }, [])

  const marcarComoLeida = (id: string) => {
    setNotificaciones((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)))
  }

  const eliminarNotificacion = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id))
  }

  const noLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all duration-200 p-2 rounded-lg"
        >
          <Bell className="h-5 w-5" />
          {noLeidas > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-glow-green">
              {noLeidas}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-surface border border-border text-foreground shadow-dark-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notificaciones de precios</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notificaciones.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-muted/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">No tenés notificaciones</p>
              <p className="text-muted-foreground text-sm">Te avisaremos cuando bajen los precios</p>
            </div>
          ) : (
            notificaciones.map((notificacion) => (
              <div
                key={notificacion.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  notificacion.leida 
                    ? "bg-background border-border hover:shadow-dark" 
                    : "bg-primary/10 border-primary/30 shadow-dark hover:shadow-dark-lg"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-secondary" />
                      <span className="font-semibold text-foreground">¡Bajó el precio!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Producto ID {notificacion.productoId} en <span className="font-medium text-primary">{notificacion.supermercado}</span>
                    </p>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-muted-foreground line-through">${notificacion.precioAnterior}</span>
                      <span className="text-secondary font-bold text-lg">${notificacion.precioNuevo}</span>
                      <span className="savings-highlight text-xs font-semibold">
                        -${notificacion.precioAnterior - notificacion.precioNuevo}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notificacion.leida && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => marcarComoLeida(notificacion.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-all duration-200"
                      >
                        ✓
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarNotificacion(notificacion.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
