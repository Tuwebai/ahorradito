"use client"

import { TrendingDown, ShoppingCart, MapPin, Package } from "lucide-react"
import type { ProductoConPrecios } from "@/types"

interface StatsProps {
  productos: ProductoConPrecios[]
  ciudadSeleccionada: string
}

export default function Stats({ productos, ciudadSeleccionada }: StatsProps) {
  const totalProductos = productos.length
  const promedioAhorro =
    productos.length > 0
      ? productos.reduce((acc, producto) => {
          const precios = producto.precios.map((p) => p.precio)
          const max = Math.max(...precios)
          const min = Math.min(...precios)
          return acc + (max - min)
        }, 0) / productos.length
      : 0

  const supermercadosUnicos = new Set(productos.flatMap((p) => p.precios.map((precio) => precio.supermercado.nombre)))
    .size

  const stats = [
    {
      icon: Package,
      label: "Productos comparados",
      value: totalProductos.toString(),
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      icon: MapPin,
      label: "Ciudad seleccionada",
      value: ciudadSeleccionada === "todas" ? "Todas" : ciudadSeleccionada,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
    {
      icon: ShoppingCart,
      label: "Supermercados",
      value: supermercadosUnicos.toString(),
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      icon: TrendingDown,
      label: "Ahorro promedio",
      value: `$${Math.round(promedioAhorro)}`,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-surface p-5 rounded-xl border ${stat.borderColor} ${stat.bgColor} animate-fade-in shadow-dark hover:shadow-dark-lg transition-all duration-300 hover-glow-blue`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-background/50 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
