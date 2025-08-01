"use client"

import { TrendingDown, ShoppingCart, MapPin, Package, DollarSign, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { ProductoConPrecios } from "@/types"

interface EnhancedStatsProps {
  productos: ProductoConPrecios[]
  ciudadSeleccionada: string
}

export default function EnhancedStats({ productos, ciudadSeleccionada }: EnhancedStatsProps) {
  const totalProductos = productos.length
  const promedioAhorro =
    productos.length > 0 ? productos.reduce((acc, producto) => acc + producto.ahorroMaximo, 0) / productos.length : 0

  const supermercadosUnicos = new Set(productos.flatMap((p) => p.precios.map((precio) => precio.supermercado.nombre)))
    .size

  const ahorroTotal = productos.reduce((acc, producto) => acc + producto.ahorroMaximo, 0)

  const productoConMayorAhorro = productos.reduce(
    (max, producto) => (producto.ahorroMaximo > max.ahorroMaximo ? producto : max),
    productos[0] || { ahorroMaximo: 0, nombre: "" },
  )

  const porcentajeAhorroPromedio =
    productos.length > 0
      ? productos.reduce((acc, producto) => {
          const porcentaje = producto.precioMaximo > 0 ? (producto.ahorroMaximo / producto.precioMaximo) * 100 : 0
          return acc + porcentaje
        }, 0) / productos.length
      : 0

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
      icon: ShoppingCart,
      label: "Supermercados",
      value: supermercadosUnicos.toString(),
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
    {
      icon: DollarSign,
      label: "Ahorro promedio",
      value: `$${Math.round(promedioAhorro)}`,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      icon: Percent,
      label: "% Ahorro promedio",
      value: `${Math.round(porcentajeAhorroPromedio)}%`,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
    },
    {
      icon: TrendingDown,
      label: "Ahorro total posible",
      value: `$${Math.round(ahorroTotal)}`,
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
  ]

  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`bg-surface border ${stat.borderColor} hover:border-primary transition-all duration-300 animate-fade-in shadow-dark hover:shadow-dark-lg hover-glow-blue rounded-xl`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`${stat.bgColor} ${stat.borderColor} border rounded-full p-3 shadow-dark`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground leading-tight font-medium">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {productoConMayorAhorro && productoConMayorAhorro.ahorroMaximo > 0 && (
        <Card className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/30 shadow-dark-lg hover:shadow-glow-green transition-all duration-300 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary/20 rounded-full p-3 shadow-glow-green">
                  <TrendingDown className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Mayor oportunidad de ahorro</h3>
                  <p className="text-muted-foreground font-medium">{productoConMayorAhorro.nombre}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-secondary shadow-glow-green">${productoConMayorAhorro.ahorroMaximo}</div>
                <div className="text-sm text-muted-foreground font-medium">de diferencia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
