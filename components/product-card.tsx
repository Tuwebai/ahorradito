"use client"

import { Heart, ShoppingCart, TrendingDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/hooks/use-favorites"
import { useCarrito } from "@/hooks/use-carrito"
import type { ProductoConPrecios } from "@/types"

interface ProductCardProps {
  producto: ProductoConPrecios
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { esFavorito, agregarFavorito, quitarFavorito } = useFavorites()
  const { agregarItem } = useCarrito()
  const isFav = esFavorito(producto.id)

  const handleFavoriteToggle = () => {
    if (isFav) {
      quitarFavorito(producto.id)
    } else {
      agregarFavorito(producto.id)
    }
  }

  const precioMasBarato = producto.precios.find((p) => p.esMasBarato)
  const supermercadoMasBarato = precioMasBarato?.supermercado.nombre

  return (
    <Card className="bg-surface border border-border hover:border-primary/50 transition-all duration-300 group shadow-dark hover:shadow-dark-lg hover-glow-blue rounded-xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 text-lg">
              {producto.nombre}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{producto.categoria}</p>
            {producto.marca && (
              <Badge variant="outline" className="mt-2 text-xs border-muted text-muted-foreground bg-muted/20">
                {producto.marca}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFav 
                ? "text-secondary hover:text-secondary/80 hover:bg-secondary/10" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-muted/30">
            <span className="text-sm text-muted-foreground font-medium">Mejor precio:</span>
            <div className="text-right">
              <div className="font-bold text-secondary text-xl">${producto.precioMinimo}</div>
              <div className="text-xs text-muted-foreground mt-1">{supermercadoMasBarato}</div>
            </div>
          </div>

          {producto.ahorroMaximo > 0 && (
            <div className="flex items-center space-x-2 text-sm savings-highlight">
              <TrendingDown className="h-4 w-4" />
              <span className="font-semibold">Ahorrás hasta ${producto.ahorroMaximo}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => agregarItem(producto)}
            className="flex-1 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Agregar
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all duration-200" 
            disabled
          >
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
