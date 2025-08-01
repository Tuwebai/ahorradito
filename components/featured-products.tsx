"use client"

import { Star, TrendingDown, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProductoConPrecios } from "@/types"

interface FeaturedProductsProps {
  productos: ProductoConPrecios[]
}

export default function FeaturedProducts({ productos }: FeaturedProductsProps) {
  // Seleccionar productos destacados (los que tienen mayor ahorro)
  const productosDestacados = productos
    .filter((p) => p.ahorroMaximo > 0)
    .sort((a, b) => b.ahorroMaximo - a.ahorroMaximo)
    .slice(0, 6)

  if (productosDestacados.length === 0) {
    return null
  }

  return (
    <div className="mb-16">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Star className="h-6 w-6 text-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Productos destacados</h2>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30 font-semibold px-3 py-1">
          Mayor ahorro
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosDestacados.map((producto) => {
          const precioMasBarato = producto.precios.find((p) => p.esMasBarato)
          const supermercadoMasBarato = precioMasBarato?.supermercado.nombre
          const porcentajeAhorro = Math.round((producto.ahorroMaximo / producto.precioMaximo) * 100)

          return (
            <Card
              key={producto.id}
              className="bg-surface border border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden shadow-dark hover:shadow-dark-lg hover-glow-green rounded-xl"
            >
              <CardContent className="p-0">
                {/* Header con descuento */}
                <div className="bg-gradient-to-r from-secondary/20 to-primary/20 p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-secondary text-secondary-foreground font-bold text-sm px-3 py-1 shadow-glow-green">
                      {porcentajeAhorro}% OFF
                    </Badge>
                    <div className="flex items-center space-x-2 text-secondary text-sm font-semibold">
                      <TrendingDown className="h-4 w-4" />
                      <span>Ahorrás ${producto.ahorroMaximo}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 text-lg">
                      {producto.nombre}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs border-muted text-muted-foreground bg-muted/20">
                        {producto.categoria}
                      </Badge>
                      {producto.marca && (
                        <Badge variant="outline" className="text-xs border-muted text-muted-foreground bg-muted/20">
                          {producto.marca}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-muted/30">
                      <span className="text-sm text-muted-foreground font-medium">Mejor precio:</span>
                      <div className="text-right">
                        <div className="font-bold text-secondary text-xl">${producto.precioMinimo}</div>
                        <div className="text-xs text-muted-foreground mt-1">{supermercadoMasBarato}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Precio más alto:</span>
                      <div className="text-sm text-muted-foreground line-through font-medium">${producto.precioMaximo}</div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ver comparación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
