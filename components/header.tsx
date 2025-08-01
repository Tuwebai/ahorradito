import { TrendingDown } from "lucide-react"
import CarritoModal from "@/components/carrito-modal"
import Notifications from "@/components/notifications"
import type { ProductoConPrecios } from "@/types"

interface HeaderProps {
  productos?: ProductoConPrecios[]
}

export default function Header({ productos = [] }: HeaderProps) {
  return (
    <header className="bg-surface/95 border-b border-border sticky top-0 z-50 backdrop-blur-sm shadow-dark-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl shadow-glow-blue hover-glow-blue transition-all duration-300">
              <TrendingDown className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">Ahorradito</h1>
              <p className="text-sm text-muted-foreground">Comparador de precios inteligente</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Notifications />
            <CarritoModal productos={productos} />
          </div>
        </div>
      </div>
    </header>
  )
}
